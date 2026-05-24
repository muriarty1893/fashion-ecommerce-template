import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode: string;
  text: string;
}

const Button = ({ mode, text, ...props }: ButtonProps) => {
  const baseClass =
    "inline-flex h-12 w-full items-center justify-center rounded-full px-5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <>
      {mode === "white" && (
        <button
          {...props}
          className={`${baseClass} border border-stone-300 bg-white text-stone-950 hover:border-stone-950 hover:bg-stone-50`}
        >
          {text}
        </button>
      )}

      {mode === "brown" && (
        <button
          {...props}
          className={`${baseClass} bg-stone-950 text-white hover:bg-[#9b6b43]`}
        >
          {text}
        </button>
      )}

      {mode === "transparent" && (
        <button
          {...props}
          className={`${baseClass} border border-white/70 bg-transparent text-white hover:bg-white hover:text-stone-950`}
        >
          {text}
        </button>
      )}

      {mode !== "white" && mode !== "brown" && mode !== "transparent" && (
        <p>No valid mode selected</p>
      )}
    </>
  );
};
export default Button;
