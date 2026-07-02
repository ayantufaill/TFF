import api from './api';

export type TestimonialStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'HIDDEN';

export interface Testimonial {
  _id: string;
  text: string;
  rating?: number | null;
  profileImageUrl?: string | null;
  videoUrl?: string | null;
  status: TestimonialStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    _id: string;
    name: string;
    email?: string;
  };
  course?: {
    _id: string;
    title: string;
  };
  mainCourseId?: {
    _id: string;
    title: string;
  };
}

export const resolveMediaUrl = (url?: string | null) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;

  const base = (api.defaults.baseURL || '').replace(/\/api\/?$/, '');
  return `${base}${url}`;
};

export const getMyTestimonials = async (): Promise<Testimonial[]> => {
  const res = await api.get('/testimonials/my');
  return res.data;
};

export const getPublicTestimonials = async (): Promise<Testimonial[]> => {
  const res = await api.get('/testimonials/public');
  return res.data;
};

export const submitTestimonial = async (data: {
  mainCourseId: string;
  text: string;
  rating?: number | null;
  profileImage?: File | null;
  video?: File | null;
}): Promise<Testimonial> => {
  const formData = new FormData();
  formData.append('mainCourseId', data.mainCourseId);
  formData.append('text', data.text);

  if (data.rating) {
    formData.append('rating', String(data.rating));
  }

  if (data.profileImage) {
    formData.append('profileImage', data.profileImage);
  }

  if (data.video) {
    formData.append('video', data.video);
  }

  const res = await api.post('/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const getAdminTestimonials = async (): Promise<Testimonial[]> => {
  const res = await api.get('/admin/testimonials');
  return res.data;
};

export const updateTestimonialStatus = async (
  id: string,
  status: TestimonialStatus,
  adminNotes?: string,
): Promise<Testimonial> => {
  const res = await api.patch(`/admin/testimonials/${id}/status`, { status, adminNotes });
  return res.data;
};

export const deleteTestimonial = async (id: string) => {
  const res = await api.delete(`/admin/testimonials/${id}`);
  return res.data;
};
