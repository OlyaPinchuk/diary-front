import {environment} from "../../../environments/environment";

const API = environment.API;
const authURL = `${API}/auth`;
const refreshTokenURL = `${authURL}/refresh`;
const registerURL = `${authURL}/register`;
const usersURL = `${API}/users`;
const API_HOST = 'http://localhost:8000';

export const URL = {
  API_HOST,
  API,
  authURL,
  refreshTokenURL,
  registerURL,
  usersURL
}



