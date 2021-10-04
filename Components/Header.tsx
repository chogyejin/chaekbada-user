import Link from 'next/link';
import styles from 'D:/chaekbada-user2/styles/Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logo_container}>
          <Link href="#">
            <a>Traffickr</a>
          </Link>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>
            <Link href="#">
            
              <a>로그인</a>
              </Link>
            </li>
            <li>
            <Link href="#">
            <a>내 정보</a>
            </Link>
            </li>
            <li>
            <Link href="#">    
              
                <a>문의하기</a>
                </Link>
            </li>
            <li>
            <Link href="#">
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
export default Header
      <style jsx>
        {`
          .header {
            background-color: #c4f0be;
            max-width: 1140px;
            margin: 0 auto;
          }
          .headerFirst {
            display: flex;
            justify-content: space-between;
          }
          #logo {
            flex: 3;
          }
          #myMenu {
            display: flex;
            flex: 1;
          }
          #myMenu div {
            width: 100%;
            margin-left: 30px;
            text-align: center;
          }
          .headerSecond {
            display: flex;
            justify-content: center;
          }
          .headerSecond div {
            margin-left: 30px;
          }
        `}
      </style>
    </>
  );
}
