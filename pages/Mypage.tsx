import React, { useEffect, useState } from "react";
import {
  Button,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
} from "reactstrap";
import axios from "axios";
import { axiosFunction } from "../common/utils";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  universityName: string;
  address: string;
  point: number;
  biddingPoint: number;
  profileImageUrl: string;
  isAuth: boolean;
}

export default () => {
  const [user, setUser] = useState<IUser>({
    id: "",
    email: "",
    password: "",
    name: "",
    universityName: "",
    address: "",
    point: 0,
    biddingPoint: 0,
    profileImageUrl: "",
    isAuth: true,
  });
  const [activeTab, setActieTab] = useState<string>("1");

  useEffect(() => {
    async function getUser() {
      const cookies = new Cookies();
      const localCookies = cookies.get("chaekbadaUserCookie");
      const decodedToken = jwt.verify(
        localCookies,
        process.env.NEXT_PUBLIC_JWT_SECRET as string
      ) as any;

      const result = await axiosFunction({
        url: "/user",
        method: "GET",
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

  const setActiveTab = (id: string) => () => {
    setActieTab(id);
  };

  return (
    <div className="global-container">
      <div className="user-info-container">
        <div className="user-info-item">
          <div>이름:</div>
          <div>
            {user.name} ({user.email})
          </div>
        </div>

        <div className="user-info-item">
          <div>대학교:</div>
          <div>{user.universityName}</div>
        </div>

        <div className="user-info-item">
          <div>보유 포인트:</div>
          <div>{user.point}</div>
        </div>
        <div className="user-info-item">
          <div>경매중 포인트:</div>
          <div>{user.biddingPoint}</div>
        </div>
        <div className="user-info-item">
          <div>주소:</div>
          <div>{user.address}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button
            style={{
              marginTop: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              color: "#FF6600",
              border: "none",
            }}
          >
            내 정보 수정
          </Button>
        </div>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink onClick={setActiveTab("1")}>관심글</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={setActiveTab("2")}>구매 목록</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={setActiveTab("3")}>입찰 참여 목록</NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">나는 관심글 탭</TabPane>
        <TabPane tabId="2">나는 구매 목록 탭</TabPane>
        <TabPane tabId="3">입찰 참여 목록 탭</TabPane>
      </TabContent>

      <style jsx>{`
        .user-info-container {
          padding: 24px;
          border: 1px solid black;
          margin: 16px 0px;
          border-radius: 12px;
          max-width: 500px;
        }

        .user-info-item {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};
