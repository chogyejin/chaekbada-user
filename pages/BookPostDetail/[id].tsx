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
}

export default function BookPost() {
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
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
  });

  const router = useRouter();
  const { id } = router.query;
  const bookPostID = id;

  //   useEffect(() => {
  //     console.log('첫번째 useEffect ' + id);
  //     setBookPostID(id as string);
  //   }, []);
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
          if (isFirstLoad) {
            setIsFirstLoad(false);
            setBook(result.data);
            console.log(result.data);
          }
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
        <div>상세 페이지 {bookPostID}</div>
         <Book book={book} />
        <div>{book.contents}</div>
      </div>
    </>
  );
}

// bookPost.id로 책 post 정보 받아오고 Book 컴포넌트로 정보 넘김
