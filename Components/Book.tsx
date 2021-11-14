import { IBook } from '../pages/BookPostDetail/[id]';

interface Props {
  book: IBook;
}

export default function Book({ book }: Props) {
  const {
    title,
    bookID,
    contents,
    userID,
    interestedCounts,
    endDate,
    bidPrice,
    buyingItNowPrice,
    reservePrice,
    bookImageUrl,
    isActive,
    thumbnail,
  } = book;

  console.log(
    title,
    bookID,
    contents,
    userID,
    interestedCounts,
    endDate,
    bidPrice,
    buyingItNowPrice,
    reservePrice,
    bookImageUrl,
    isActive,
    thumbnail,
  );
  return (
    <>
      <div>책책</div>
      <div>
        <img src={book.thumbnail} />
      </div>
    </>
  );
}
