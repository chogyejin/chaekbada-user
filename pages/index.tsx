import Link from 'next/link';
import Layout from '../Components/Layout';

export default function Home() {
  return (
    <>
      <div>MainContainer</div>
      <div>
        <Link href="/PostList">게시판 가기</Link>
      </div>
      <div>
        <Link href="/Login">로그인 가기</Link>
      </div>
      <div>
        <Link href="/SignUp">회원가입 가기</Link>
      </div>
    </>
  );
}
