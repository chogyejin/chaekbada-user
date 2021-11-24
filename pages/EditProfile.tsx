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
  const userID = router.query.user;

  function openPopup(e: React.FormEvent) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  function getAddress(address: string) {
    setAddress(address);
    setIsOpen(false);
  }

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
      }
    }
  }

  return (
    <>
      <h1>회원정보 수정하는 페이지</h1>
      <div>
        <div>현재 주소 : {user.address} </div>
        <div style={{ display: 'flex' }}>
          <Input
            style={{ width: '400px' }}
            className="loginregister__input"
            type="text"
            placeholder="주소 입력"
            value={address}
          />
          <Button
            style={{ width: '100px', height: '50px' }}
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
        <div>
          <Input
            style={{ width: '500px', height: '50px' }}
            className="loginregister__input"
            type="text"
            placeholder="상세주소 입력"
            onChange={(event) => {
              setFullAddress(address + ' ' + event.target.value);
            }}
          />
        </div>
        <div>
          <Button onClick={onChangeAddress}>주소 변경</Button>
        </div>
      </div>
    </>
  );
}
