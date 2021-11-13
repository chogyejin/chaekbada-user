import { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosFunction } from '../common/utils';
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
  isbn: string;
  datetime: Date;
  authors: string[];
  publisher: string;
  price: number;
  sale_price: number;
  thumbnail: string;
}

export default function BookSearch({ getData }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bookName, setBookName] = useState<string>('');
  const [books, setBooks] = useState<IBook[]>([]);
  const [title, setTitle] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  const [datetime, setDatetime] = useState<Date>(new Date());
  const [authors, setAuthors] = useState<string[]>([]);
  const [publisher, setPublisher] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [thumbnail, setThumbnail] = useState<string>('');

  useEffect(() => {
    console.log(
      '타이틀 ' + title + '\n',
      'isbn ' + isbn + '\n',
      'datetime ' + datetime + '\n',
      'authors ' + authors + '\n',
      'publisher ' + publisher + '\n',
      'price ' + price + '\n',
      'salePrice ' + salePrice + '\n',
      'thumbnail ' + thumbnail + '\n',
    );
    async function makeBook() {
      const result = await axiosFunction({
        url: '/bookPost/isBookinDB',
        method: 'POST',
        params: {
          title,
          isbn,
          datetime,
          authors,
          publisher,
          price,
          salePrice,
          thumbnail,
        },
      });

      if (result) {
        if (result.data) {
          console.log('돌아온 데이터 ' + result.data);
        }
      }
    }
    makeBook();
  }, [title, isbn, datetime, authors, publisher, price, salePrice, thumbnail]);

  async function onSearch(bookName: string) {
    //공백으로 책 찾기 눌렀을 때
    if (bookName === '') {
      alert('책 이름을 입력하세요');
      return;
    }

    const result = await Kakao.get('/v3/search/book', {
      params: {
        query: bookName,
      },
    });

    //검색 결과 없을 때
    if (result.data.documents.length == 0) {
      alert('책 이름을 바르게 입력하세요');
    }

    if (result.data.documents.length !== 0) {
      // console.log(typeof result);
      // // console.log(result.data.meta);
      // console.log(result.data.documents);
      setBooks(result.data.documents);
      setIsOpen(true);
    }
  }

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
      <button type="button" onClick={() => onSearch(bookName)}>
        책 찾기
      </button>
      {isOpen && (
        <div style={{ display: 'flex', paddingTop: '20px' }}>
          {books.map((book, id) => (
            <div key={id} style={{ marginLeft: '20px' }}>
              <button
                type="button"
                onClick={() => {
                  getData(book.title, book.thumbnail);
                  setTitle(book.title);
                  setIsbn(book.isbn);
                  setDatetime(book.datetime);
                  setAuthors(book.authors);
                  setPublisher(book.publisher);
                  setPrice(book.price);
                  setSalePrice(book.sale_price);
                  setThumbnail(book.thumbnail);
                  // makeBook();
                  setIsOpen(false);
                }}>
                <img src={book.thumbnail} />
              </button>
              <div>{book.title.slice(0, 10)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
