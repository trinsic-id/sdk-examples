import { Star } from "react-feather";

export const NewSeason = () => {
  return (
    <div className="flex flex-row items-center space-x-2 rounded-lg border-2 py-1 px-2">
      <Star className="fill-gray-400 stroke-gray-400" size={12} />
      <div className="text-black text-sm">New season</div>
    </div>
  );
};
