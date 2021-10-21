import React, {useState} from 'react'


function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
 

 

  return (
      <div className="loginregister">
        <form>
            <div><input name="email" type="email" placeholder="이메일" value={email} onChange={(event)=>{
            setEmail(event.target.value);
          }} className="loginregister__input"/></div>
            <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={(event)=>{
            setPassword(event.target.value);
          }} className="loginregister__input"/></div>
            <div><button type="submit"  className="loginregister__button">로그인</button></div>
        </form>
        <style jsx>
        {`
        .loginregister{
          display:flex;
          align-items:center;
          justify-content: center;
          height:100vh;
        }
        .loginregister__input{
          width:300px;
          height:50px;
          padding-left:10px;
          marign:10px;
        }
        .loginregister__button{
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

export default Login;