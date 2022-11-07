import { User } from "react-feather";
import { Link } from "react-router-dom";

export const AccountButton = () => {
  return (
    <Link className="flex flex-row items-center space-x-2" to="cart">
      <User size={24} className="stroke-black" />
      <div className="text-md font-light">Account</div>
    </Link>
  );
};
