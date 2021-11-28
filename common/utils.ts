import axios from 'axios';
import router from 'next/router';
import Cookies from 'universal-cookie';
import { BACKEND_ENDPOINT } from './constant';
// import { BACKEND_ENDPOINT } from './constant';

export const GUEST_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXN0QGd1ZXN0LmNvbSIsImlhdCI6MTYzNTg3NzgxOCwiaXNzIjoi7Yag7YGwIOuwnOq4ieyekCJ9.1y1sfa0uhjnGMKSjREjSWNTo7RSmHEva5RVufow-ADw';

export const axiosFunction = async (args: {
  url: string;
  method: 'POST' | 'GET' | 'PUT';
  params?: any;
}) => {
  const { url, method, params } = args;
  const cookies = new Cookies();

  const localCookies = cookies.get('chaekbadaUserCookie');
  const hasCookies = !!localCookies;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      hasCookies ? cookies.get('chaekbadaUserCookie') : GUEST_TOKEN
    }`,
  };
  try {
    switch (method) {
      case 'POST': {
        return await axios.post(
          `${BACKEND_ENDPOINT}${url}`,
          {}, //2번째 파라미터는 request.body
          {
            headers, //headers는 3번째 파라미터
            params,
          },
        );

        break;
      }

      case 'GET': {
        return await axios.get(`${BACKEND_ENDPOINT}${url}`, {
          params,
          headers,
        });
      }

      case 'PUT': {
        return await axios.put(
          `${BACKEND_ENDPOINT}${url}`,
          {},
          {
            headers,
            params,
          },
        );
      }
    }
  } catch (error) {
    alert('에러');
  }
};

export function onLogout() {
  const cookies = new Cookies();
  cookies.remove('chaekbadaUserCookie');
  router.push('/');
}

export function onMoveLoginPage() {
  router.push('/Login');
}
