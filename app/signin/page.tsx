'use client'

import { PrimaryButton } from "@/components/button";

export default function Page() {

  return (
    <section className="mx-auto my-10 flex items-center">
      <div className="">
        <h1>Login Page</h1>
        <div className="">image</div>
        <div className="">
          <h1>Login</h1>
          <PrimaryButton onClick={()=>alert("hola")} label={"ini tombol"} />
        </div>
      </div>
    </section>
  );
}
