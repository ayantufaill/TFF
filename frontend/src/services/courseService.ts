import api from './api';

export interface Module {
  _id: string;
  courseId: string;
  number: number;
  title: string;
  description: string;
  videoId: string;
  topics: string[];
  formats: string[];
  order: number;
}

export interface Level {
  _id: string;
  mainCourseId: string;
  level: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  order: number;
  modules: Module[];
}

export interface MainCourse {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  order: number;
  levels: Level[];
}

export interface QuizQuestion {
  _id?: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Assessment {
  _id: string;
  courseId: string;
  level: number;
  title: string;
  description: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export const getCourses = async (): Promise<MainCourse[]> => {
  const res = await api.get('/courses');
  return res.data;
};

export const getMainCourse = async (id: string): Promise<MainCourse> => {
  const res = await api.get(`/courses/main/${id}`);
  return res.data;
};

export const getAssessment = async (levelId: string): Promise<Assessment> => {
  const res = await api.get(`/courses/assessment/${levelId}`);
  return res.data;
};

// Admin actions
export const saveMainCourse = async (data: Partial<MainCourse>) => {
  const res = await api.post('/courses/admin/main', data);
  return res.data;
};

export const saveLevel = async (data: Partial<Level>) => {
  const res = await api.post('/courses/admin/levels', data);
  return res.data;
};

export const saveModule = async (data: Partial<Module>) => {
  const res = await api.post('/courses/admin/modules', data);
  return res.data;
};

export const saveAssessment = async (data: Partial<Assessment>) => {
  const res = await api.post('/courses/admin/assessments', data);
  return res.data;
};

export const deleteMainCourse = async (id: string) => {
  const res = await api.delete(`/courses/admin/main/${id}`);
  return res.data;
};

export const deleteLevel = async (id: string) => {
  const res = await api.delete(`/courses/admin/levels/${id}`);
  return res.data;
};

export const deleteModule = async (id: string) => {
  const res = await api.delete(`/courses/admin/modules/${id}`);
  return res.data;
};
