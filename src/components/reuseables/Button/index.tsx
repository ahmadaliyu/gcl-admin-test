import React from "react";
import Spinner from "../Spinner";
import { cn } from "@/lib/utils";

function Button({
  title,
  variant = "primary",
  fullWidth = false,
  type = "button",
  disabled = false,
  id,
  onClick,
  loading,
  className,
  height,
}: {
  title?: string;
  variant?:
    | "primary"
    | "danger"
    | "secondary"
    | "outlined-blue"
    | "outlined-blue-dark"
    | "white"
    | "outlined-red"
    | "outlined"
    | "black"
    | "blue"
    | "danger"
    | "yellow";
  fullWidth?: boolean;
  type?: "reset" | "submit" | "button";
  disabled?: boolean;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  className?: string;
  height?: any;
}) {
  // VARIANTS
  const variant_primary = "bg-[#0AB28B] text-white hover:bg-[#13DE82]";
  const variant_danger = "bg-[#E51520] text-white hover:bg-[#E51520]";
  const variant_secondary = "bg-[#E0B100] text-white hover:bg-[#F6E27F]";
  const variant_black_cn = "bg-[#21222D] text-white border-[#21222D]";
  const variant_blue_cn = "bg-[#02044A] text-white border-[#02044A]";
  const variant_red_cn = "bg-[#C2185B] text-white border-[#E51520]";
  const variant_outline = "bg-transparent text-[#000000] border-[#666666]";
  const variant_outlined_blue_cn =
    "bg-transparent text-[#0088DD] border-[#0088DD]";
  const variant_outlined_blue_dark_cn =
    "bg-transparent text-[#02044A] border-[#02044A]";
  const variant_outlined_red_cn =
    "bg-transparent text-[#DC3545] border-[#DC3545]";
  const variant_white_cn = "bg-white text-[#21222D] border-white";
  const variant_yellow_cn = "bg-[#FACC15] text-black border-[#FACC15]";
  const disabled_cn = "cursor-not-allowed opacity-50";

  return (
    <button
      className={cn(
        "flex items-center justify-center gap-[10px] px-[24px] py-[12px] border-[1px] rounded-md font-medium cursor-pointer hover:opacity-85 transition-all duration-150",

        // WIDTH
        fullWidth ? "w-full" : "w-fit",

        // VARIANTS
        variant === "primary" && variant_primary,
        variant === "danger" && variant_danger,
        variant === "secondary" && variant_secondary,
        variant === "black" && variant_black_cn,
        variant === "blue" && variant_blue_cn,
        variant === "danger" && variant_red_cn,
        variant === "outlined" && variant_outline,
        variant === "outlined-blue" && variant_outlined_blue_cn,
        variant === "outlined-blue-dark" && variant_outlined_blue_dark_cn,
        variant === "outlined-red" && variant_outlined_red_cn,
        variant === "white" && variant_white_cn,
        variant === "yellow" && variant_yellow_cn,

        disabled && disabled_cn,
        className
      )}
      type={type}
      disabled={disabled}
      id={id}
      onClick={onClick}
    >
      <span className="font-poppins text-inherit whitespace-nowrap">
        {title}
      </span>
      {loading && <Spinner className="text-inherit" />}
    </button>
  );
}

export default Button;
