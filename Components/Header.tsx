import Link from 'next/link';
import styles from '/styles/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logo_container}>
          <Link href="/">
            <a>Chaekbada</a>
          </Link>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <div>
              <li>
                <Link href="/Login">
                  <a>로그인</a>
                </Link>
              </li>
              <li>
                <Link href="/SignUp">
                  <a>회원가입</a>
                </Link>
              </li>
            </div>
            <li>
<<<<<<< HEAD
            <Link href="/Login">
            
              <a>로그인/회원가입</a>
              </Link>
            </li>
            
=======
              <Link href="/BookPosts">
                <a>전체 책</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>솔루션 게시판</a>
              </Link>
            </li>
>>>>>>> 20bd275f50ada405416164d000243bed782fb2d8
            <li>
              <Link href="#">
                <a>내 정보</a>
              </Link>
            </li>
            
            
            <li>
<<<<<<< HEAD
            <Link href="/PostList">
                <a>전체 책</a>
                </Link>
            </li>
            <li>
            <Link href="#">
                <a>솔루션 게시판</a>
                </Link>

=======
              <Link href="#">
                <a>문의하기</a>
              </Link>
>>>>>>> 20bd275f50ada405416164d000243bed782fb2d8
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
