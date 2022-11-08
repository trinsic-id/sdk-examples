import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { CheckCircle, CheckSquare, Circle, Square } from "react-feather";
import Spinner from "react-spinkit";
import { useToggle } from "react-use";

const Animations = {
  icons: {
    fadeIn: {
      opacity: 1,
      transitionDuration: "0.6s",
    },
    fadeOut: {
      opacity: 0,
      transitionDuration: "0.6s",
    },
  },
  subText: {
    fadeIn: {
      height: "auto",
      opacity: 1,
      transitionDuration: "1.5s",
    },
    fadeOut: {
      height: 0,
      opacity: 0,
      transitionDuration: "1.5s",
    },
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
    <motion.div
      className={`flex flex-row items-center space-x-4 w-1/3 bg-loading-bg-light rounded-lg p-4 ${
        !isLoading && !isComplete && "opacity-40"
      }`}
    >
      <div className="w-8 h-full">
        {isLoading && (
          <AnimatePresence>
            <motion.div
              variants={Animations.icons}
              initial={"fadeOut"}
              animate={"fadeIn"}
              exit={"fadeOut"}
            >
              <Spinner
                fadeIn="full"
                className={``}
                name="double-bounce"
                color="#828282"
                style={{ height: "30px", width: "30px" }}
              />
            </motion.div>
          </AnimatePresence>
        )}
        {!isLoading && isComplete && (
          <AnimatePresence>
            <motion.div
              variants={Animations.icons}
              initial={"fadeOut"}
              animate={"fadeIn"}
              exit={"fadeOut"}
            >
              <CheckSquare size={28} className="stroke-green-400" />
            </motion.div>
          </AnimatePresence>
        )}
        {!isLoading && !isComplete && (
          <AnimatePresence>
            <motion.div
              variants={Animations.icons}
              initial={"fadeOut"}
              animate={"fadeIn"}
              exit={"fadeOut"}
            >
              <Square size={28} className="stroke-gray-400" />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="text-loading-text text-md font-bold">{text}</div>
        <AnimatePresence>
          {successElement && isComplete && (
            <motion.div
              variants={Animations.subText}
              initial={"fadeOut"}
              animate={"fadeIn"}
              exit={"fadeOut"}
              className="text-loading-text text-md font-bold overflow-clip pt-3"
            >
              {successElement}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
