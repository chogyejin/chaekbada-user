

import axios from 'axios';

import React, { useState } from 'react';
import Link from 'next/link';



export default function Login() {
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [LoginError, setLoginError] = useState(false);
  const [LoginSuccess, setLoginSuccess]=useState(false);
  function onSubmit(e: React.FormEvent){
    e.preventDefault();
    setLoginError(false);
    axios
    .post(
      '',
      {email,password},{
        withCredentials:true,
      },
    )
    .then((response) =>{
      console.log(response);
      setLoginSuccess(true);
    })
    .catch((error)=>{
      setLoginError(error.response?.data?.code ===401);
    });
  
  }

  
  return (
    <div className="loginregister">
      <form>
        <div>
          <input
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
          <button type="submit" className="loginregister__button">
            로그인
          </button>
        </div>
        <div>
          <button type="submit" className="loginregister__button" >
            <Link href="/SignUp">
            회원가입하러가기
            </Link>
          </button>
            
        </div>
      </form>
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
            marign: 10px;
          }
          .loginregister__button {
            background-color: rgb(248, 47, 98);
            color: rgb(255, 255, 255);
            font-weight: 700;
            width: 100%;
            border-radius: 40px;
            height: 48px;
            margin-top: 10px;
          }
        `}
      </style>
    </div>
  );
}
