import Link from 'next/link';
import styles from '/styles/HomeContainer.module.scss';
const HomeContainer = () => {
    return (
        <>
          
          <div className={styles.container}>
          <Link href="/postList">게시판 가기</Link>
          
          
            <Link href="/login">로그인 가기</Link>
          
          
            <Link href="/signup">회원가입 가기</Link>
          </div>
        </>
      );
  }
  
  export default HomeContainer