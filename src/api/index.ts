import axios, { AxiosError } from 'axios';
import environment from '../environments';
import { enqueueSnackbar } from 'notistack';

const token: string | null = localStorage.getItem('token');

let expiredErrorIsActivated = false;
let messageWasCalled = false;


const api = axios.create({
    baseURL: environment.API_URL,
    headers: {
        Authorization: token ? 'Bearer ' + token : null
    }
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        expiredErrorIsActivated = true;
        if(expiredErrorIsActivated && ! messageWasCalled) {
            enqueueSnackbar("Tempo de sessão expirado!", {
              variant: "warning",
            });
            messageWasCalled = true;
        }
        setTimeout(() => {
          localStorage.clear();
          const host = window.location.origin;
          window.location.replace(host + "/");
          messageWasCalled = false;
          expiredErrorIsActivated = false;
        }, 5000);
      }
    }
  );
  
export default api;