import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios
  .get(baseUrl)
//  console.log("req",request)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
/*  const response = await axios.post(baseUrl, newObject, config)
  return response.data*/
}

const deleteB = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}



export default { getAll, create, update, deleteB, setToken }