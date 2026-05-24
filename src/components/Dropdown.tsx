import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const Dropdown = ({
  dropdownTitle,
  children,
}: {
  dropdownTitle: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200">
      <button
        type="button"
        className="flex h-14 w-full cursor-pointer items-center justify-between text-left transition hover:text-[#9b6b43] focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-sm font-bold text-stone-950">{dropdownTitle}</span>
        {isOpen ? (
          <HiChevronUp className="text-base" />
        ) : (
          <HiChevronDown className="text-base" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-sm leading-7 text-stone-600">{children}</p>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
