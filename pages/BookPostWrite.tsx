import { useEffect, useState } from 'react';
import BookSearch from '../Components/BookSearch';

export default function BookPostWrite() {
  const [title, setTitle] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [buyingItNowPrice, setBuyingItNowPrice] = useState<number>(0);
  const [reservePrice, setReservePrice] = useState<number>(0);
  const [contents, setContents] = useState<string>('');

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
