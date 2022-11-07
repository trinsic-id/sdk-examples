import { useEffect } from "react";
import { CheckCircle, Circle } from "react-feather";
import Spinner from "react-spinkit";
import { useToggle } from "react-use";

interface LoadingItemProps {
  isLoading: boolean;
  onNext: () => void;
  text: string;
}

export const LoadingItem = ({ isLoading, onNext, text }: LoadingItemProps) => {
  const [isComplete, toggleComplete] = useToggle(false);

  useEffect(() => {
    if (isLoading)
      setTimeout(() => {
        toggleComplete(true);
        onNext();
      }, 3000);
  }, [isLoading]);

  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="w-12">
        {isLoading && (
          <Spinner
            className={``}
            name="double-bounce"
            color="black"
            style={{ height: "30px", width: "30px" }}
          />
        )}
        {!isLoading && isComplete && (
          <CheckCircle size={28} className="stroke-green-400" />
        )}
        {!isLoading && !isComplete && (
          <Circle size={28} className="stroke-gray-400" />
        )}
      </div>
      <div className="text-black text-2xl font-light">{text}</div>
    </div>
  );
};
