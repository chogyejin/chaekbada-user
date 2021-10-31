import Link from 'next/link';
import styles from '/styles/Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logo_container}>
          <Link href="#">
            <a>Chaekbada</a>
          </Link>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>
            <Link href="/Login">
            
              <a>로그인/회원가입</a>
              </Link>
            </li>
            
            <li>
            <Link href="#">
            <a>내 정보</a>
            </Link>
            </li>
            
            
            <li>
            <Link href="/PostList">
                <a>전체 책</a>
                </Link>
            </li>
            <li>
            <Link href="#">
                <a>솔루션 게시판</a>
                </Link>

            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;