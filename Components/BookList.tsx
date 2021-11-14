import { IBookPosts } from '../pages/BookPosts';
import { axiosFunction } from '../common/utils';
import Link from 'next/link';
import BookPost from '../pages/BookPostDetail/[id]';

interface Props {
  list: IBookPosts[];
}

export default function BookList({ list }: Props) {
  const interest = (bookPostID: string) => async () => {
    const result = await axiosFunction({
      url: '/bookPost/post/interestCount',
      method: 'POST',
      params: { bookPostID },
    });
  };
  return (
    <>
      <div style={{ paddingTop: '20px', alignItems: 'center' }}>
        {list.map((bookpost, id) => (
          <div>
            <div
              style={{
                marginLeft: '20px',
                marginBottom: '20px',
                display: 'flex',
              }}>
              <img src={bookpost.thumbnail} />
              <div style={{}}>
                <div>현재 입찰가 : {bookpost.bidPrice}</div>
                <div>즉시 구매가 : {bookpost.buyingItNowPrice}</div>
                <div>
                  마감 기한 : {bookpost.endDate.toString().slice(0, 10)}
                </div>
                <div>판매자 :{}</div>
                <div>
                  <button onClick={interest(bookpost.id)}>찜</button>
                </div>
              </div>
            </div>
            <Link
              href="/BookPostDetail/[id]"
              as={`/BookPostDetail/${bookpost.id}`}
              key={id}>
              <div> 더보기 </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
