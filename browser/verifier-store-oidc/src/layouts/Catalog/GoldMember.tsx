import { Star } from "react-feather";

export const GoldMember = () => {
  return (
    <div className="flex flex-row items-center space-x-2 rounded-lg py-1 px-2 bg-yellow-200">
      <Star
        className="stroke-yellow-600 fill-yellow-600 hidden md:block"
        size={12}
      />
      <Star className="stroke-yellow-600 fill-yellow-600 md:hidden" size={18} />
      <div className="text-yellow-600 md:text-sm font-medium">
        Gold member discount
      </div>
    </div>
  );
};
