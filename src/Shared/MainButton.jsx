/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MainButton = forwardRef(
  (
    {
      text,
      isLoading = false,
      form,
      action,
      disabled = false,
      isSubmitable,
      width,
      dataLoadingText = "Please wait ...",
      variant = "[#00053d]",
      className,
      iconRoute,
      rightIconRoute,
      rightIconClass = "w-[24px] h-[24px]",
      iconComponent,
      size = "normal",
    },
    ref
  ) => {
    const propWidth =
      width === "full_width"
        ? "w-full"
        : width
        ? width === "contain"
          ? ""
          : "w-[245px]"
        : "";

    const isSecondaryVariant = variant !== "[#00053d]";

    const size_height =
      size === "normal"
        ? "h-[3.1215rem]"
        : size === "large"
        ? "h-[3.75rem]"
        : "h-[2.625rem]";

    const variant_hover =
      variant === "[#00053d]" ? "hover:bg-[#00053d]" : "hover:bg-secondary";

    return !isLoading ? (
      <Button
        form={form}
        className={`border-[.2rem] border-[#555E67] ${
          isSecondaryVariant ? " text-white  bg-secondary" : "bg-[#00053d]"
        } text-white  ${propWidth} md:${propWidth}  select-none rounded-[1.3rem] hover:opacity-90 ${variant_hover} ${size_height} ${className}`}
        onClick={!disabled ? action : () => undefined}
        type={isSubmitable ? "submit" : "button"}
        ref={ref}
        disabled={disabled}
      >
        {iconRoute && (
          <img
            src={iconRoute}
            alt="left button icon"
            className="w-[24px] h-[24px]"
          />
        )}
        {iconRoute && <span>&nbsp;</span>}
        {iconComponent}
        {iconComponent && <span>&nbsp;</span>}
        {text}
        {rightIconRoute && <span>&nbsp;</span>}
        {rightIconRoute && (
          <img
            src={rightIconRoute}
            alt="right button icon"
            className={rightIconClass}
          />
        )}
      </Button>
    ) : (
      <Button
        className={`bg-[#00053d] text-white ${propWidth} md:${propWidth} select-none rounded-[0.625rem] cursor-not-allowed ${size_height} ${
          className ? className : ""
        }`}
        ref={ref}
        disabled
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {dataLoadingText}
      </Button>
    );
  }
);

// Assigned display name
MainButton.displayName = "MainButton";

export default MainButton;
