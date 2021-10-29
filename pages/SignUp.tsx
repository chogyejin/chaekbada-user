import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import DaumPostcode, { Address } from 'react-daum-postcode';
import AddressComponent from '../Components/Address';
import axios from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [universityID, setUniversityID] = useState<string>('');
  const point = 0;
  const biddingPoint = 0;
  const profileImageUrl = 'image';
  const isAuth = false;
  const [address, setAddress] = useState<string>('');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

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
  }

  function openPopup(e: React.FormEvent) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  function getAddress(address: string) {
    setAddress(address);
    setIsOpen(false);
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

        <div className="input_area">
          <label>비밀번호 확인</label>
          <input
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
          <label>이름</label>
          <input
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
          <label>학교</label>
          <input
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
          <label>주소</label>
          <input type="text" placeholder="주소 입력" value={address} />
          <button onClick={openPopup}>주소찾기</button>
          {isOpen && (
            <>
              <AddressComponent getAddress={getAddress} />
            </>
          )}
        </div>
        <div>
          <label>상세주소</label>
          <input
            type="text"
            placeholder="상세주소 입력"
            onChange={(event) => {
              setFullAddress(address + ' ' + event.target.value);
            }}
          />
        </div>

        <button>회원가입</button>
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
