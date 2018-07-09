import axios from 'axios';

export async function fetchTasklists() {
  return await axios.get('/api/tasklists.json')
}

export async function postTasklist(params: any) {
  return await axios.post('/api/tasklists.json', params)
}