import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium text-[#0088DD] mb-1 flex items-center gap-1",
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-red-500">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };
