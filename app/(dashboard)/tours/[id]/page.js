import TourInfo from '@/app/components/TourInfo';
import { generateTourImage, getSingleTour } from '@/utils/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);

  if (!tour) {
    redirect('/tours/');
  }
  //   const tourImage = await generateTourImage(tour.city, tour.country);

  const { data } = await axios.get(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;
  return (
    <>
      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover"
            alt={tour.title}
            priority
          ></Image>
        </div>
      ) : null}
      <TourInfo tour={tour} className="mb-12" />

      <Link href="/tours/" className="btn btn-secondary">
        Go back to tours
      </Link>
    </>
  );
};
export default SingleTourPage;
