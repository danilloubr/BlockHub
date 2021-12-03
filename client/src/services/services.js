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
