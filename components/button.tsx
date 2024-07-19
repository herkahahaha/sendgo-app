import * as React from "react";

interface buttonPrimary {
    label: string,
    type?:string,
    disabled?: boolean,
}
type ButtonProps = buttonPrimary & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({label,type,disabled, ...rest}, ref) => {
        return (
          <button disabled={disabled} type={type} ref={ref} className="p-2 w-auto outline outline-2 outline-slate-50 text-teal-200 hover:text-black hover:bg-slate-50 text-xs rounded-md" {...rest}>{label}</button>
        )
      }
) 

PrimaryButton.displayName = "PrimaryButton";