import Link from 'next/link';
import styles from '/styles/HomeContainer.module.scss';
const HomeContainer = () => {
  return (
    <>
      <div className={styles.container}>
        <Link href="/PostList">게시판 가기</Link>

        <Link href="/Login">로그인 가기</Link>

        <Link href="/SignUp">회원가입 가기</Link>
      </div>
    </>
  );
};

export default HomeContainer;
