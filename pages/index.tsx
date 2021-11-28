import { axiosFunction } from '../common/utils';
import { IBook } from '../pages/BookPostDetail/[id]';
import HomeBanner from '../Components/HomeBanner';
import Link from 'next/link';
import { Button } from 'reactstrap';

interface Props {
  bookPosts: IBook[];
}

export default function Home({ bookPosts }: Props) {
  return (
    <>
      <HomeBanner />
      <div>
        <div
          style={{
            display: 'flex',
            placeContent: 'space-between',
            alignItems: 'center',
          }}>
          <div style={{ fontSize: '30px' }}>최근 등록 글</div>
          <div>
            <Link href="/BookPosts">
              <Button color={'primary'}>더 보기</Button>
            </Link>
          </div>
        </div>
        <div>
          <hr />
        </div>
        <div style={{ display: 'flex', placeContent: 'space-around' }}>
          {bookPosts.map((bookpost, index) => (
            <div
              key={index}
              style={{ border: '1px solid black', marginTop: '20px' }}>
              <img src={bookpost.thumbnail} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const result = await axiosFunction({
    url: '/bookPostList/new',
    method: 'GET',
    params: {
      isActive: true,
    },
  });
  if (!result) {
    return;
  }
  return {
    props: {
      bookPosts: result?.data.slice(0, 5),
    },
  };
}
