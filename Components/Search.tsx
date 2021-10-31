import axios from 'axios';

const Kakao = axios.create({
  baseURL: 'https://dapi.kakao.com', // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: 'KakaoAK a611948e9488a6a3b63258cdfe814e44',
  },
});

// search book api
export default async function Search(bookName: string) {
  const asd = await Kakao.get('/v3/search/book', {
    params: {
      query: bookName,
    },
  });

  console.log(asd);

  return await Kakao.get('/v3/search/book', {
    params: {
      query: bookName,
    },
  });
}
