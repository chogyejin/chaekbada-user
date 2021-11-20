import { useEffect, useState } from "react";
import BookSearch from "../Components/BookSearch";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import { axiosFunction } from "../common/utils";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
import router from "next/router";
import {Button, Input, InputGroup, Label} from "reactstrap";

export default function BookPostWrite() {
  const [title, setTitle] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<any>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [buyingItNowPrice, setBuyingItNowPrice] = useState<number>(0);
  const [reservePrice, setReservePrice] = useState<number>(0);
  const [contents, setContents] = useState<string>("");
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().toDateString() + " " + "23:59:59")
  );
  const [decodedID, setDecodedID] = useState<string>("");
  const [bookID, setBookID] = useState<string>("");

  useEffect(() => {
    const cookies = new Cookies();
    const localCookies = cookies.get("chaekbadaUserCookie");
    if (!localCookies) {
      router.push("/Login");
      return;
    }
    const decodedToken = jwt.verify(
      localCookies,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    ) as any;
    setDecodedID(decodedToken.id);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const isValidPrice = buyingItNowPrice >= reservePrice;
    if(!isValidPrice){
      alert("즉시 구매가 보다 최저 경매가가 높을 수 없습니다.")
      return
    }

    const result = await axiosFunction({
      url: "/bookPost/write",
      method: "POST",
      params: {
        bookID,
        title,
        contents,
        userID: decodedID,
        endDate,
        reservePrice,
        buyingItNowPrice,
        bookImageUrl: "",
        thumbnail,
      },
    });

    if (result) {
      if (result.data) {
        router.push("/BookPosts");
      }
    }
  }

  function getBookID(bookID: string) {
    setBookID(bookID);
  }

  function getData(title: string, thumbnail: string, book: any) {
    setTitle(title);
    setThumbnail(thumbnail);
    setSelectedBook(book);
  }

  useEffect(() => {
    console.log(new Date(endDate.toDateString() + " " + "23:59:59"));
  }, [endDate]);

  console.log(buyingItNowPrice);
  return (
    <>
      <div className={"book-post-write-page-container"}>
        <form className={"form-container"} onSubmit={onSubmit}>
          {!selectedBook.title && (
            <div>
              <BookSearch getData={getData} getBookID={getBookID} />
            </div>
          )}

          {selectedBook.title && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "24px" }}>선택된 책</div>
              <div style={{ fontWeight: "bold" }}>{title}</div>
              <img src={selectedBook.thumbnail} />
            </div>
          )}

          <div>
            <div style={{ textAlign: "left", marginBottom: "16px" }}>
              <Label>즉시 구매가</Label>
              <Input
                type={"number"}
                value={Number(buyingItNowPrice).toString()}
                placeholder="즉시 구매가 (원)"
                onChange={(event) => {
                  setBuyingItNowPrice(Number(event.target.value));
                }}
              />
            </div>
            <div style={{ textAlign: "left", marginBottom: "16px" }}>
              <Label>최저 경매가</Label>
              <Input
                type={"number"}
                value={Number(reservePrice).toString()}
                placeholder="최저 경매가 (원)"
                onChange={(event) => {
                  setReservePrice(Number(event.target.value));
                }}
              />
            </div>
          </div>
          <div style={{ textAlign: "left", marginBottom: "16px" }}>
            <Label>입찰 마감일</Label>
            <DatePicker
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              minDate={new Date()}
              selected={endDate}
              onChange={(date: Date) =>
                setEndDate(new Date(date.toDateString() + " " + "23:59:59"))
              }
            />
          </div>
          <div>
            <Input
              type="textarea"
              style={{ height: "300px", resize: "none" }}
              placeholder="글 내용"
              onChange={(event) => {
                setContents(event.target.value);
              }}
            ></Input>
          </div>
          <div style={{textAlign:"right", marginTop:"8px"}}>
            {title && buyingItNowPrice && reservePrice && contents && endDate ? (
                <Button>작성</Button>
            ) : (
                <Button disabled>작성</Button>
            )}
          </div>

        </form>
      </div>
      <style jsx={true}>
        {`
          .book-post-write-page-container {
            padding: 30px 20px;
          }

          .form-container {
            text-align: center;
            max-width: 700px;
            border: 1px solid;
            margin: auto;
            padding: 16px;
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
}
