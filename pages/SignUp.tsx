import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import DaumPostcode, { Address } from 'react-daum-postcode';
import AddressComponent from '../Components/Address';


function SignUp() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [major,setMajor]=  useState<string>('');
  const [birthday,setBirthday] = useState<string>('');
  const [school_name, setSchool_name] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isOpen, SetIsOpen] = useState<boolean>(false);
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
          <div><input name="confirmPassword" type="confirmpassword" placeholder="비밀번호 확인" value={checkPassword} onChange={(event)=>{
            setCheckPassword(event.target.value);}} className="loginregister__input"/></div>
          <div><input name="school_name" type="school_name" placeholder="학교" value={school_name} onChange={(event)=>{
            setSchool_name(event.target.value);}} className="loginregister__input"/></div>
          <div><input name="major" type="major" placeholder="학과" value={major} onChange={(event)=>{
            setMajor(event.target.value);}} className="loginregister__input"/></div>
          <div><input name="birthday" type="birthday" placeholder="생일" value={birthday} onChange={(event)=>{
            setBirthday(event.target.value);}} className="loginregister__input"/></div>
          <div><button type="submit"  className="loginregister__button">계정 생성하기</button></div>
          <div>
            {password !==checkPassword&& checkPassword&& '비밀번호를 다시 입력하세요.'}
            
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