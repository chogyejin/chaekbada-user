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
      <div className={'book-post-page-detail-container'}>
        <Book book={book} bookPostID={bookPostID} />
      </div>
      <style jsx={true}>
        {`
          .book-post-page-detail-container {
            max-width: 700px;
            border: 1px solid;
            margin: 50px auto;
            padding: 16px;
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
}
