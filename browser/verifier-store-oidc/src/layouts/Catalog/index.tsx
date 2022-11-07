import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useToggle from "react-use/lib/useToggle";
import { useRecoilState } from "recoil";
import { Item } from "../../atoms/atoms";
import { AuthState, authStateAtom } from "../../atoms/user";
import { VerifyCredentialModal } from "../../components/VerifyCredential";
import { useAddItem } from "../../hooks/custom/useAddItem";
import { AuthService } from "../../services/AuthService";

const authService = new AuthService();
const ids = [
  "apple",
  "orange",
  "pear",
  "tomato",
  "watermelon",
  "guava",
  "mango",
  "avacado",
  "lime",
  "lemon",
  "kiwi",
];

const products: Item[] = ids.map((id, index) => ({
  id,
  price: index + 1,
  qty: 0,
}));

const Catalog = () => {
  const addItem = useAddItem();
  const location = useLocation();
  const navigate = useNavigate();
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  useEffect(() => {
    if (
      location.pathname === "/callback" &&
      authState === AuthState.ANONYMOUS
    ) {
      setAuthState(AuthState.VERIFIED);
      return navigate("/");
    }
  }, [location, authState]);
  return (
    <div className="flex flex-row flex-wrap gap-4 items-start">
      {products.map((p) => (
        <div key={p.id} className="flex flex-col items-center gap-3 border p-4">
          <div className="text-black w-full">
            {p.id} / ${p.price}
          </div>
          <button
            className="bg-green-500 rounded-lg px-4 py-1 text-sm text-white font-bold"
            onClick={() => addItem(p)}
          >
            Add
          </button>
        </div>
      ))}
      <VerifyCredentialModal authService={authService} />
    </div>
  );
};

export default Catalog;
