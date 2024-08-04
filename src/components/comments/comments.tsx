import CommentItem from "./commentItem";
import { Carousel } from "flowbite-react";
import { data_comments } from "./data_comment";

function Comments() {
  const comments = data_comments;

  const items = comments.map((comment, index) => (
    <CommentItem
      nama={comment.name}
      job={comment.job}
      rating={comment.rating}
      comment={comment.comment}
      key={index}
    />
  ));

  const carouselItems = [];
  for (let i = 0; i < items.length; i += 3) {
    carouselItems.push(
      <div
        className="flex w-[80%] mx-auto justify-center items-center space-x-4"
        key={i}
      >
        {items.slice(i, i + 3)}
      </div>
    );
  }

  return (
    <div className="h-[430px] my-36 p-2">
      <div className="flex flex-col gap-5 text-center mb-3 md:mb-[-30px]">
        <h2 className="text-3xl text-slate-800 font-bold">
          Apa Kata Pelanggan Kami
        </h2>
        <p className="text-lg w-[60%] mx-auto text-slate-400">
          Berikut adalah beberapa ulasan dari Pelanggan kami. Kami selalu
          berusaha memberikan yang terbaik untuk memenuhi kebutuhan Anda.
        </p>
      </div>
      <Carousel>{carouselItems}</Carousel>
    </div>
  );
}

export default Comments;
