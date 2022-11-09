import { Star } from "react-feather";

export const BronzeMember = () => {
  return (
    <div className="flex flex-row items-center space-x-2 rounded-lg py-1 px-2 bg-orange-300">
      <Star
        className="stroke-orange-600 fill-orange-600 hidden md:block"
        size={12}
      />
      <Star className="stroke-orange-600 fill-orange-600 md:hidden" size={18} />
      <div className="text-orange-600 md:text-sm font-medium">
        Bronze member discount
      </div>
    </div>
  );
};
