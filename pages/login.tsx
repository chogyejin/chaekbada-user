import React, { useRef, useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
 
  
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    //로딩중이 아니고 입력 다 받으면 보내기
    if (!isLoading && email && password ) {
      setIsLoading(true);

      // const email = emailRef.current.value;
      // const pwd = pwdRef.current.value;
      console.log(email);
      console.log(password);
      
    }
    setIsLoading(false);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="input_area">
          <label>이메일</label>
          <input
            type="email"
            placeholder="이메일 입력"
            // ref={emailRef}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className="input_area">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            // ref={pwdRef}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button
          style={{
            opacity: isLoading ? 0.3 : 1,
          }}>
          {isLoading ? '로그인 중..' : '로그인'}
        </button>
        <div>
          <Link href="/">돌아가기</Link>
        </div>
      </form>
      <style jsx>
        {`
          .input_area input {
            background-color: gray;
            position: relative;
            width:100%;
            height:40px;
            margin 0 0 8px;
            padding : 50x 39px 5px 11px;
            border: solid 1px #dadada;
            box-sizing: border-box;
          }
          .input_area label{
            margin-top: 100px;
            padding: 20px;
            color:blue;
          }
        `}
       
      </style>
    </>
  );
}