import { Star, Tag } from "react-feather";

export const Sale = () => {
  return (
    <div className="flex flex-row items-center space-x-2 rounded-lg bg-red-200 py-1 px-2">
      <Tag className="stroke-red-600" size={12} />
      <div className="text-red-600 text-sm">New season</div>
    </div>
  );
};
