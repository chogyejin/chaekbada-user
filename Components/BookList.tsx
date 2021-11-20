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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: `center`,
        }}>
        {list.map((bookpost, id) => (
          <div
            style={{
              padding: '10px',
              marginBottom: '20px',
              border: '1px solid black',
              width: '500px',
              marginRight: '20px',
            }}>
            <Link
              href="/BookPostDetail/[id]"
              as={`/BookPostDetail/${bookpost.id}`}
              key={id}>
              <div style={{ display: 'flex' }}>
                <img src={bookpost.thumbnail} />
                <div style={{ display: 'grid', alignItems: 'center' }}>
                  <div>책 이름 : {bookpost.title}</div>
                  <div>현재 입찰가 : {bookpost.bidPrice}</div>
                  <div>즉시 구매가 : {bookpost.buyingItNowPrice}</div>
                  <div>
                    마감 기한 : {bookpost.endDate.toString().slice(0, 10)}
                  </div>
                  <div>판매자 :{bookpost.user.name}</div>
                </div>
                <div>
                  <button onClick={interest(bookpost.id)}>찜</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
