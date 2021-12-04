import client from "../providers/client";

export const loginService = (body) => {
  return client.post(`/login`, body);
};
export const registerService = (body) => {
  return client.post(`/register`, body);
};
export const registerProject = (body) => {
  return client.post(`/project`, body);
};
export const getProjects = () => {
  return client.get(`/project`);
};
export const editProjects = (id, body) => {
  return client.patch(`/project/${id}`, body);
};
export const postHours = (body) => {
  return client.post(`/hours`, body);
};
export const getUsers = () => {
  return client.get(`/user`);
};
export const getHours = () => {
  return client.get(`/hours`);
};
