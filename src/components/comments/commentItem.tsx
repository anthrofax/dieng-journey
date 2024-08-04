import { FaQuoteLeft } from "react-icons/fa6";
import { Rating as FlowbiteRating, RatingStar } from "flowbite-react";
import Image from "next/image";

interface CommentItemProps {
  nama: string;
  job: string;
  rating: number;
  comment: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  nama,
  job,
  rating,
  comment,
}) => {
  return (
    <div className="p-2">
      <section className="h-full p-2 flex flex-col justify-between">
        <div className="flex flex-col border border-slate-800 rounded-xl justify-center items-center p-2">
          <FaQuoteLeft color="blue" size={30} />
          <h4 className="text-slate-400 text-center">{comment}</h4>
          <RatingComponent rating={rating} />
        </div>
        <div className="flex flex-col justify-center items-center text-center mt-3">
          <div>
            <Image
              src="/img/person.jpg"
              alt=""
              className="rounded-full object-cover"
              width={40}
              height={40}
            />
          </div>
          <h4>{nama}</h4>
          <p>{job}</p>
        </div>
      </section>
    </div>
  );
};

interface RatingComponentProps {
  rating: number;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<RatingStar key={i} filled={i < rating} />);
  }
  return <FlowbiteRating>{stars}</FlowbiteRating>;
};

export default CommentItem;
