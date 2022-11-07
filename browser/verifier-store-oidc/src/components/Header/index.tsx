import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartTotalState } from "../../atoms/atoms";

const Header = () => {
  const { totalQty } = useRecoilValue(cartTotalState);
  return (
    <div className="header">
      <div>
        <Link to="/">
          <div className="text-2xl font-bold text-blue-500">
            Artichoke Seed Store
          </div>
        </Link>
      </div>
      <div>
        <Link
          className="text-base text-white font-bold bg-blue-500 rounded-lg p-3"
          to="cart"
        >
          Cart: {totalQty}
        </Link>
      </div>
    </div>
  );
};

export default Header;
