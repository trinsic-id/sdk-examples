import { Combobox, RadioGroup } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { CreditCard, X } from "react-feather";
import { useRecoilState } from "recoil";
import { isVerifyCredentialModalVisibleAtom } from "../../atoms/user";
import { useLockBg } from "../../hooks/custom/useLockBackground";
import { AuthService } from "../../services/AuthService";

const defaultValues = {
  vehicle: null,
  year: null,
};

interface AddVehicleModalProps {
  authService: AuthService;
}

const Animations = {
  container: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  inputContainer: {
    hidden: {
      y: 200,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  },
};

export const VerifyCredentialModal = ({
  authService,
}: AddVehicleModalProps) => {
  const [isVisible, setModalVisible] = useRecoilState(
    isVerifyCredentialModalVisibleAtom
  );
  useLockBg(isVisible);

  return (
    <div className="max-w-x2s md:max-w-xs overflow-hidden">
      <AnimatePresence>
        {isVisible ? (
          <motion.div
            className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center"
            variants={Animations.container}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-opacity-50 bg-black z-30 cursor-pointer"></div>
            <div className="w-full z-40 p-4 flex items-center justify-center">
              <motion.div
                className="bg-white w-full max-w-sm rounded-lg shadow-lg"
                variants={Animations.inputContainer}
              >
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-row items-center">
                      <h6 className="text-black font-semibold text-xl">
                        Verify your farm
                      </h6>
                    </div>
                    <button
                      className="focus:outline-none text-gray-50 ml-6"
                      onClick={() => {
                        setModalVisible(false);
                      }}
                    >
                      <X className="stroke-black" size={20} />
                    </button>
                  </div>
                  <div className="w-full pt-5">
                    <button
                      className="flex flex-row items-center space-x-4 bg-green-500 w-full rounded-lg p-3"
                      onClick={() => {
                        authService.login();
                      }}
                    >
                      <CreditCard size={32} className={"stroke-white"} />
                      <div className="text-white font-medium text-lg">
                        Connect your credential
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
