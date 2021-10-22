import React, {useState,useEffect} from 'react'
import axios from 'axios';


function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleInputId = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value)
}

const handleInputPw = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value)
}

// login 버튼 클릭 이벤트
const onClickLogin = () => {
  console.log('click login')
  console.log('ID : ', email)
  console.log('PW : ', password)
  axios.post('/user_inform/onLogin', null, {
      params: {
      'user_id': email,
      'user_pw': password
      }
  })
  .then(res => {
    console.log(res)
    console.log('res.data.userId :: ', res.data.email)
    console.log('res.data.msg :: ', res.data.msg)
    if(res.data.email === undefined){
        // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
        console.log('======================',res.data.msg)
        alert('입력하신 id 가 일치하지 않습니다.')
    } else if(res.data.userId === null){
        // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
        console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
        alert('입력하신 비밀번호 가 일치하지 않습니다.')
    } else if(res.data.userId === email) {
        // id, pw 모두 일치 userId = userId1, msg = undefined
        console.log('======================','로그인 성공')
        sessionStorage.setItem('user_id', email)
    }
    // 작업 완료 되면 페이지 이동(새로고침)
    document.location.href = '/'
})
.catch()
}

// 페이지 렌더링 후 가장 처음 호출되는 함수
useEffect(() => {
    axios.get('/user_inform/Login')
    .then(res => console.log(res))
    .catch()
},
// 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
[])
 

 

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