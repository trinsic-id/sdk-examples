interface QuantityProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const CartQuantity = ({ quantity, setQuantity }: QuantityProps) => {
  return (
    <div className="flex flex-row w-1/2 rounded-lg relative bg-transparent">
      <button
        data-action="decrement"
        className=" bg-catalog-bg text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        onClick={() => setQuantity((val) => Math.max(val - 1, 1))}
      >
        <span className="text-2xl font-thin">{"-"}</span>
      </button>
      <input
        type="number"
        className="focus:outline-none text-center w-full bg-catalog-bg font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
        name="custom-input-number"
        min={1}
        value={quantity}
      ></input>
      <button
        data-action="increment"
        className="bg-catalog-bg text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        onClick={() => setQuantity((val) => val + 1)}
      >
        <span className="text-2xl font-thin">+</span>
      </button>
    </div>
  );
};
