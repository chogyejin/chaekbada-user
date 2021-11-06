import Link from 'next/link';
import Head from 'next/head';

export default function BookPosts() {
  return (
    <>
      <Head>
        <title>전체 책</title>
      </Head>

      <h1 style={{ marginBlockStart: '0px' }}>전체 책 페이지</h1>
      <Link href="/BookPostWrite">글 작성 페이지로 가자</Link>
      {/* <style jsx></style> */}
    </>
  );
}
