import { Star } from "react-feather";

export const BronzeMember = () => {
  return (
    <div className="flex flex-row items-center space-x-2 rounded-lg py-1 px-2 border border-amber-600">
      <Star
        className="stroke-amber-600 fill-amber-600 hidden md:block"
        size={12}
      />
      <Star className="stroke-amber-600 fill-amber-600 md:hidden" size={18} />
      <div className="text-amber-600 md:text-sm font-medium">
        Bronze member discount 5%
      </div>
    </div>
  );
};
