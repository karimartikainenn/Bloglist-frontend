import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.get(baseUrl, config)
    .then(response => response.data)
}

const add = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const config = {
    headers: { Authorization: token }
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, add, update, setToken, remove }
