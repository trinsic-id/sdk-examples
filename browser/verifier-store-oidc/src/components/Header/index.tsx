import React, { useMemo, useState } from "react";
import { Search, ShoppingCart, User } from "react-feather";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartTotalState } from "../../atoms/atoms";
import { Combobox, Listbox, Menu } from "@headlessui/react";
import { CartButton } from "./CartButton";
import { AccountButton } from "./AccountButton";
import { useLocation } from "react-use";

const Header = () => {
  const { totalQty } = useRecoilValue(cartTotalState);
  const location = useLocation();
  const isVisible = useMemo(() => {
    if (!location) return false;
    if (location.pathname === "/redirect") return false;
    return true;
  }, [location.pathname]);

  return isVisible ? (
    <div className="flex flex-row items-center justify-between w-full border-b border-gray-300 pb-2 mb-2">
      <Link to="/">
        <div className="text-2xl font-medium text-black">Norlorn</div>
      </Link>

      <div className="flex flex-row space-x-4 items-center">
        <CartButton />
        <AccountButton />
      </div>
    </div>
  ) : null;
};

export default Header;
