import { Star } from "react-feather";

export const SilverMember = () => {
  return (
    <div className="flex flex-row items-center space-x-2 rounded-lg py-1 px-2 bg-gray-300">
      <Star
        className="stroke-gray-600 fill-gray-600 hidden md:block"
        size={12}
      />
      <Star className="stroke-gray-600 fill-gray-600 md:hidden" size={18} />
      <div className="text-gray-600 md:text-sm font-medium">
        Silver member discount 10%
      </div>
    </div>
  );
};
