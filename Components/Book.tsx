import { useEffect, useState } from 'react';
import { axiosFunction } from '../common/utils';
import { IBook } from '../pages/BookPostDetail/[id]';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import { Button, Input, InputGroup } from 'reactstrap';
import router from 'next/router';

interface Props {
  book: IBook;
  bookPostID: string;
}

export default function Book({ book, bookPostID }: Props) {
  const {
    title,
    bookID,
    userID,
    contents,
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
  const [decodedID, setDecodedID] = useState<string>('');

  useEffect(() => {
    const cookies = new Cookies();
    const localCookies = cookies.get('chaekbadaUserCookie');
    const decodedToken = jwt.verify(
      localCookies,
      process.env.NEXT_PUBLIC_JWT_SECRET as string,
    ) as any;
    setDecodedID(decodedToken.id);
  }, []);

  async function onClickNowBuying() {
    const { data }: any = await axiosFunction({
      url: '/buyImmediatelyBookPost',
      method: 'PUT',
      params: {
        bookPostID,
        userID: decodedID,
      },
    });
    if (data) {
      alert('구매에 성공했습니다.');
      router.push('/');
    }
  }

  async function onBid() {
    if (userID === decodedID) {
      alert('판매자는 입찰에 참여할 수 없습니다.');
      return;
    }
    if (offeredPrice >= buyingItNowPrice) {
      return;
    }

    // 입찰한 사람 없을 때
    if (bidPrice == 0) {
      if (offeredPrice <= reservePrice) {
        alert('더 높은 입찰 가격을 입력하세요.');
      } else {
        {
          console.log('입찰한 사람 없을 때');
          const result = await axiosFunction({
            url: '/bidBookPost',
            method: 'PUT',
            params: {
              bookPostID,
              userID: decodedID,
              bidPrice: String(offeredPrice),
            },
          });
          if (result?.data) {
            alert('입찰에 성공했습니다.');
            console.log(result?.data);
          }
        }
      }
    }
    //입찰한 사람 있을 때
    else {
      if (offeredPrice <= bidPrice) {
        alert('더 높은 입찰가격을 입력하세요.');
      } else {
        console.log('입찰한 사람 있을 때');
        const result = await axiosFunction({
          url: '/bidBookPost',
          method: 'PUT',
          params: {
            bookPostID,
            userID: decodedID,
            bidPrice: String(offeredPrice),
          },
        });
        if (result?.data) {
          alert('입찰에 성공했습니다.');
          console.log(result?.data);
        }
      }
    }
  }

  useEffect(() => {
    console.log(bookImageUrl);
  }, [bookImageUrl]);
  return (
    <>
      <div
        style={{
          justifyContent: 'space-evenly',
          marginBottom: '20px',
          display: 'flex',
        }}>
        <div>
          <img src={book.thumbnail} style={{ width: '200px' }} />
        </div>
        <div style={{ fontSize: '20px' }}>
          <div style={{ display: 'flex', paddingTop: '20px' }}>
            <div style={{ marginRight: '20px', marginBottom: '8px' }}>
              즉시 구매가: {buyingItNowPrice}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '8px' }}>
              현재 입찰가:{' '}
              {bidPrice == 0 ? <>입찰한 사람 없음</> : <>{bidPrice}</>}
            </div>
            <div>
              <div style={{ marginBottom: '8px' }}>
                {bidPrice == 0 ? (
                  <>최저 입찰가: {reservePrice}원</>
                ) : (
                  <>최저 입찰가: {bidPrice}</>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '8px' }}>
            마감 기한: {endDate.toString().slice(0, 10)} 23:59:59
          </div>
          <div style={{ marginBottom: '8px' }}>판매자: {name}</div>
          {isActive ? (
            <InputGroup>
              <Input
                type="text"
                placeholder="입찰 희망가 입력..."
                onChange={(event) => {
                  setOfferdPrice(Number(event.target.value));
                }}
              />
              <Button type="button" onClick={onBid}>
                입찰하기
              </Button>
              <Button color={'primary'} onClick={onClickNowBuying}>
                즉시 구매하기
              </Button>
            </InputGroup>
          ) : (
            <div style={{ color: 'red', fontWeight: 'bold' }}>판매 완료</div>
          )}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}></div>

      <hr />
      {bookImageUrl && (
        <>
          <div>
            <h3>실제 책 사진</h3>
            <img style={{ maxWidth: '300px' }} src={bookImageUrl} />
          </div>
          <hr />
        </>
      )}

      <div>{contents}</div>
    </>
  );
}
