import Link from 'next/link';
import styles from '/styles/Header.module.scss'
import React from "react";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logo_container}>
          <Link href="/">
            <a>Chaekbadauser</a>
          </Link>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>
            <Link href="/Login">
            
              <a>로그인</a>
              </Link>
            </li>
            <li>
            <Link href="/my_info">
            <a>내 정보</a>
            </Link>
            </li>
            <li>
            <Link href="#">    
              
                <a>문의하기</a>
                </Link>
            </li>
            <li>
            <Link href="/book_list">
                <a>전체 책</a>
                </Link>
            </li>
            <li>
            <Link href="/solution">
                <a>솔루션 게시판</a>
                </Link>

            </li>
            <li>
            <Link href="/signup">
              <a>회원가입</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;