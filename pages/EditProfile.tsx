import { useState, useEffect } from 'react';
import AddressComponent from '../Components/Address';
import { Button, Input } from 'reactstrap';
import { IUser } from './Mypage';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import { axiosFunction } from '../common/utils';
import router from 'next/router';

export default function EditProfile() {
  const [user, setUser] = useState<IUser>({
    id: '',
    email: '',
    password: '',
    name: '',
    universityName: '',
    address: '',
    point: 0,
    biddingPoint: 0,
    profileImageUrl: '',
    isAuth: true,
  });
  const [address, setAddress] = useState<string>('');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordCheck, setNewPasswordCheck] = useState<string>('');

  function openPopup(e: React.FormEvent) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  function getAddress(address: string) {
    setAddress(address);
    setIsOpen(false);
  }

  let userID:any;
  useEffect(() => {
    const cookies = new Cookies();
    const localCookies = cookies.get("chaekbadaUserCookie");
    if (!localCookies) {
      router.push("/Login");
      return;
    }
    const decodedTokenTemp = jwt.verify(
        localCookies,
        process.env.NEXT_PUBLIC_JWT_SECRET as string
    ) as any;
    userID= decodedTokenTemp.id
  }, []);

  useEffect(() => {
    async function getUser() {
      const cookies = new Cookies();
      const localCookies = cookies.get('chaekbadaUserCookie');
      const decodedToken = jwt.verify(
        localCookies,
        process.env.NEXT_PUBLIC_JWT_SECRET as string,
      ) as any;

      const result = await axiosFunction({
        url: '/user',
        method: 'GET',
        params: {
          id: decodedToken.id,
        },
      });
      if (result && result.data) {
        setUser(result.data);
      }
    }

    getUser();
  }, []);

  async function onChangeAddress() {
    console.log(fullAddress);
    const result = await axiosFunction({
      url: '/mypage/modify/address',
      method: 'POST',
      params: {
        userID,
        address: fullAddress,
      },
    });

    if (result) {
      if (result.data) {
        console.log(result.data);
        router.push('/Mypage');
      }
    }
  }

  async function onChangePassword() {
    console.log(password, newPassword, newPasswordCheck);
    const result = await axiosFunction({
      url: '/mypage/modify/password',
      method: 'POST',
      params: {
        userID,
        password,
        newPassword,
      },
    });

    if (result) {
      if (result.data !== true) {
        alert('현재 비밀번호를 다시 입력하세요');
      } else {
        router.push('/Mypage');
      }
    }
  }

  return (
    <>
      <div
        style={{
          marginTop: '20px',
          border: '0.5px solid rgba(0,0,0,0.2)',
          padding: '30px 50px 100px 200px',
          width: '1000px',
          borderRadius: '20px',
          marginLeft: '100px',
        }}>
        <div style={{ fontSize: '30px', margin: '0px 0px 20px  120px' }}>
          내 정보 수정
        </div>
        <div style={{ alignContent: 'center' }}>
          <div>
            <div style={{ marginBottom: '10px' }}>
              현재 주소 : {user.address}{' '}
            </div>
            <div style={{ display: 'flex' }}>
              <Input
                style={{ width: '390px' }}
                className="loginregister__input"
                type="text"
                placeholder="주소 입력"
                value={address}
              />
              <Button
                style={{ width: '100px', height: '50px', marginLeft: '10px' }}
                type="button"
                onClick={openPopup}>
                주소 찾기
              </Button>
              {isOpen && (
                <div>
                  <AddressComponent getAddress={getAddress} />
                </div>
              )}
            </div>
            <div
              style={{
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <div>
                <Input
                  style={{ width: '390px', height: '50px' }}
                  className="loginregister__input"
                  type="text"
                  placeholder="상세주소 입력"
                  onChange={(event) => {
                    setFullAddress(address + ' ' + event.target.value);
                  }}
                />
              </div>
              <div>
                <Button
                  style={{ width: '100px', height: '50px', marginLeft: '10px' }}
                  onClick={onChangeAddress}>
                  주소 변경
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div style={{ marginTop: '20px' }}>
              <Input
                style={{ width: '500px', height: '50px' }}
                placeholder="현재 비밀번호 입력"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div>
              <Input
                style={{ width: '500px', height: '50px', marginTop: '10px' }}
                placeholder="바꿀 비밀번호 입력"
                type="password"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
            </div>
            <div>
              <Input
                style={{ width: '500px', height: '50px', marginTop: '10px' }}
                placeholder="바꿀 비밀번호 재입력"
                type="password"
                value={newPasswordCheck}
                onChange={(event) => {
                  setNewPasswordCheck(event.target.value);
                }}
              />
            </div>
            <div>
              {newPasswordCheck &&
                newPassword !== newPasswordCheck &&
                '비밀번호를 올바르게 입력하세요.'}
            </div>
            <div>
              <Button style={{ marginTop: '10px' }} onClick={onChangePassword}>
                비밀번호 변경
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
