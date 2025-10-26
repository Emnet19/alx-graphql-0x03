import { EpisodeCardProps } from "@/interfaces";

const EpisodeCard = ({ id, name, air_date, episode }: EpisodeCardProps) => {
  return (
    <div key={id} className="bg-white cursor-pointer shadow-md rounded-lg p-4 m-4 transition-transform duration-200 hover:scale-105">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <span className="border px-2 text-xs rounded-full bg-blue-600 text-white flex items-center">{episode}</span>
      </div>
      <p className="text-gray-600">{air_date}</p>
    </div>
  );
};

export default EpisodeCard;