import { IBookPosts } from '../pages/BookPosts';
import Link from 'next/link';

interface Props {
  list: IBookPosts[];
}

export default function BookList({ list }: Props) {
  return (
    <>
      <div style={{ paddingTop: '20px', alignItems: 'center' }}>
        {list.map((bookpost, id) => (
          <Link
            href="/BookPostDetail/[id]"
            as={`/BookPostDetail/${bookpost.id}`}
            key={id}>
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
                <div>판매자 :{bookpost.user.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
