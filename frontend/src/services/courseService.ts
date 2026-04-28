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

let cachedCourses: MainCourse[] | null = null;

export const getCourses = async (): Promise<MainCourse[]> => {
  // Try to get from localStorage first for instant load
  const cachedData = localStorage.getItem('tff_courses_cache');
  if (cachedData && !cachedCourses) {
    try {
      cachedCourses = JSON.parse(cachedData);
    } catch (e) {
      console.error('Failed to parse cached courses', e);
    }
  }

  if (cachedCourses) {
    // Fetch in background to keep data fresh
    api.get('/courses').then(res => {
      cachedCourses = res.data;
      localStorage.setItem('tff_courses_cache', JSON.stringify(res.data));
    }).catch(err => console.error('Background fetch failed:', err));
    return cachedCourses;
  }

  const res = await api.get('/courses');
  cachedCourses = res.data;
  localStorage.setItem('tff_courses_cache', JSON.stringify(res.data));
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

// Admin actions — map _id → id so the backend knows to UPDATE instead of CREATE
export const saveMainCourse = async (data: Partial<MainCourse>) => {
  const { _id, ...rest } = data as any;
  const res = await api.post('/courses/admin/main', { ...rest, id: _id });
  return res.data;
};

export const saveLevel = async (data: Partial<Level>) => {
  const { _id, ...rest } = data as any;
  const res = await api.post('/courses/admin/levels', { ...rest, id: _id });
  return res.data;
};

export const saveModule = async (data: Partial<Module>) => {
  const { _id, ...rest } = data as any;
  const res = await api.post('/courses/admin/modules', { ...rest, id: _id });
  return res.data;
};

export const saveAssessment = async (data: Partial<Assessment>) => {
  const { _id, ...rest } = data as any;
  const res = await api.post('/courses/admin/assessments', { ...rest, id: _id });
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
