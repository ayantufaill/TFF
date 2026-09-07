import api from './api';

export interface VolunteerApplication {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  interest: string;
  availability: string;
  skills?: string;
  message?: string;
}

export const submitVolunteerApplication = async (data: VolunteerApplication) => {
  const res = await api.post('/volunteer', data);
  return res.data;
};
