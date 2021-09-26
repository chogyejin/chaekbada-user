import Link from 'next/link';
import Layout from '../Components/Layout';

export default function Home() {
  return (
    <>
      <div>MainContainer</div>
      <div>
        <Link href="/postList">게시판 가기</Link>
      </div>
      <div>
        <Link href="/login">로그인 가기</Link>
      </div>
      <div>
        <Link href="/signup">회원가입 가기</Link>
      </div>
    </>
  );
}
