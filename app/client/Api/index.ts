import axios from 'axios';

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
  return await axios.get(`/api/tasklists/${tasklistId}/tasks.json`)
}