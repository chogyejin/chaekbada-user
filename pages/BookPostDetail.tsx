import { useEffect } from 'react';
import { axiosFunction } from '../common/utils';

export default function BookPostDetail({ bookPostId: string }) {
  //BookPosts에서 bookPostId 넘겨 받는다
  useEffect(() => {
    async function getPost() {
      const result = await axiosFunction({
        url: '',
        method: 'GET',
        params: { bookPostId },
      });
    }
  });
  return (
    <>
      <div>
        <h1>글 상세 페이지</h1>
      </div>
    </>
  );
}
