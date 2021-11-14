import { useEffect, useState } from 'react';
import BookSearch from '../Components/BookSearch';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { axiosFunction } from '../common/utils';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import router from 'next/router';

export default function BookPostWrite() {
  const [title, setTitle] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [buyingItNowPrice, setBuyingItNowPrice] = useState<number>(0);
  const [reservePrice, setReservePrice] = useState<number>(0);
  const [contents, setContents] = useState<string>('');
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().toDateString() + ' ' + '23:59:59'),
  );
  const [decodedID, setDecodedID] = useState<string>('');
  const [bookID, setBookID] = useState<string>('');

  useEffect(() => {
    const cookies = new Cookies();
    const localCookies = cookies.get('chaekbadaUserCookie');
    const decodedToken = jwt.verify(
      localCookies,
      process.env.NEXT_PUBLIC_JWT_SECRET as string,
    ) as any;
    setDecodedID(decodedToken.id);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await axiosFunction({
      url: '/bookPost/write',
      method: 'POST',
      params: {
        bookID,
        title,
        contents,
        userID: decodedID,
        endDate,
        reservePrice,
        buyingItNowPrice,
        bookImageUrl: '',
        thumbnail,
      },
    });

    if (result) {
      if (result.data) {
        router.push('/BookPosts');
      }
    }
  }

  function getBookID(bookID: string) {
    setBookID(bookID);
  }

  function getData(title: string, thumbnail: string) {
    setTitle(title);
    setThumbnail(thumbnail);
  }

  useEffect(() => {
    console.log(new Date(endDate.toDateString() + ' ' + '23:59:59'));
  }, [endDate]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>글 작성하는 페이지</h1>
      <form onSubmit={onSubmit}>
        <div>
          <BookSearch getData={getData} getBookID={getBookID} />
        </div>
        <div>책 제목</div>
        <div>{title}</div>
        <div>
          <div>
            <input
              placeholder="즉시 구매가 (원)"
              onChange={(event) => {
                setBuyingItNowPrice(Number(event.target.value));
              }}
            />
          </div>
          <div>
            <input
              placeholder="최저 경매가 (원)"
              onChange={(event) => {
                setReservePrice(Number(event.target.value));
              }}
            />
          </div>
        </div>
        <div>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            minDate={new Date()}
            selected={endDate}
            onChange={(date: Date) =>
              setEndDate(new Date(date.toDateString() + ' ' + '23:59:59'))
            }
          />
        </div>
        <div>
          <textarea
            style={{ width: '500px', height: '300px', resize: 'none' }}
            placeholder="글 내용"
            onChange={(event) => {
              setContents(event.target.value);
            }}></textarea>
        </div>
        {title && buyingItNowPrice && reservePrice && contents && endDate ? (
          <button>작성</button>
        ) : (
          <button disabled>작성</button>
        )}
      </form>
    </>
  );
}
