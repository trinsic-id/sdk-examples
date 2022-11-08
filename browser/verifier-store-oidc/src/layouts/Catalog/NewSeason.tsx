import { Calendar, Star } from "react-feather";

export const NewSeason = () => {
  return (
    <div className="flex flex-row items-center space-x-2 rounded-lg border-2 py-1 px-2">
      <Calendar
        className="fill-gray-300 stroke-gray-500 hidden md:block"
        size={12}
      />
      <Calendar className="fill-gray-300 stroke-gray-500 md:hidden" size={18} />
      <div className="text-black md:text-sm font-medium">New season</div>
    </div>
  );
};
