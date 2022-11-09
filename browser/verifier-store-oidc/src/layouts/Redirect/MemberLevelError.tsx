import { useMemo } from "react";
import { Star } from "react-feather";
import { useRecoilValue } from "recoil";
import { MemberLevel } from "../../atoms/member";
import { userCredentialState } from "../../atoms/user";

export const MemberLevelError = () => {
  const userCredential = useRecoilValue(userCredentialState);

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="rounded-lg w-1/2 bg-gray-400">Go back</div>
      <div className="rounded-lg w-1/2 bg-gray-400">Try again</div>
    </div>
  );
};
