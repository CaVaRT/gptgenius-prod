const TourInfo = ({ tour }) => {
  const { title, description, stops } = tour;
  return (
    <div className="max-w-2xl">
      <h1 className="font-semibold text-4xl mb-4">{title}</h1>
      <p className="leading-loose mb-6">{description}</p>
      <ul>
        {stops.map((stop) => {
          return (
            <li key={stop} className="bg-base-100 mb-4 p-4 rounded-xl">
              <p className="text">{stop}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default TourInfo;
