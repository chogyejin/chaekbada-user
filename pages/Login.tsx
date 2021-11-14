import React, { useState } from "react";
import { axiosFunction } from "../common/utils";
import Cookies from "universal-cookie";
import router from "next/router";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    const result = await axiosFunction({
      url: "/signIn",
      method: "GET",
      params: { email, password },
    });

    if (result) {
      if (result.data) {
        const cookies = new Cookies();
        cookies.set("chaekbadaUserCookie", result.data.token);
      }
      router.push("/");
    }
  }

  return (
    <div className="loginregister">
      <div
        style={{
          border: "0.5px solid rgba(0,0,0,0.2)",
          padding: "30px 100px 100px 100px",
          borderRadius: "20px",
        }}
      >
        <h2 style={{ marginBottom: "40px" }}>로그인</h2>
        <form>
          <div>
            <input
              style={{
                borderRadius: "10px 10px 0px 0px",
                border: "1px solid black",
              }}
              name="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="loginregister__input"
            />
          </div>
          <div>
            <input
              style={{
                borderTop: "none",
                borderBottom: "none",
                border: "1px solid black",
              }}
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="loginregister__input"
            />
          </div>
          <div>
            <button
              style={{
                color: "black",
                backgroundColor: "#FF6600",
                borderRadius: "0px 0px 10px 10px",
                border: "1px solid black",
              }}
              type="submit"
              className="loginregister__button"
              onClick={onLogin}
            >
              로그인
            </button>
          </div>
        </form>
      </div>

      <style jsx>
        {`
          .loginregister {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .loginregister__input {
            width: 300px;
            height: 50px;
            padding-left: 10px;
          }
          .loginregister__button {
            color: rgb(255, 255, 255);
            font-weight: 700;
            width: 100%;
            height: 48px;
          }
        `}
      </style>
    </div>
  );
}
