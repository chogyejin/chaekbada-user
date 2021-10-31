import Link from 'next/link';
import Head from 'next/head';

export default function BookPosts() {
  return (
    <>
      <Head>
        <title>게시판</title>
      </Head>
      <div>게시판 페이지</div>
      <Link href="/">
        <a>홈</a>
      </Link>
    </>
  );
}
