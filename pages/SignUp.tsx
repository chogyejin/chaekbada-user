import React, { useState } from 'react';
import AddressComponent from '../Components/Address';
import { axiosFunction } from '../common/utils';
import router from 'next/router';
import axios from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [universityID, setUniversityID] = useState<string>('');
  //포인트, 비딩포인트, 프로필url, isAuth는 임시
  const point = 0;
  const biddingPoint = 0;
  const profileImageUrl = 'image';
  const isAuth = false;
  const [address, setAddress] = useState<string>('');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedEmail, setCheckedEmail] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await axiosFunction({
      url: '/signUp',
      method: 'POST',
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
    });

    if (result) {
      if (result.data) {
        console.log(result.data);
        router.push('/');
      }
    }
  }

  function openPopup(e: React.FormEvent) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  function getAddress(address: string) {
    setAddress(address);
    setIsOpen(false);
  }

  async function checkEmail() {
    const result = await axiosFunction({
      url: '/signUp/email-check',
      method: 'GET',
      params: {
        email,
      },
    });

    if (result!.data) {
      setCheckedEmail(true);
      alert('해당 이메일 사용 가능');
    } else {
      alert('다른 이메일 입력하세요');
    }
  }

  return (
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
            <button
              type="button"
              style={{ width: '100px', height: '50px' }}
              onClick={checkEmail}>
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
              type="button"
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
          {email &&
          password &&
          passwordCheck &&
          name &&
          universityID &&
          address &&
          fullAddress &&
          checkedEmail ? (
            <button className="loginregister__button">회원가입</button>
          ) : (
            <button disabled className="loginregister__button_disabled">
              회원가입
            </button>
          )}
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
          .loginregister__button_disabled {
            opacity: 0.3;
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
    </>
  );
}
