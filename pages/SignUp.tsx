import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import DaumPostcode, { Address } from 'react-daum-postcode';
import AddressComponent from '../Components/Address';
import axios from 'axios';
<<<<<<< HEAD

=======
>>>>>>> 20bd275f50ada405416164d000243bed782fb2d8

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [universityID, setUniversityID] = useState<string>('');
<<<<<<< HEAD
  
  
  const [address, setAddress] = useState<string>('');
  const [detailAddress,setDetailAddress]=useState<string>('');//상세주소
  const [isOpen, SetIsOpen] = useState<boolean>(false);
  const [signUpSuccess, setSignUpSuccess]=useState(false);
  const [signUpError, setSignUpError]=useState('');
 
  
=======
  //포인트, 비딩포인트, 프로필url, isAuth는 임시
  const point = 0;
  const biddingPoint = 0;
  const profileImageUrl = 'image';
  const isAuth = false;
  const [address, setAddress] = useState<string>('');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
>>>>>>> 20bd275f50ada405416164d000243bed782fb2d8

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
<<<<<<< HEAD
    //로딩중이 아니고 입력 다 받으면 보내기
    if (!isLoading && email && password && name &&universityID&& address&&detailAddress ) {
      setIsLoading(true);

      // const email = emailRef.current.value;
      // const pwd = pwdRef.current.value;
      console.log(email);
      console.log(password);
      console.log(name);
      console.log(universityID);
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
=======

    const response = await axios.post(
      'http://localhost:4000/signUp',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      {
        params: {
          email,
          password,
          name,
          address: fullAddress,
          universityID,
          point,
          biddingPoint,
          profileImageUrl,
          isAuth,
        },
      },
    );

    if (response.status) {
      console.log(response.data);
    }
>>>>>>> 20bd275f50ada405416164d000243bed782fb2d8
  }
    
   
  

<<<<<<< HEAD
  function openPopup() {
    SetIsOpen(true);
=======
  function openPopup(e: React.FormEvent) {
    e.preventDefault();
    setIsOpen(!isOpen);
>>>>>>> 20bd275f50ada405416164d000243bed782fb2d8
  }

  function getAddress(address: string) {
    setAddress(address);
    SetIsOpen(false);
  }

  return (
<<<<<<< HEAD
    
    
    <div className="loginregister">
      <form onSubmit={onSubmit}>
       
          <div>
          <input name="email" type="email" placeholder="이메일" value={email} onChange={(event)=>{
            setEmail(event.target.value); 
          }}
          className="loginregister__input"
          />
          <button type={"submit"}>중복확인</button>
          </div>
          <div>
          <input name="password" type="password" placeholder="비밀번호" value={password} onChange={(event)=>{
            setPassword(event.target.value);
          }}
          className="loginregister__input"
          />
          </div>
          <div>
          <input name="passwordCheck" type="password" placeholder="비밀번호 확인" value={passwordCheck} onChange={(event)=>{
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
      
      <input name="name" type="name" placeholder="이름" value={name} onChange={(event)=>{
        setName(event.target.value);
      }}
      className="loginregister__input"
      />
      </div>
        <div>
          <input name="schoolName" type="schoolName" placeholder="학교이름" value={universityID} onChange={(event)=>{
            setUniversityID(event.target.value);
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
=======
    <>
      <div className="loginregister">
        <form onSubmit={onSubmit}>
          <div style={{ fontSize: '50px', margin: '0 0 50px 50px' }}>
            회원가입
          </div>
          <div className="input_area">
            <input
              className="loginregister__input"
              type="email"
              placeholder="이메일 입력"
              // ref={emailRef}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <button style={{ width: '100px', height: '50px' }}>
              중복 확인
            </button>
          </div>

          <div className="input_area">
            <input
              className="loginregister__input"
              type="password"
              placeholder="비밀번호 입력"
              // ref={pwdRef}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <div className="input_area">
            <input
              className="loginregister__input"
              type="password"
              placeholder="비밀번호 재입력"
              // ref={pwdCheckRef}
              value={passwordCheck}
              onChange={(event) => {
                setPasswordCheck(event.target.value);
              }}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            {passwordCheck &&
              password !== passwordCheck &&
              '비밀번호를 다시 입력하세요.'}
          </div>

          <div className="input_area">
            <input
              className="loginregister__input"
              type="name"
              placeholder="이름 입력"
              // ref={nameRef}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="input_area">
            <input
              className="loginregister__input"
              type="text"
              placeholder="학교 입력"
              // ref={school_nameRef}
              value={universityID}
              onChange={(event) => {
                setUniversityID(event.target.value);
              }}
            />
          </div>

          <div>
            <input
              className="loginregister__input"
              type="text"
              placeholder="주소 입력"
              value={address}
            />
            <button
              style={{ width: '100px', height: '50px' }}
              onClick={openPopup}>
              주소 찾기
            </button>
            {isOpen && (
              <>
                <AddressComponent getAddress={getAddress} />
              </>
            )}
          </div>
          <div>
            <input
              className="loginregister__input"
              type="text"
              placeholder="상세주소 입력"
              onChange={(event) => {
                setFullAddress(address + ' ' + event.target.value);
              }}
            />
          </div>

          <button className="loginregister__button">회원가입</button>
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
            marign: 10px;
            border-radius: 10px;
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
>>>>>>> 20bd275f50ada405416164d000243bed782fb2d8
        `}
      </style>
    </div>
    
  );
      }

