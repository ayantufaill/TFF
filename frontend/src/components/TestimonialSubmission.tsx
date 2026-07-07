import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Camera,
  CheckCircle,
  Circle,
  Image,
  Loader2,
  RefreshCw,
  Send,
  Square,
  Star,
  Upload,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { getMyTestimonials, resolveMediaUrl, submitTestimonial, Testimonial } from "../services/testimonialService";

interface TestimonialSubmissionProps {
  mainCourseId: string;
  courseName: string;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-green-50 text-green-700 border-green-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
  HIDDEN: "bg-gray-100 text-gray-600 border-gray-200",
};

const ratingLabels: Record<number, string> = {
  1: "Needs improvement",
  2: "Could be better",
  3: "Good",
  4: "Very good",
  5: "Excellent",
};

export default function TestimonialSubmission({ mainCourseId, courseName }: TestimonialSubmissionProps) {
  const [myTestimonials, setMyTestimonials] = useState<Testimonial[]>([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [captureMode, setCaptureMode] = useState<"photo" | "video" | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [incompleteReason, setIncompleteReason] = useState<string | null>(null);
  const liveVideoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);

  const submitted = useMemo(
    () => myTestimonials.find((item) => item.course?._id === mainCourseId || (item.mainCourseId as any)?._id === mainCourseId),
    [mainCourseId, myTestimonials],
  );

  useEffect(() => {
    let active = true;

    getMyTestimonials()
      .then((items) => active && setMyTestimonials(items))
      .catch(() => {
        setFormMessage({ type: "error", text: "Could not load your testimonial status. Please refresh and try again." });
        toast.error("Could not load testimonial status");
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!profileImage) {
      setImagePreview(resolveMediaUrl(submitted?.profileImageUrl));
      return;
    }

    const previewUrl = URL.createObjectURL(profileImage);
    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [profileImage, submitted?.profileImageUrl]);

  useEffect(() => {
    if (!video) {
      setVideoPreview(resolveMediaUrl(submitted?.videoUrl));
      return;
    }

    const previewUrl = URL.createObjectURL(video);
    setVideoPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [submitted?.videoUrl, video]);

  useEffect(() => {
    if (liveVideoRef.current && cameraStream) {
      liveVideoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    mediaRecorderRef.current?.state === "recording" && mediaRecorderRef.current.stop();
    cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    cameraStreamRef.current = null;
    setCameraStream(null);
    setCaptureMode(null);
    setIsRecording(false);
  };

  const startCamera = async (mode: "photo" | "video") => {
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: mode === "video",
      });
      cameraStreamRef.current = stream;
      setCameraStream(stream);
      setCaptureMode(mode);
    } catch (err) {
      setFormMessage({ type: "error", text: "Camera access was blocked or unavailable." });
      toast.error("Camera access was blocked or unavailable");
    }
  };

  const capturePhoto = () => {
    const videoElement = liveVideoRef.current;
    if (!videoElement) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth || 1280;
    canvas.height = videoElement.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      setProfileImage(new File([blob], "testimonial-profile-photo.jpg", { type: "image/jpeg" }));
      setFormMessage({ type: "success", text: "Photo captured. You can submit it with your testimonial." });
      toast.success("Photo captured");
      stopCamera();
    }, "image/jpeg", 0.92);
  };

  const getRecorderMimeType = () => {
    if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")) return "video/webm;codecs=vp9,opus";
    if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")) return "video/webm;codecs=vp8,opus";
    if (MediaRecorder.isTypeSupported("video/webm")) return "video/webm";
    return "";
  };

  const startRecording = () => {
    if (!cameraStream) return;
    if (!window.MediaRecorder) {
      setFormMessage({ type: "error", text: "Video recording is not supported in this browser." });
      toast.error("Video recording is not supported in this browser");
      return;
    }

    recordedChunksRef.current = [];
    const mimeType = getRecorderMimeType();
    const recorder = new MediaRecorder(cameraStream, mimeType ? { mimeType } : undefined);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunksRef.current.push(event.data);
    };

    recorder.onstop = () => {
      const fileType = "video/webm";
      const blob = new Blob(recordedChunksRef.current, { type: fileType });
      setVideo(new File([blob], "testimonial-video.webm", { type: fileType }));
      recordedChunksRef.current = [];
      setIsRecording(false);
      setFormMessage({ type: "success", text: "Video recorded. You can preview it before submitting." });
      toast.success("Video recorded");
      stopCamera();
    };

    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSubmit = async () => {
    setFormMessage(null);

    if (text.trim().length < 20) {
      setFormMessage({ type: "error", text: "Please write at least 20 characters before submitting." });
      toast.error("Please write at least 20 characters");
      return;
    }

    setSubmitting(true);
    try {
      const saved = await submitTestimonial({
        mainCourseId,
        text,
        rating,
        profileImage,
        video,
      });
      setMyTestimonials((items) => [saved, ...items]);
      setText("");
      setRating(null);
      setProfileImage(null);
      setVideo(null);
      setFormMessage({ type: "success", text: "Your testimonial was published." });
      toast.success("Your testimonial was published");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Could not submit testimonial. Please check your connection and try again.";
      if (err?.response?.status === 403) {
        setIncompleteReason(message);
      } else {
        setFormMessage({ type: "error", text: message });
      }
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRatingSelect = (value: number) => {
    setRating((current) => (current === value ? null : value));
  };

  if (loading) {
    return (
      <Card className="w-full border-gray-100 rounded-2xl bg-white">
        <CardContent className="p-5 flex items-center gap-3 text-sm font-semibold text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" /> Checking testimonial status...
        </CardContent>
      </Card>
    );
  }

  if (submitted) {
    return (
      <Card className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-black/5">
        <CardContent className="p-0">
          <div className="px-8 pb-7 pt-9 text-center sm:px-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A961]/15 text-[#B08B3E]">
              <CheckCircle className="h-6 w-6" />
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-[#B08B3E]">Review submitted</p>
            <h3 className="mt-2 text-2xl font-black leading-tight text-[#1B2A4A]">Thank you for your feedback</h3>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-gray-500">
              Your testimonial for {courseName} is now published.
            </p>
            <div className="mt-4 flex justify-center">
              <Badge variant="outline" className={`${statusStyles[submitted.status]} rounded-full px-4 py-1 text-xs font-black`}>
                {submitted.status}
              </Badge>
            </div>
          </div>

          <div className="border-t border-gray-100 bg-[#FAFAF9] px-6 py-6 sm:px-10">
            <div className="px-1 py-2">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Submitted review</p>
                <p className="text-xs font-medium text-gray-400">
                  {new Date(submitted.createdAt).toLocaleDateString()}
                </p>
              </div>
              {submitted.rating && (
                <div className="mt-4 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className="h-5 w-5"
                      style={{
                        fill: value <= submitted.rating! ? "#E6922E" : "#F2F0EB",
                        stroke: value <= submitted.rating! ? "#E6922E" : "#9CA3AF",
                        strokeWidth: 2,
                      }}
                    />
                  ))}
                </div>
              )}

              <p className="mt-6 text-base leading-7 text-[#1B2A4A]">{submitted.text}</p>
            </div>

            {submitted.adminNotes && (
              <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                <span className="font-bold">Admin note:</span> {submitted.adminNotes}
              </div>
            )}

            {(imagePreview || videoPreview) && (
              <div className="mb-8 mt-8 px-1">
                <p className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">Attached media</p>
                <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-4">
                  {imagePreview && (
                    <div className="w-full max-w-xs overflow-hidden rounded-xl border border-gray-100 bg-[#FAFAF9]">
                      <img src={imagePreview} alt="" className="h-40 w-full object-cover" />
                    </div>
                  )}
                  {videoPreview && (
                    <div className="w-full max-w-xs overflow-hidden rounded-xl border border-gray-100 bg-[#FAFAF9]">
                      <video src={videoPreview} controls className="aspect-video w-full bg-black object-cover" />
                    </div>
                  )}
                </div>
              </div>
            )}

            <p className="mt-6 text-center text-xs font-medium text-gray-400">
              Your testimonial is visible on the public testimonials page.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (incompleteReason) {
    return (
      <Card className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-black/5">
        <CardContent className="p-0">
          <div className="px-8 py-9 text-center sm:px-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-3 text-2xl font-black leading-tight text-[#1B2A4A]">Course not finished yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-gray-500">{incompleteReason}</p>
            <p className="mx-auto mt-4 max-w-md text-xs font-medium leading-6 text-gray-400">
              Complete every remaining lesson and quiz for {courseName}, then come back to share your review.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden rounded-xl border-0 bg-white shadow-none">
      <CardContent className="p-0">
        <div className="px-8 pb-5 pt-8 text-center sm:px-14">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A961]/15">
            <CheckCircle className="h-5 w-5 text-[#B08B3E]" />
          </div>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#B08B3E]">Course complete</p>
          <h3 className="mt-1 text-3xl font-black leading-tight text-[#1B2A4A]">How was your experience?</h3>
          <p className="mt-3 mb-3 text-base leading-6 text-gray-500">Your feedback helps future learners choose with confidence.</p>
        </div>

        <div className="mx-auto w-full max-w-[680px] space-y-6 px-8 pb-8 pt-2 sm:px-14 sm:pb-10">
          {formMessage && (
            <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm font-semibold ${formMessage.type === "error" ? "border-red-100 bg-red-50 text-red-700" : "border-green-100 bg-green-50 text-green-700"}`}>
              {formMessage.type === "error" ? <AlertCircle className="mt-0.5 h-4 w-4" /> : <CheckCircle className="mt-0.5 h-4 w-4" />}
              <span>{formMessage.text}</span>
            </div>
          )}

          <div className="flex flex-col items-center text-center">
            <p className="min-h-5 text-sm font-semibold text-gray-500">
              {hoverRating
                ? ratingLabels[hoverRating]
                : rating
                  ? ratingLabels[rating]
                  : "Select your rating"}
            </p>
            <div
              className="mt-3 inline-flex items-center gap-0.5"
              onMouseLeave={() => setHoverRating(null)}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onMouseEnter={() => setHoverRating(value)}
                  onFocus={() => setHoverRating(value)}
                  onBlur={() => setHoverRating(null)}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    handleRatingSelect(value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleRatingSelect(value);
                    }
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-md transition-all hover:scale-110 hover:bg-[#FFF7E8]"
                  aria-label={`${value} star rating`}
                  aria-pressed={rating === value}
                >
                  <Star
                    className="h-8 w-8 transition-colors"
                    style={{
                      fill:
                        value <= (hoverRating || rating || 0)
                          ? "#E6922E"
                          : "#F2F0EB",
                      stroke:
                        value <= (hoverRating || rating || 0)
                          ? "#E6922E"
                          : "#9CA3AF",
                      strokeWidth: 2,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-bold text-[#1B2A4A]">Write your review</label>
              <span className="text-xs font-medium text-gray-400">{text.length}/3000</span>
            </div>
            <Textarea
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                if (formMessage?.type === "error") setFormMessage(null);
              }}
              placeholder="What did you enjoy, and how did this course help you?"
              className="min-h-32 resize-none rounded-xl border-gray-200 bg-[#FAFAF9] px-5 py-4 text-base leading-relaxed focus-visible:border-[#C9A961] focus-visible:ring-1 focus-visible:ring-[#C9A961]/20"
              maxLength={3000}
            />
          </div>

          {captureMode && (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
                <div>
                  <p className="text-sm font-black text-[#1B2A4A]">{captureMode === "photo" ? "Take a photo" : "Record your video"}</p>
                  <p className="text-xs font-medium text-gray-400">Allow camera access when prompted.</p>
                </div>
                <button type="button" onClick={stopCamera} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#1B2A4A]">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="relative bg-black">
                <video
                  ref={liveVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="aspect-video w-full max-h-[340px] object-cover"
                  style={{ transform: "scaleX(-1)" }}
                />
                {isRecording && (
                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">
                    <Circle className="h-3 w-3 fill-current" /> Recording
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 bg-[#FAFAF9] px-4 py-4">
                {captureMode === "photo" ? (
                  <Button type="button" onClick={capturePhoto} className="h-11 rounded-full bg-[#C9A961] px-7 font-bold text-white shadow-sm hover:bg-[#B89751]">
                    <Camera className="h-4 w-4" /> Capture Photo
                  </Button>
                ) : isRecording ? (
                  <Button type="button" onClick={stopRecording} className="h-11 rounded-full bg-red-600 px-7 font-bold text-white shadow-sm hover:bg-red-700">
                    <Square className="h-4 w-4 fill-current" /> Stop Recording
                  </Button>
                ) : (
                  <Button type="button" onClick={startRecording} className="h-11 rounded-full bg-red-600 px-7 font-bold text-white shadow-sm hover:bg-red-700">
                    <Circle className="h-4 w-4 fill-current" /> Start Recording
                  </Button>
                )}
                <button
                  type="button"
                  onClick={() => startCamera(captureMode)}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-5 text-sm font-bold text-[#1B2A4A] shadow-sm hover:border-[#C9A961] hover:bg-[#FAF8F3]"
                >
                  <RefreshCw className="h-4 w-4" /> Restart camera
                </button>
              </div>
            </div>
          )}

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              Add media <span className="normal-case tracking-normal">(optional)</span>
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex min-h-[82px] cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-[#C9A961] hover:bg-[#FAF8F3]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B2A4A]/5 text-[#1B2A4A]">
                  <Image className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-black text-[#1B2A4A]">Upload image</span>
                  <span className="mt-0.5 block text-xs font-medium text-gray-400">Choose file</span>
                </span>
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => setProfileImage(e.target.files?.[0] || null)} />
              </label>
              <button type="button" onClick={() => startCamera("photo")} className="flex min-h-[88px] items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 text-left transition hover:border-[#C9A961] hover:bg-[#FAF8F3]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B2A4A]/5 text-[#1B2A4A]">
                  <Camera className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-black text-[#1B2A4A]">Take photo</span>
                  <span className="mt-0.5 block text-xs font-medium text-gray-400">Use camera</span>
                </span>
              </button>
              <label className="flex min-h-[82px] cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-[#C9A961] hover:bg-[#FAF8F3]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B2A4A]/5 text-[#1B2A4A]">
                  <Upload className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-black text-[#1B2A4A]">Upload video</span>
                  <span className="mt-0.5 block text-xs font-medium text-gray-400">Choose file</span>
                </span>
                <input type="file" accept="video/mp4,video/webm,video/quicktime" className="hidden" onChange={(e) => setVideo(e.target.files?.[0] || null)} />
              </label>
              <button type="button" onClick={() => startCamera("video")} className="flex min-h-[82px] items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:border-[#C9A961] hover:bg-[#FAF8F3]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B2A4A]/5 text-[#1B2A4A]">
                  <Video className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-black text-[#1B2A4A]">Record video</span>
                  <span className="mt-0.5 block text-xs font-medium text-gray-400">Use camera</span>
                </span>
              </button>
            </div>

            {(imagePreview || videoPreview) && (
              <div className="mt-3 flex flex-wrap gap-3 rounded-lg bg-gray-50 p-3">
                {imagePreview && (
                  <div className="relative">
                    <img src={imagePreview} alt="" className="h-16 w-16 rounded-md object-cover" />
                    <button type="button" onClick={() => setProfileImage(null)} className="absolute -right-2 -top-2 rounded-full bg-white p-1 text-red-500 shadow">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {videoPreview && (
                  <div className="relative">
                    <video src={videoPreview} controls className="h-16 w-28 rounded-md bg-black object-cover" />
                    <button type="button" onClick={() => setVideo(null)} className="absolute -right-2 -top-2 rounded-full bg-white p-1 text-red-500 shadow">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-6">
            <Button onClick={handleSubmit} disabled={submitting} className="h-12 w-full rounded-md bg-[#1B2A4A] px-6 font-bold text-white hover:bg-[#122038]">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Submit Review
            </Button>
            <p className="text-center text-xs text-gray-400">Your review will appear publicly after submission.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
