import Link from "next/link";
import { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
import { onLogout, onMoveLoginPage } from "../common/utils";
import { Button } from "reactstrap";
import React from "react";

const Header = () => {
  const [isVerifiedToken, setIsVerifiedToken] = useState<boolean>(false);

  useEffect(() => {
    const cookies = new Cookies();
    const localCookies = cookies.get("chaekbadaUserCookie");
    const hasCookies = !!localCookies;
    if (hasCookies) {
      setIsVerifiedToken(
        !!jwt.verify(
          //확실한 논리연산자 !!
          localCookies,
          process.env.NEXT_PUBLIC_JWT_SECRET as string
        )
      );
    } else {
      setIsVerifiedToken(false);
    }
  });

  return (
    <>
      <div className="top">
        <div className="wrapper">
          <ul className="top-menu">
            <li className="left">
              <Link href="/BookPosts">
                <span style={{ color: "white", cursor: "pointer" }}>
                  전체 책
                </span>
              </Link>
            </li>
            <li className="left">
              <Link href="/SolutionPosts">
                <span style={{ color: "white", cursor: "pointer" }}>
                  솔루션 게시판
                </span>
              </Link>
            </li>

            {isVerifiedToken ? (
              <React.Fragment>
                <li className="right">
                  <div style={{ cursor: "pointer" }} onClick={onLogout}>
                    로그아웃
                  </div>
                </li>
                <li className="right">
                  <Link href="/Mypage">
                    <span style={{ color: "white", cursor: "pointer" }}>
                      마이페이지
                    </span>
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="right">
                  <Link href="/SignUp">
                    <span style={{ color: "white", cursor: "pointer" }}>
                      회원가입
                    </span>
                  </Link>
                </li>
                <li className="right">
                  <div style={{ cursor: "pointer" }} onClick={onMoveLoginPage}>
                    로그인
                  </div>
                </li>
              </React.Fragment>
            )}
          </ul>
          <div className="top-secondLine">
            <div id="logo">
              <Link href="/">
                <span style={{ color: "#FF6600", cursor: "pointer" }}>
                  CHAECKBADA
                </span>
              </Link>
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
            background-color: rgba(0, 0, 0, 0.9);
            position: relative;
            width: 100%;
            padding-bottom: 14px;
            left: 0;
            border-bottom: 3px;
          }
          .wrapper {
            margin: 0 auto;
            width: 1320px;
          }
          .top-menu {
            display: inline;
          }
          .top-menu li {
            margin-top: 10px;
            margin-bottom: 10px;
            display: inline-block;
            color: white;
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
            border-top: 1px solid rgba(255, 255, 255, 0.8);
            padding-top: 14px;
          }
          .top #logo {
            margin-left: 5%;
            flex-grow: 1;
            font-family: "Raleway:wght@200", cursive;
            font-size: 35px;
            padding-top: 8px;
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
