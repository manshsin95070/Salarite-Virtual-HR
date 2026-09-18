import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
});

export const getTasks = () => api.get('/tasks').then(res => res.data);
export const createTask = (task: any) => api.post('/tasks', task).then(res => res.data);
export const updateTaskStatus = (id: number, status: string) => api.put(`/tasks/${id}`, { status }).then(res => res.data);

export const getInterviews = () => api.get('/interviews').then(res => res.data);
export const createInterview = (interview: any) => api.post('/interviews', interview).then(res => res.data);
