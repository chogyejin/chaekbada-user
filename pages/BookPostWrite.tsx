import { useEffect, useState } from 'react';
import BookSearch from '../Components/BookSearch';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookPostWrite() {
  const [title, setTitle] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [buyingItNowPrice, setBuyingItNowPrice] = useState<number>(0);
  const [reservePrice, setReservePrice] = useState<number>(0);
  const [contents, setContents] = useState<string>('');
  const [endDate, setEndDate] = useState<Date>(new Date());

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  function getData(title: string, thumbnail: string) {
    setTitle(title);
    setThumbnail(thumbnail);
  }

  useEffect(() => {
    console.log(title);
    console.log(thumbnail);
  }, [title]);

  return (
    <>
      <h1>글 작성하는 페이지</h1>
      <form onSubmit={onSubmit}>
        <div>
          <BookSearch getData={getData} />
        </div>
        <div>{title}</div>
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
        <DatePicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          minDate={new Date()}
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)} //params로 toDateString()한 문자열 보내기
        />
        <div>
          <textarea
            style={{ width: '500px', height: '300px' }}
            placeholder="글 내용"
            onChange={(event) => {
              setContents(event.target.value);
            }}></textarea>
        </div>
        <button>작성</button>
      </form>
    </>
  );
}
