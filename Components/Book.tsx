import { useState } from 'react';
import { IBook } from '../pages/BookPostDetail/[id]';

interface Props {
  book: IBook;
}

export default function Book({ book }: Props) {
  const {
    title,
    bookID,
    contents,
    userID,
    interestedCounts,
    endDate,
    bidPrice,
    buyingItNowPrice,
    reservePrice,
    bookImageUrl,
    isActive,
    thumbnail,
  } = book;
  const { name } = book.user;
  const [offerdPrice, setOfferdPrice] = useState<number>(0);

  console.log(book);
  return (
    <>
      <div
        style={{
          marginLeft: '20px',
          marginBottom: '20px',
          display: 'flex',
        }}>
        <img src={book.thumbnail} />
        <div>
          <div>
            <div>즉시 구매가 : {buyingItNowPrice}</div>
            <div>
              <button>즉시 구매하기</button>
            </div>
          </div>
          <div>
            <div>현재 입찰가 : {bidPrice}</div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="입찰 희망가 입력..."
                  onChange={(event) => {
                    console.log(Number(event.target.value));
                  }}
                />
              </div>
              <div>
                <button>입찰하기</button>
              </div>
            </div>
          </div>

          <div>마감 기한 : {endDate.toString().slice(0, 10)}</div>
          <div>판매자 :{name}</div>
          <div>글 내용 : {contents}</div>
        </div>
      </div>
    </>
  );
}
