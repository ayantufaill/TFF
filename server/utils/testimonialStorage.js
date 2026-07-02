const crypto = require('crypto');
const multer = require('multer');
const admin = require('../config/firebase');

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;   // 5 MB
const MAX_VIDEO_BYTES = 75 * 1024 * 1024;  // 75 MB

const allowedImages = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp']
]);

const allowedVideos = new Map([
  ['video/mp4', '.mp4'],
  ['video/webm', '.webm'],
  ['video/quicktime', '.mov']
]);

const fileFilter = (_req, file, cb) => {
  const isImage = file.fieldname === 'profileImage' && allowedImages.has(file.mimetype);
  const isVideo = file.fieldname === 'video' && allowedVideos.has(file.mimetype);

  if (!isImage && !isVideo) {
    return cb(new Error('Unsupported file type'));
  }
  cb(null, true);
};

// Files are kept in memory buffers — no disk writes
const uploadTestimonialMedia = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: MAX_VIDEO_BYTES, files: 2 }
}).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]);

const validateUploadedFileSizes = (files = {}) => {
  const image = files.profileImage?.[0];
  const video = files.video?.[0];

  if (image && image.size > MAX_IMAGE_BYTES) {
    return 'Profile image must be 5 MB or smaller';
  }
  if (video && video.size > MAX_VIDEO_BYTES) {
    return 'Video must be 75 MB or smaller';
  }
  return null;
};

// Upload a single multer memory-file to Firebase Storage and return its public URL
const uploadFileToFirebase = async (file, folder = 'testimonials') => {
  const ext = allowedImages.get(file.mimetype) || allowedVideos.get(file.mimetype) || '';
  const uniqueName = `${folder}/${Date.now()}-${crypto.randomBytes(12).toString('hex')}${ext}`;

  const bucket = admin.storage().bucket();
  const fileRef = bucket.file(uniqueName);

  await fileRef.save(file.buffer, {
    metadata: { contentType: file.mimetype },
    resumable: false
  });

  await fileRef.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${uniqueName}`;
};

// Upload both optional fields and return { profileImageUrl, videoUrl }
const uploadFilesToFirebase = async (files = {}) => {
  const [profileImageUrl, videoUrl] = await Promise.all([
    files.profileImage?.[0] ? uploadFileToFirebase(files.profileImage[0]) : Promise.resolve(null),
    files.video?.[0]        ? uploadFileToFirebase(files.video[0])        : Promise.resolve(null)
  ]);

  return { profileImageUrl, videoUrl };
};

// Delete a file from Firebase Storage by its public URL
const deleteStoredMediaByUrl = async (url) => {
  if (!url || !url.startsWith('https://storage.googleapis.com/')) return;

  try {
    const bucket = admin.storage().bucket();
    // URL format: https://storage.googleapis.com/{bucketName}/{filePath}
    const prefix = `https://storage.googleapis.com/${bucket.name}/`;
    if (!url.startsWith(prefix)) return;

    const filePath = url.slice(prefix.length);
    await bucket.file(filePath).delete({ ignoreNotFound: true });
  } catch {
    // Non-fatal — log but don't throw
  }
};

module.exports = {
  uploadTestimonialMedia,
  uploadFilesToFirebase,
  validateUploadedFileSizes,
  deleteStoredMediaByUrl,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES
};
