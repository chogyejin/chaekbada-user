import React, { useState, useEffect } from 'react';
import Search from '../Components/Search';

export default function kakaoAPI() {
  const [text, setText] = useState<string>('');
  const [books, setBooks] = useState<Array<{}>>([]);
  async function bookSearch() {
    const a = Search(text);
    setBooks();
  }
  return (
    <div className="loginregister">
      <div>
        <input
          name="text"
          type="text"
          placeholder="검색창"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          className="text__input"
        />
      </div>
      <div>
        <button className="search" onClick={bookSearch}>
          검색
        </button>
        {books.map((book)=>(
        
        ))}
      </div>
      <style jsx>
        {`
          .loginregister {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .text__input {
            width: 300px;
            height: 50px;
            padding-left: 10px;
            marign: 10px;
          }
          .search {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
          }
        `}
      </style>
    </div>
  );
}
