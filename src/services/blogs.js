import axios from "axios";
import loginService from "./login";
const baseUrl = "/api/blogs";

const createConfig = () => ({ headers: { Authorization: loginService.getToken() } });

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, createConfig());
  return response.data;
};

const like = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes + 1 });
  return response.data;
};

const remove = async blog => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, createConfig());
  return response.data;
};

// eslint-disable-next-line
export default { getAll, create, like, remove };
