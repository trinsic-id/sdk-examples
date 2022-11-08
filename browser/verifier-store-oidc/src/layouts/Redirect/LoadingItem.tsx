import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { CheckCircle, CheckSquare, Circle, Square } from "react-feather";
import Spinner from "react-spinkit";
import { useToggle } from "react-use";

const Animations = {
  fadeIn: {
    height: "auto",
    opacity: 1,
    transitionDuration: "1.5s",
    // transitionDelay: "0.6s",
  },
  fadeOut: {
    height: 0,
    opacity: 0,
    transitionDuration: "1.5s",
  },
  visible: {
    height: "auto",
    opacity: 1,
    // overflow: "auto",
  },
  hidden: {
    height: 0,
    overflow: "hidden",
    opacity: 0,
  },
};

interface LoadingItemProps {
  isLoading: boolean;
  onNext: () => void;
  text: string;
  successElement?: any;
}

export const LoadingItem = ({
  isLoading,
  onNext,
  text,
  successElement,
}: LoadingItemProps) => {
  const [isComplete, toggleComplete] = useToggle(false);

  useEffect(() => {
    if (isLoading)
      setTimeout(() => {
        toggleComplete(true);
        onNext();
      }, 3000);
  }, [isLoading]);

  return (
    <div className="flex flex-row items-center space-x-4 w-1/3 bg-loading-bg-light rounded-lg p-4">
      <div className="w-8 h-full">
        {isLoading && (
          <Spinner
            className={``}
            name="double-bounce"
            color="black"
            style={{ height: "30px", width: "30px" }}
          />
        )}
        {!isLoading && isComplete && (
          <CheckSquare size={28} className="stroke-green-400" />
        )}
        {!isLoading && !isComplete && (
          <Square size={28} className="stroke-gray-400" />
        )}
      </div>
      <div className="flex flex-1 flex-col ">
        <div className="text-loading-text text-md font-bold">{text}</div>
        <AnimatePresence>
          {successElement && isComplete && (
            <motion.div
              initial={Animations.fadeOut}
              animate={Animations.fadeIn}
              exit={{
                ...Animations.fadeOut,
                transitionDelay: "0s",
              }}
              className="text-loading-text text-md font-bold overflow-clip"
            >
              {successElement}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
