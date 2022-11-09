import { ShoppingBag, ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartTotalState } from "../../atoms/cart";

export const CartButton = () => {
  const { totalQty } = useRecoilValue(cartTotalState);
  return (
    <Link className="flex flex-row items-center space-x-2" to="cart">
      <div className="relative">
        <ShoppingBag size={18} className="stroke-black" />
        <span
          className={`absolute -top-2 -right-2 rounded-full bg-blue-500 flex justify-center items-center items ${
            totalQty === 0 && "opacity-0"
          }`}
        >
          <span className="text-white font-light text-xs px-1">{totalQty}</span>
        </span>
      </div>
      <div className="text-md text-black font-semibold">Cart</div>
    </Link>
  );
};
