import React, {useState} from 'react'


function SignUp() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  

  const onSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    if(password !== confirmPassword) {
      return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
    }
  }

  return (
    <div className="loginregister">
      <form>
          <div><input name="name" type="text" placeholder="이름" value={name} onChange={(event)=>{
            setName(event.target.value);
          }} className="loginregister__input"/></div>
          <div><input name="email" type="email" placeholder="이메일" value={email} onChange={(event)=>{
            setEmail(event.target.value);}} className="loginregister__input"/></div>
          <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={(event)=>{
            setPassword(event.target.value);}} className="loginregister__input"/></div>
          <div><input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(event)=>{
            setConfirmPassword(event.target.value);}} className="loginregister__input"/></div>
          <div><button type="submit" onSubmit={onSubmit} className="loginregister__button">계정 생성하기</button></div>
          <div>
            {password !==confirmPassword&& confirmPassword&& '비밀번호를 다시 입력하세요.'}
            
          </div>
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
export default SignUp;