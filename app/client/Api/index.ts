import axios from 'axios';
import * as Cookies from 'js-cookie';

const getOptions = () => {
  return {
    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
  };
};

export async function verifyUser() {
  return await axios.get('/api/users/verify', getOptions());
}

export async function fetchTasklists() {
  return await axios.get('/api/tasklists.json');
}

export async function postTasklist(params: any) {
  return await axios.post('/api/tasklists.json', params);
}

export async function updateTasklist(id: number, params: any) {
  return await axios.patch(`/api/tasklists/${id}.json`, params);
}

export async function destroyTasklist(id: number) {
  return await axios.delete(`/api/tasklists/${id}.json`);
}

export async function fetchTasks(tasklistId: number) {
  return await axios.get(`/api/tasklists/${tasklistId}/tasks.json`);
}

export async function createTask(tasklistId: number, params: any) {
  return await axios.post(`/api/tasklists/${tasklistId}/tasks.json`, params);
}

export async function updateTask(taskId: number, params: any) {
  return await axios.patch(`/api/tasks/${taskId}.json`, params);
}

export async function destroyTask(taskId: number) {
  return await axios.delete(`/api/tasks/${taskId}.json`);
}

export async function destoryCompletedTasks(tasklistId: number) {
  return await axios.delete(`/api/tasklists/${tasklistId}/completed_tasks.json`);
}
