import axios from 'axios';


export async function postTasklist(params: any) {
  const res = await axios.post('/tasklist', params)
  return res.data
}