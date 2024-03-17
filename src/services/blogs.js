import axios from 'axios';
const baseUrl = '/api/blogs';

let token = ''; // Define token variable

const setToken = newToken => {
  token = `Bearer ${newToken}`; // Update token value
};

const getAll = () => {
  const config = {
    headers: { Authorization: token } // Include token in the request headers
  };
  return axios.get(baseUrl, config) // Use config object to include token
    .then(response => response.data);
};

const add = async newObject => {
  const config = {
    headers: { Authorization: token } // Include token in the request headers
  };
  try {
    const response = await axios.post(baseUrl, newObject, config); // Use config object to include token
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

export default { getAll, add, update, setToken };
