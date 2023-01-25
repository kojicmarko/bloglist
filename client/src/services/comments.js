import axios from 'axios';

const baseUrl = '/api/blogs/';

const getAll = async (id) => {
  const res = await axios.get(`${baseUrl}${id}/comments`);
  return res.data;
};

const create = async (newObj) => {
  const res = await axios.post(`${baseUrl}${newObj.blog}/comments`, newObj);
  return res.data;
};

export default { getAll, create };
