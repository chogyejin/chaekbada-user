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
  const [offeredPrice, setOfferdPrice] = useState<number>(0);

  function onBid() {
    if (bidPrice == 0) {
      if (offeredPrice <= reservePrice) {
        alert('더 높은 입찰 가격을 입력하세요');
      } else {
        console.log('입찰1');
      }
    } else {
      if (offeredPrice <= bidPrice) {
        alert('더 높은 입찰가격을 입력하세요');
      } else {
        console.log('입찰2');
      }
    }
  }
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
            <div>
              현재 입찰가 :
              {bidPrice == 0 ? <>입찰한 사람 없음</> : <>{bidPrice}</>}
            </div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="입찰 희망가 입력..."
                  onChange={(event) => {
                    setOfferdPrice(Number(event.target.value));
                  }}
                />
              </div>
              <div>
                현재 입찰가 :
                {bidPrice == 0 ? (
                  <>현재 최저 경매가는 {reservePrice}입니다</>
                ) : (
                  <>{bidPrice}보다 높은 가격 입력하세요</>
                )}
              </div>
              <div>
                <button type="button" onClick={onBid}>
                  입찰하기
                </button>
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
