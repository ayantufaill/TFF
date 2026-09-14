import api from './api';

export interface MentorRequest {
  name: string;
  contact: string;
  message?: string;
}

export const submitMentorRequest = async (data: MentorRequest) => {
  const res = await api.post('/mentor-request', data);
  return res.data;
};
