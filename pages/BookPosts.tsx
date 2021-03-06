import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { axiosFunction } from '../common/utils';
import BookList from '../Components/BookList';
import { Button } from 'reactstrap';

interface IProps {
  searchWord: string;
}

export interface IBookPosts {
  id: string;
  title: string;
  thumbnail: string;
  bidPrice: number;
  buyingItNowPrice: number;
  endDate: Date;
  userID: string;
  user: {
    name: string;
  };
}

export default function BookPosts(props: IProps) {
  const [bookPosts, setBookPosts] = useState<IBookPosts[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<Boolean>(true);
  const [selectedFilterName, setSelectedFilterName] = useState<string>('new');
  console.log(props.searchWord);

  useEffect(() => {
    async function getPosts() {
      const result = await axiosFunction({
        url: '/bookPostList/new',
        method: 'GET',
        params: {
          isActive: true,
        },
      });

      if (result) {
        if (result.data) {
          console.log(result.data);
          const existsPosts = result.data.length > 0;
          if (isFirstLoad && existsPosts) {
            setIsFirstLoad(false);
            setBookPosts(result.data || []);
          }
          console.log(result.data);
        } else {
          console.log('안 넘어옴');
        }
      }
    }

    async function getSearchPosts() {
      const result = await axiosFunction({
        url: '/bookPost/searchBook',
        method: 'GET',
        params: {
          searchWord: props.searchWord,
        },
      });

      if (result) {
        if (result.data) {
          console.log(result.data);
          const existsPosts = result.data.length > 0;
          if (isFirstLoad && existsPosts) {
            setIsFirstLoad(false);
            setBookPosts(result.data || []);
          }
          console.log(result.data);
        } else {
          console.log('안 넘어옴');
        }
      }
    }

    if (props.searchWord) {
      getSearchPosts();
    } else {
      getPosts();
    }
  }, [bookPosts]);

  const getPostNew = async () => {
    setSelectedFilterName('new');
    const result = await axiosFunction({
      url: '/bookPostList/new',
      method: 'GET',
      params: {
        isActive: true,
      },
    });
    if (result) {
      if (result.data) {
        setBookPosts(result.data || []);
      }
      console.log(bookPosts);
    }
  };
  const getPostHot = async () => {
    setSelectedFilterName('hot');
    const result = await axiosFunction({
      url: '/bookPostList/hot',
      method: 'GET',
      params: { isActive: true },
    });
    if (result) {
      if (result.data) {
        setBookPosts(result.data || []);
      }
      console.log(bookPosts);
    }
  };

  return (
    <>
      <Head>
        <title>전체 책</title>
      </Head>

      <div
        style={{
          display: 'flex',
          textAlign: 'right',
          justifyContent: 'space-between',
        }}>
        <div
          style={{
            display: 'flex',
          }}>
          <div
            style={{
              cursor: 'pointer',
              margin: '10px',
              color: selectedFilterName === 'new' ? 'blue' : 'black',
            }}
            onClick={getPostNew}>
            최신순
          </div>
          <div
            style={{
              cursor: 'pointer',
              margin: '10px',

              color: selectedFilterName === 'hot' ? 'blue' : 'black',
            }}
            onClick={getPostHot}>
            인기순
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '4px' }}>
          <Link href="/BookPostWrite">
            <Button color={'primary'}>판매 등록</Button>
          </Link>
        </div>
      </div>

      <hr style={{ marginTop: '1px' }} />

      <BookList list={bookPosts} />
    </>
  );
}

export async function getServerSideProps(context: {
  query: { searchWord: string };
}) {
  if (context && context.query && context.query.searchWord) {
    return {
      props: { searchWord: context.query.searchWord }, // will be passed to the page component as props
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
