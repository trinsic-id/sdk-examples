import { Switch } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { filterProductsState } from "../../atoms/member";

export const FilterButton = () => {
  const [isFiltered, toggleFilter] = useRecoilState(filterProductsState);
  return (
    <Switch.Group>
      <div className="flex flex-row items-center gap-2">
        <Switch.Label className={`text-black text-lg`}>Filter</Switch.Label>

        <Switch
          checked={isFiltered}
          onChange={() => {
            toggleFilter((val) => !val);
          }}
          className={`focus:outline-none bg-transparent border-2 border-black relative inline-flex items-center h-4 rounded-full w-8 transition ease-in-out duration-500 ${
            !isFiltered && "opacity-30"
          }`}
        >
          <span
            className={`w-2 h-2 transform transition ease-in-out duration-500 bg-black rounded-full ${
              isFiltered ? "translate-x-1" : "translate-x-4"
            }`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};
