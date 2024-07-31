"use client";

import { logout } from "@/app/actions";
import { PrimaryButton } from "./button";

export function LogoutButton() {
  return (
    <PrimaryButton
      className=" outline-slate-50 text-teal-200 hover:text-black hover:bg-slate-50"
      label="Logout"
      onClick={async () => {
        await logout();
      }}
    />
  );
}
