"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "../actions";
import Link from "next/link";

export default function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <form action={action} className="space-y-8 max-w-md mx-auto my-20">
      <div className="rounded-lg bg-gray-50 text-black px-6 pb-4 pt-8">
        <h1 className="">Please log in to continue.</h1>
        <div className="flex flex-col gap-y-2 mb-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            placeholder="test@test.com"
            type="email"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          {/* <div className="flex items-center justify-between">
            <label htmlFor="password">Password</label>
            <Link className="text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div> */}
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <LoginButton />
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-4 w-full text-black" aria-disabled={pending}>
      Log in
    </button>
  );
}
