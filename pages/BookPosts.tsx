import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { axiosFunction } from '../common/utils';
import axios from 'axios';

interface IBookPosts {
  thumbnail: string;
  bidPrice: number;
  buyingItNowPrice: number;
  endDate: Date;
  userID: string;
}

export default function BookPosts() {
  const [bookPosts, setBookPosts] = useState<IBookPosts[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<Boolean>(true);

  useEffect(() => {
    async function getPost() {
      const result = await axiosFunction({
        url: '/bookPostList/new',
        method: 'GET',
        params: {},
      });

      // if (result) {
      //   if (result.data) {
      //     console.log(result.data);
      //     setBookPosts(result.data);
      //   }
      // }
      if (result) {
        if (result.data) {
          const existsPosts = result.data.length > 0;
          if (isFirstLoad && existsPosts) {
            setIsFirstLoad(false);
            setBookPosts(result.data || []);
          }
        } else {
          console.log('실패');
        }
      }
    }
    getPost();
  }, [bookPosts]);

  console.log(bookPosts);
  return (
    <>
      <Head>
        <title>전체 책</title>
      </Head>

      <h1 style={{ marginBlockStart: '0px' }}>전체 책 페이지</h1>
      <div style={{ paddingTop: '20px' }}>
        {bookPosts.map((bookpost, id) => (
          <div key={id} style={{ marginLeft: '20px' }}>
            {bookpost.thumbnail} {bookpost.bidPrice} {bookpost.buyingItNowPrice}
            {bookpost.endDate} {bookpost.userID}
          </div>
        ))}
      </div>
      <Link href="/BookPostWrite">글 작성 페이지로 가자</Link>
      {/* <style jsx></style> */}
    </>
  );
}
