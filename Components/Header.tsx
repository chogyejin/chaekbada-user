import Link from 'next/link';

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="headerFirst">
          <div id="logo">로고</div>
          <div id="myMenu">
            {/* 로그인 li는 로그인하면 로그아웃으로 */}
            <div>
              <Link href="#">로그인</Link>
            </div>
            <div>
              <Link href="#">내 정보</Link>
            </div>
            <div>
              <Link href="#">문의하기</Link>
            </div>
          </div>
        </div>
        <div className="headerSecond">
          <div>
            <Link href="#">전체 책</Link>
          </div>
          <div>
            <Link href="#">솔루션 게시판</Link>
          </div>
        </div>
      </div>
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
