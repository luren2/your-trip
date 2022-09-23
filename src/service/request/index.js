import useMainStore from '@/stores/modules/main';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { BASE_URL, TIMEOUT } from './config';

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);

class myRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });
    this.instance.interceptors.request.use(
      (config) => {
        isLoading.value = true;
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        isLoading.value = false;
        return res.data;
      },
      (err) => {
        isLoading.value = false;
        return err;
      }
    );
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get(config) {
    return this.request({ ...config, method: 'GET' });
  }
  post(config) {
    return this.request({ ...config, method: 'POST' });
  }
}

export default new myRequest(BASE_URL, TIMEOUT);
