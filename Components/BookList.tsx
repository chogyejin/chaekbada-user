import { IBookPosts } from "../pages/BookPosts";
import { axiosFunction } from "../common/utils";
import Link from "next/link";
import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

interface Props {
  list: IBookPosts[];
}

export default function BookList({ list }: Props) {
  const [decodedID, setDecodedID] = useState<string>("");

  useEffect(() => {
    const cookies = new Cookies();
    const localCookies = cookies.get("chaekbadaUserCookie");
    const decodedToken = jwt.verify(
      localCookies,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    ) as any;
    setDecodedID(decodedToken.id);
  }, []);

  const interest = (bookPostID: string) => async () => {
    const result = await axiosFunction({
      url: "/bookPost/post/interestedCount",
      method: "POST",
      params: { bookPostID, userID: decodedID },
    });
    console.log("찜 버튼 클릭");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: `center`,
        }}
      >
        {list.map((bookpost, id) => (
          <div
            key={bookpost.id}
            style={{
              padding: "10px",
              marginBottom: "20px",
              border: "1px solid black",
              width: "500px",
              marginRight: "20px",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: "4px",
              }}
            >
              <Link
                href="/BookPostDetail/[id]"
                as={`/BookPostDetail/${bookpost.id}`}
                key={id}
              >
                <div style={{ display: "flex" }}>
                  <img
                    src={bookpost.thumbnail}
                    style={{ borderRadius: "10px", marginRight: "8px" }}
                  />
                  <div style={{ display: "grid", alignItems: "center" }}>
                    <div>책 이름 : {bookpost.title}</div>
                    <div>현재 입찰가 : {bookpost.bidPrice}</div>
                    <div>즉시 구매가 : {bookpost.buyingItNowPrice}</div>
                    <div>
                      마감 기한 : {bookpost.endDate.toString().slice(0, 10)}
                    </div>
                    <div>판매자 :{bookpost.user.name}</div>
                  </div>
                </div>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <Button color="danger" onClick={interest(bookpost.id)}>
                찜
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
