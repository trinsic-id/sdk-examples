import { ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartTotalState } from "../../atoms/atoms";

export const CartButton = () => {
  const { totalQty } = useRecoilValue(cartTotalState);
  return (
    <Link className="flex flex-row items-center space-x-2" to="cart">
      <div className="relative">
        <ShoppingCart size={24} className="stroke-black" />
        <span
          className={`absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-500 flex justify-center items-center items ${
            totalQty === 0 && "opacity-0"
          }`}
        >
          <span className="text-white text-sm">{totalQty}</span>
        </span>
      </div>
      <div className="text-md font-light">Cart</div>
    </Link>
  );
};
