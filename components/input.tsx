"use client";

import { Field, Label, Select, Description } from "@headlessui/react";
import clsx from "clsx";

type InputProps = {
  title: string;
  description: string;
  onchange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  children: React.ReactNode;
  disable?: boolean;
}
export function Input({
  title,
  description,
  onchange,
  name,
  children,
  disable
}: InputProps) {
  return (
    <>
      <Field disabled={disable}>
        <Label className="text-sm/6 font-medium text-white">{title}</Label>
        <Description className="text-sm/6 text-white/50">
          {description}
        </Description>
        <div className="relative">
          <Select
            onChange={onchange}
            name={name}
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              // Make the text of each option black on Windows
              "*:text-black"
            )}
          >
            {children}

            {/* {listData?.map((value: any) => (
                <option key={`${value.province_id}`} value={value.province_id}>
                  {" "}
                  {value.province}
                </option>
              ))} */}
          </Select>
        </div>
      </Field>
    </>
  );
}
