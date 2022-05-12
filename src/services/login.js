import axios from "axios";
const baseUrl = "/api/login";

let token = null;

const getToken = () => token;
const setToken = newToken => (token = `bearer ${newToken}`);

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

// eslint-disable-next-line
export default { login, getToken, setToken };
