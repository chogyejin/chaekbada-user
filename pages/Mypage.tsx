import React, { useEffect, useState } from "react";
import { Button, Nav, NavLink, NavItem, TabContent, TabPane } from "reactstrap";

import { axiosFunction } from "../common/utils";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
import { IBook } from "./BookPostDetail/[id]";
import router from "next/router";

export interface IUser {
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

interface IPosts {
  id: string;
  bookPostID: string;
  userID: string;
}
interface IInterstedPosts extends IPosts {
  interestedPost: IBook;
}

interface IBiddingBooks extends IPosts {
  bookPost: IBook;
  isHighest: boolean;
  point: number;
}
export default function Mypage() {
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
  const [interestedPosts, setInterestedPosts] = useState<IInterstedPosts[]>([]);
  const [biddingBooks, setBiddingBooks] = useState<IBiddingBooks[]>([]);
  const [purschasedBooks, setPurschasedBooks] = useState<
    Array<{
      id: string;
      userID: string;
      bookPostID: string;
      point: string;
      isHighest: string;
      bookPost: {
        id: string;
        bookID: string;
        title: string;
        contents: string;
        userID: string;
        interestedCounts: string;
        endDate: string;
        bidPrice: string;
        buyingItNowPrice: string;
        reservePrice: string;
        bookImageUrl: string;
        isActive: boolean;
        thumbnail: string;
      };
    }>
  >([]);



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

  // ????????? ??????
  useEffect(() => {
    async function getInterestedPosts() {
      const cookies = new Cookies();
      const localCookies = cookies.get("chaekbadaUserCookie");
      const decodedToken = jwt.verify(
        localCookies,
        process.env.NEXT_PUBLIC_JWT_SECRET as string
      ) as any;

      const result = await axiosFunction({
        url: "/mypage/list/interest",
        method: "GET",
        params: {
          userID: decodedToken.id,
        },
      });
      if (result && result.data) {
        setInterestedPosts(result.data);
      }
    }

    getInterestedPosts();
  }, []);

  // ?????? ?????? ?????? ??????
  useEffect(() => {
    async function getBiddingBooks() {
      const cookies = new Cookies();
      const localCookies = cookies.get("chaekbadaUserCookie");
      const decodedToken = jwt.verify(
        localCookies,
        process.env.NEXT_PUBLIC_JWT_SECRET as string
      ) as any;

      const result = await axiosFunction({
        url: "/mypage/list/bid",
        method: "GET",
        params: {
          userID: decodedToken.id,
        },
      });
      if (result && result.data) {
        setBiddingBooks(result.data);
      }
    }

    getBiddingBooks();
  }, []);

  useEffect(() => {
    async function getPurschasedBooks() {
      const cookies = new Cookies();
      const localCookies = cookies.get("chaekbadaUserCookie");
      const decodedToken = jwt.verify(
        localCookies,
        process.env.NEXT_PUBLIC_JWT_SECRET as string
      ) as any;

      const result = await axiosFunction({
        url: "/mypage/list/purchase",
        method: "GET",
        params: {
          userID: decodedToken.id,
        },
      });
      if (result && result.data) {
        setPurschasedBooks(result.data);
      }
    }

    getPurschasedBooks();
  }, []);

  const setActiveTab = (id: string) => () => {
    setActieTab(id);
  };

  useEffect(() => {
    console.log(biddingBooks);
  }, [biddingBooks]);
  return (
    <div className="global-container">
      <div className="user-info-container">
        <div className="user-info-item">
          <div>??????:</div>
          <div>
            {user.name} ({user.email})
          </div>
        </div>

        <div className="user-info-item">
          <div>?????????:</div>
          <div>{user.universityName}</div>
        </div>

        <div className="user-info-item">
          <div>?????? ?????????:</div>
          <div>{user.point}</div>
        </div>
        <div className="user-info-item">
          <div>????????? ?????????:</div>
          <div>{user.biddingPoint}</div>
        </div>
        <div className="user-info-item">
          <div>??????:</div>
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
            onClick={() => router.push(`/EditProfile`)}
          >
            ??? ?????? ??????
          </Button>
        </div>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink onClick={setActiveTab("1")}>?????????</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={setActiveTab("2")}>?????? ??????</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={setActiveTab("3")}>?????? ?????? ??????</NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            {interestedPosts.map((post, id) => (
              <div
                key={id}
                style={{
                  width: "33%",
                  borderRadius: "5px",
                  border: "1px solid black",
                  display: "flex",
                  marginBottom: "15px",
                }}
              >
                <div style={{ padding: "10px" }}>
                  <img src={post.interestedPost.thumbnail} />
                </div>
                <div style={{ padding: "10px" }}>
                  <div>??? ??????: {post.interestedPost.title}</div>
                  <div>
                    ?????? ?????? ??????:{" "}
                    {post.interestedPost.endDate.toString().slice(0, 10)}
                  </div>
                  <div>
                    ?????? ????????? : {post.interestedPost.buyingItNowPrice}
                  </div>
                  <div>?????? ????????? : {post.interestedPost.bidPrice}</div>
                </div>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            {purschasedBooks.map((post, id) => (
              <div
                key={id}
                style={{
                  borderRadius: "5px",
                  width: "25%",
                  border: "1px solid black",
                  display: "flex",
                  marginBottom: "15px",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ padding: "10px" }}>
                  <img src={post.bookPost.thumbnail} />
                </div>
                <div
                  style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>??? ??????: {post.bookPost.title}</div>
                  <div
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    {" "}
                    {post.bookPost.bidPrice}?????? ?????? ??????
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            {biddingBooks.map((post, id) => (
              <div
                key={id}
                style={{
                  borderRadius: "5px",
                  width: "33%",
                  border: "1px solid black",
                  display: "flex",
                  marginBottom: "15px",
                }}
              >
                <div style={{ padding: "10px" }}>
                  <img src={post.bookPost.thumbnail} />
                </div>
                <div style={{ padding: "10px" }}>
                  <div>??? ??????: {post.bookPost.title}</div>
                  <div>
                    ?????? ?????? ??????:{" "}
                    {post.bookPost.endDate.toString().slice(0, 10)}
                  </div>
                  <div>?????? ?????????: {post.bookPost.buyingItNowPrice}</div>
                  <div>?????? ?????????: {post.bookPost.bidPrice}</div>
                  <div style={{ color: "blue" }}>??? ?????????: {post.point}</div>
                </div>
              </div>
            ))}
          </div>
        </TabPane>
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
}
