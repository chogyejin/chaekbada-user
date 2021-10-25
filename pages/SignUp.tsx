import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import DaumPostcode, { Address } from 'react-daum-postcode';
import AddressComponent from '../Components/Address';
import axios from 'axios';


export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  // const emailRef = useRef<HTMLInputElement>(null);
  // const pwdRef = useRef<HTMLInputElement>(null);
  //const nameRef= useRef<HTMLInputElement>(null);
  // const pwdCheckRef = useRef<HTMLInputElement>(null);
  //const school_nameRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('');
  
  
  const [address, setAddress] = useState<string>('');
  const [detailAddress,setDetailAddress]=useState<string>('');//상세주소
  const [isOpen, SetIsOpen] = useState<boolean>(false);
  const [signUpSuccess, setSignUpSuccess]=useState(false);
  const [signUpError, setSignUpError]=useState('');
 
  

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    //로딩중이 아니고 입력 다 받으면 보내기
    if (!isLoading && email && password && name &&schoolName&& address&&detailAddress ) {
      setIsLoading(true);

      // const email = emailRef.current.value;
      // const pwd = pwdRef.current.value;
      console.log(email);
      console.log(password);
      console.log(name);
      console.log(schoolName);
      console.log(address);
      console.log(detailAddress);}
      
    
    setIsLoading(false);
    async (email: any, password: any,name: any,schoolName: any,address: any,detailAddress: any) => {
      try {
        const response = await axios.post(``, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          email: email,
          password: password,
          name: name,
          schoolName: schoolName,
          address:address,
          detailAddress:detailAddress
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
  }
    
   
  

  function openPopup() {
    SetIsOpen(true);
  }

  function getAddress(address: string) {
    setAddress(address);
    SetIsOpen(false);
  }
  return (
    
    
    <div className="loginregister">
      <form onSubmit={onSubmit}>
        <div>
      
          <input name="name" type="name" placeholder="이름" value={name} onChange={(event)=>{
            setName(event.target.value);
          }}
          className="loginregister__input"
          />
          </div>
          <div>
          <input name="email" type="email" placeholder="이메일" value={email} onChange={(event)=>{
            setEmail(event.target.value);
          }}
          className="loginregister__input"
          />
          </div>
          <div>
          <input name="password" type="password" placeholder="비밀번호" value={password} onChange={(event)=>{
            setPassword(event.target.value);
          }}
          className="loginregister__input"
          />
          </div>
          <div>
          <input name="passwordCheck" type="passwordCheck" placeholder="비밀번호 재입력" value={passwordCheck} onChange={(event)=>{
            setPasswordCheck(event.target.value);
          }}
          className="loginregister__input"
          />
          </div>
          <div>
          {passwordCheck &&
            password !== passwordCheck &&
            '비밀번호를 다시 입력하세요.'}
        </div>
        <div>
          <input name="schoolName" type="schoolName" placeholder="학교이름" value={schoolName} onChange={(event)=>{
            setSchoolName(event.target.value);
          }}
          className="loginregister__input"
          />
          </div>
          <div>
          <input type="text" placeholder="주소" value={address} className="loginregister__input" />
          <button onClick={openPopup}>주소찾기 </button>
          {isOpen && (
            <>
            <AddressComponent getAddress={getAddress} />
            </>
          )}
         
          </div>
          <div>
          <input name="detailAddress" type="detailAddress" placeholder="상세주소" value={detailAddress}  onChange={(event)=>{
            setDetailAddress(event.target.value);
          }}
         
          className="loginregister__input"
          />
          </div>
          <div>
            <button type="submit" onSubmit={onSubmit}
            className="loginregister__button">
            
            회원가입
            </button>
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
