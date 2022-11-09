import { useMemo } from "react";
import { Star } from "react-feather";
import { useRecoilValue } from "recoil";
import { MemberLevel } from "../../atoms/member";
import { userCredentialState } from "../../atoms/user";

export const MemberLevelComp = () => {
  const userCredential = useRecoilValue(userCredentialState);

  return userCredential !== undefined ? (
    <div className="w-full flex flex-row items-center justify-between">
      {userCredential?.credentialSubject.certificationGrade ===
        MemberLevel.GOLD && (
        <>
          <div className="font-light text-lg leading-tight">
            {`${userCredential.credentialSubject.produceType} Gold farmer`}
          </div>
          <Star size={28} className={"stroke-yellow-400 fill-yellow-400"} />
        </>
      )}

      {userCredential?.credentialSubject.certificationGrade ===
        MemberLevel.SILVER && (
        <>
          <div className="font-light text-lg leading-tight">
            {`${userCredential.credentialSubject.produceType} Silver farmer`}
          </div>
          <Star size={28} className={"stroke-gray-400 fill-gray-400"} />
        </>
      )}

      {userCredential?.credentialSubject.certificationGrade ===
        MemberLevel.BRONZE && (
        <>
          <div className="font-light text-lg leading-tight">
            {`${userCredential.credentialSubject.produceType} Bronze farmer`}
          </div>
          <Star size={28} className={"stroke-amber-600"} />
        </>
      )}
    </div>
  ) : null;
};
