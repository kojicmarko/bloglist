import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObj, config);
  return res.data;
};

const update = async (obj) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(
    `${baseUrl}/${obj.id}`,
    { likes: obj.likes },
    config
  );
  return res.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { setToken, getAll, create, update, remove };
