import axios from 'axios';


export async function postTasklist(params: any) {
  return await axios.post('/api/tasklists', params)
}