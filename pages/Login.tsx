import React, { useRef, useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  // const emailRef = useRef<HTMLInputElement>(null);
  // const pwdRef = useRef<HTMLInputElement>(null);
  //const nameRef= useRef<HTMLInputElement>(null);
  // const pwdCheckRef = useRef<HTMLInputElement>(null);
  //const school_nameRef = useRef<HTMLInputElement>(null);
  //const loginemailRef=useRef<HTMLInputElement>(null);
  //const loginpasswordRef=useRef<HTMLInputElement>(null);

 
  const[loginemail,loginEmail] = useState<string>('');
  const[loginpassword,loginPassword]=useState<string>('');


  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    //로딩중이 아니고 입력 다 받으면 보내기
    if (!isLoading && loginemail && loginpassword) {
      setIsLoading(true);

      
      console.log(loginemail);
      console.log(loginpassword);
      
    }
    setIsLoading(false);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="input_area">
          <label>이메일</label>
          <input
            type="loginemail"
            placeholder="이메일 입력"
            
            value={loginemail}
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
            
            value={loginpassword}
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
          }
        `}
      </style>
    </>
  );
}