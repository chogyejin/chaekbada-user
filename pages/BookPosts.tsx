import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { axiosFunction } from "../common/utils";
import BookList from "../Components/BookList";

export interface IBookPosts {
  id: string;
  title: string;
  thumbnail: string;
  bidPrice: number;
  buyingItNowPrice: number;
  endDate: Date;
  userID: string;
  user: {
    name: string;
  };
}

export default function BookPosts() {
  const [bookPosts, setBookPosts] = useState<IBookPosts[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState<Boolean>(true);

  useEffect(() => {
    async function getPosts() {
      const result = await axiosFunction({
        url: "/bookPostList/new",
        method: "GET",
        params: {
          isActive: true,
        },
      });

      if (result) {
        if (result.data) {
          console.log(result.data);
          const existsPosts = result.data.length > 0;
          if (isFirstLoad && existsPosts) {
            setIsFirstLoad(false);
            setBookPosts(result.data || []);
          }
          console.log(result.data);
        } else {
          console.log("안 넘어옴");
        }
      }
    }
    getPosts();
  }, [bookPosts]);

  const getPostNew = async () => {
    const result = await axiosFunction({
      url: "/bookPostList/new",
      method: "GET",
      params: {
        isActive: true,
      },
    });
    if (result) {
      if (result.data) {
        setBookPosts(result.data || []);
      }
      console.log(bookPosts);
    }
  };
  const getPostHot = async () => {
    const result = await axiosFunction({
      url: "/bookPostList/hot",
      method: "GET",
      params: { isActive: true },
    });
    if (result) {
      if (result.data) {
        setBookPosts(result.data || []);
      }
      console.log(bookPosts);
    }
  };

  return (
    <>
      <Head>
        <title>전체 책</title>
      </Head>
      <h1 style={{ marginBlockStart: "0px", textAlign: "center" }}>
        전체 책 게시물이 있는 페이지
      </h1>

      <div style={{ flexDirection: "row" }}>
        <div style={{ cursor: "pointer", margin: "10px" }} onClick={getPostNew}>
          최신순
        </div>
        <div style={{ cursor: "pointer", margin: "10px" }} onClick={getPostHot}>
          인기순
        </div>
      </div>

      <BookList list={bookPosts} />

      <div style={{ textAlign: "center", fontSize: "20px" }}>
        <Link href="/BookPostWrite">글 작성하기</Link>
      </div>
      {/* <style jsx></style> */}
    </>
  );
}
