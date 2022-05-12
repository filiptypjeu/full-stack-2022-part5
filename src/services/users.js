import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newUser => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

// eslint-disable-next-line
export default { getAll, create };
