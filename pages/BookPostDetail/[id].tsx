import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { axiosFunction } from '../../common/utils';
import Book from '../../Components/Book';

export interface IBook {
  title: string;
  bookID: string;
  contents: string;
  userID: string;
  interestedCounts: number;
  endDate: Date;
  bidPrice: number;
  buyingItNowPrice: number;
  reservePrice: number;
  bookImageUrl: string;
  isActive: boolean;
  thumbnail: string;
  user: {
    name: string;
  };
}

export default function BookPost() {
  const [book, setBook] = useState<IBook>({
    title: '',
    bookID: '',
    contents: '',
    userID: '',
    interestedCounts: 0,
    endDate: new Date(),
    bidPrice: 0,
    buyingItNowPrice: 0,
    reservePrice: 0,
    bookImageUrl: '',
    isActive: true,
    thumbnail: '',
    user: {
      name: '',
    },
  });

  const router = useRouter();
  const { id } = router.query;
  const bookPostID = id as string;

  useEffect(() => {
    if (!bookPostID) {
      return;
    }

    async function getPost() {
      const result = await axiosFunction({
        url: '/bookPost/post',
        method: 'GET',
        params: { bookPostID },
      });
      if (result) {
        if (result.data) {
          setBook(result.data);
          console.log(result.data);
        } else {
          console.log('실패');
        }
      }
    }
    getPost();
  }, [bookPostID]);

  return (
    <>
      <div>
        <h1>상세 페이지</h1>
        <Book book={book} bookPostID={bookPostID} />
      </div>
    </>
  );
}

// bookPost.id로 책 post 정보 받아오고 Book 컴포넌트로 정보 넘김
