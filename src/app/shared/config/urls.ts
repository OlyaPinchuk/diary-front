import {environment} from "../../../environments/environment";

const API = environment.API;
const authURL = `${API}auth`;
const refreshTokenURL = `${authURL}refresh`;
const registerURL = `${authURL}register`;
const usersURL = `${API}users`;

export const URL = {
  API,
  authURL,
  refreshTokenURL,
  registerURL,
  usersURL
}



