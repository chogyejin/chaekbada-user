import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import { onLogout, onMoveLoginPage } from '../common/utils';

const Header = () => {
  const [isVerifiedToken, setIsVerifiedToken] = useState<boolean>(false);

  useEffect(() => {
    const cookies = new Cookies();
    const localCookies = cookies.get('chaekbadaUserCookie');
    const hasCookies = !!localCookies;
    if (hasCookies) {
      setIsVerifiedToken(
        !!jwt.verify(
          //확실한 논리연산자 !!
          localCookies,
          process.env.NEXT_PUBLIC_JWT_SECRET as string,
        ),
      );
    }
  }, []);

  return (
    <>
      <div className="top">
        <div className="wrapper">
          <ul className="top-menu">
            <li className="left">
              <Link href="/BookPosts">전체 책</Link>
            </li>
            <li className="left">
              <Link href="/SolutionPosts">솔루션 게시판</Link>
            </li>
            <li className="right">
              <Link href="/SignUp">회원가입</Link>
            </li>
            {isVerifiedToken ? (
              <li className="right">
                <button onClick={onLogout}>로그아웃</button>
              </li>
            ) : (
              <li className="right">
                <button onClick={onMoveLoginPage}>로그인</button>
              </li>
            )}
          </ul>
          <div className="top-secondLine">
            <div id="logo">
              <Link href="/">CHAECKBADA</Link>
            </div>
            <div className="ui icon input" id="search">
              <input type="text" placeholder="Search..." />
              <i className="search icon"></i>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .top {
            background-color: #cc99ff;
            position: relative;
            width: 100%;
            height: 120px;
            left: 0;
            border-bottom: 3px;
          }
          .wrapper {
            margin: 0 auto;
            width: 1100px;
          }
          .top-menu {
            display: inline;
          }
          .top-menu li {
            margin-top: 20px;
            margin-bottom: 30px;
            display: inline-block;
            color: inherit;
          }
          .top-menu .right {
            float: right;
            padding-right: 50px;
          }
          .top-menu .left {
            padding-right: 50px;
          }
          .top-secondLine {
            display: flex;
          }
          .top #logo {
            margin-left: 5%;
            flex-grow: 1;
            font-family: 'Raleway:wght@200', cursive;
            font-size: 35px;
          }
          .top #search {
            height: 100%;
            width: 30px;
            flex-grow: 10;
            margin-right: 25%;
          }
        `}
      </style>
    </>
  );
};

export default Header;
