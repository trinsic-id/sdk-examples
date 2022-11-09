import { Combobox, RadioGroup } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  CheckSquare,
  CreditCard,
  Square,
  X,
} from "react-feather";
import { useRecoilState, useRecoilValue } from "recoil";
import { authSettingsState } from "../../atoms/authService";
import { isVerifyCredentialModalVisibleState } from "../../atoms/modals";
import { useLockBg } from "../../hooks/custom/useLockBackground";
import { AuthService, defaultAuthSettings } from "../../services/AuthService";
import { generateSettings } from "../../utils/generateSettings";

const defaultValues = {
  vehicle: null,
  year: null,
};

interface VerifyCredentialModalProps {
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

export const VerifyCredentialModal = () => {
  const [isVisible, setModalVisible] = useRecoilState(
    isVerifyCredentialModalVisibleState
  );
  useLockBg(isVisible);
  const authSettings = useRecoilValue(authSettingsState);
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
                className="bg-white w-full max-w-md rounded-lg shadow-lg"
                variants={Animations.inputContainer}
              >
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-row items-center">
                      <h6 className="text-black font-semibold text-xl">
                        Verification required
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
                  <div className="w-full flex flex-col items-start space-y-4 pt-2">
                    <div className="flex flex-row bg-gray-200 rounded-lg w-full p-4">
                      <div className="flex-1 flex flex-col space-y-2 items-start">
                        <div className="text-black text-lg">
                          Required disclosures:
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                          <Square size={18} className="stroke-black" />
                          <div className="text-black text-base">
                            Certification Grade
                          </div>
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                          <Square size={18} className="stroke-black" />
                          <div className="text-black text-base">
                            Produce Type
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-full h-full bg-blue-500 rounded-lg text-white px-4 py-3 flex flex-row items-center space-x-6"
                      onClick={() => {
                        let settings: typeof defaultAuthSettings;
                        if (authSettings) {
                          settings = generateSettings(
                            authSettings.ecosystem,
                            authSettings.schema
                          );
                        } else {
                          settings = generateSettings();
                        }

                        const authService = new AuthService(settings);
                        authService.login();
                      }}
                    >
                      <img
                        src="images/trinsic-logo-white.png"
                        className="w-6"
                      />
                      <div className="text-white font-medium text-lg flex-1 pr-12">
                        Verify your credential
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
