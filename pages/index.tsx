import Link from 'next/link';
import Layout from '../Components/Layout';

export default function Home() {
  return (
    <>
      <div>MainContainer</div>
      <Link href="/postList">게시판 가기</Link>
    </>
  );
}
