import { User } from "react-feather";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { filterProductsState } from "../../atoms/member";

export const AccountButton = () => {
  return (
    <div className="flex flex-row items-center space-x-2 cursor-pointer">
      <User size={18} className="stroke-black" />
      <div className="text-md text-black font-semibold">Account</div>
    </div>
  );
};
