import { useEffect, useState } from 'react';
import axios from 'axios';
const KAKAO_API_KEY = '9dd6fb96848ab5a05c86502a27a90fa8'; //REST API KEY

const Kakao = axios.create({
  baseURL: 'https://dapi.kakao.com', // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
  },
});

interface Props {
  getData: (title: string, thumbnail: string) => void;
}

interface IBook {
  title: string;
  thumbnail: string;
}

export default function BookSearch({ getData }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bookName, setBookName] = useState<string>('');
  const [books, setBooks] = useState<IBook[]>([]);

  async function onSearch(bookName: string) {
    if (bookName === '') {
      alert('책 이름을 입력하세요');
      return;
    }
    const result = await Kakao.get('/v3/search/book', {
      params: {
        query: bookName,
      },
    });

    if (result.data.documents.length == 0) {
      alert('책 이름을 바르게 입력하세요');
    }

    if (result.data.documents.length !== 0) {
      console.log(typeof result);
      // console.log(result.data.meta);
      console.log(result.data.documents);
      // console.log(result.data.documents[0].thumbnail);
      // setThumbnail(result.data.documents[0].thumbnail);
      setBooks(result.data.documents);
      setIsOpen(true);
    }
  }

  // useEffect(() => {
  //   console.log(books);
  //   console.log(books[0].title);
  //   console.log(books[1].title);
  // }, [books]);

  return (
    <>
      <input
        type="text"
        placeholder="책 이름 검색.."
        value={bookName}
        onChange={(event) => {
          setBookName(event.target.value);
        }}
      />
      <button onClick={() => onSearch(bookName)}>책 찾기</button>
      {isOpen && (
        <div style={{ display: 'flex', paddingTop: '20px' }}>
          {books.map((book, id) => (
            <div key={id} style={{ marginLeft: '20px' }}>
              <img
                src={book.thumbnail}
                onClick={() => {
                  getData(book.title, book.thumbnail);
                  setIsOpen(false);
                }}
              />
              <div>{book.title.slice(0, 10)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
