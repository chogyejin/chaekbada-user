import axios from 'axios';
import Cookies from 'universal-cookie';

const GUEST_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imd1ZXN0Iiwic2NvcGUiOiJndWVzdCIsImlhdCI6MTYzNTI1NzIyN30.Dx-9hfKgtoPYhfEcjlyR4V_S1MSaLYKPizXdkTEzIgs';

export const axiosFunction = async (args: {
  url: string;
  method: 'POST' | 'GET' | 'PUT';
  params?: any;
}) => {
  const { url, method, params } = args;
  const cookies = new Cookies();

  const localCookies = cookies.get('factcheck');
  const hasCookies = !!localCookies;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${
      hasCookies ? cookies.get('factcheck') : GUEST_TOKEN
    }`,
  };
  try {
    switch (method) {
      case 'POST': {
        return await axios.post(
          `http://localhost:4000${url}`,
          { params },
          {
            headers,
          },
        );

        break;
      }

      case 'GET': {
        return await axios.get(`http://localhost:4000${url}`, {
          params,
          headers,
        });
      }

      case 'PUT': {
        return await axios.put(
          `http://localhost:4000${url}`,
          {
            params,
          },
          {
            headers,
          },
        );
      }
    }
  } catch (error) {
    alert('에러');
  }
};
