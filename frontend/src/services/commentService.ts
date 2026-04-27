import api from './api';

export interface CommentUser {
  _id: string;
  name: string;
  avatar?: string;
}

export interface Comment {
  _id: string;
  moduleId: string;
  userId: CommentUser;
  content: string;
  parentId: string | null;
  createdAt: string;
}

export const getComments = async (moduleId: string): Promise<Comment[]> => {
  const response = await api.get(`/comments/${moduleId}`);
  return response.data;
};

export const addComment = async (moduleId: string, content: string, parentId: string | null = null): Promise<Comment> => {
  const response = await api.post('/comments', { moduleId, content, parentId });
  return response.data;
};

export const updateComment = async (commentId: string, content: string): Promise<Comment> => {
  const response = await api.put(`/comments/${commentId}`, { content });
  return response.data;
};

export const deleteComment = async (commentId: string): Promise<void> => {
  await api.delete(`/comments/${commentId}`);
};
