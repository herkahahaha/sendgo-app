"use server";

import { revalidatePath } from "next/cache";
// import bcrypt from 'bcrypt';
import { FormState, LoginFormSchema } from "./lib/zod";
import { createSession, deleteSession } from "./auth/session";

export async function getDataProvince() {
  const res = await fetch(`${process.env.RAJAONGKIR}/province`, {
    headers: {
      key: `${process.env.SECRETKEY}`,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export async function getDataCity() {
  const res = await fetch(`${process.env.RAJAONGKIR}/city`, {
    headers: {
      key: `${process.env.SECRETKEY}`,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export const ServiceCost = async (prevState: any, formData: FormData) => {
  const rawFormData = {
    origin_province: formData.get("origin_province"),
    origin_city: formData.get("origin_city"),
    destination_province: formData.get("destination_province"),
    destination_city: formData.get("destination_city"),
    courier: formData.get("courier"),
  };
  const initData = `origin=${rawFormData.origin_city}&destination=${rawFormData.destination_city}&weight=1700&courier=${rawFormData.courier}`;
  // const initData = "origin=501&destination=114&weight=1700&courier=jne"

  const res = await fetch(`${process.env.RAJAONGKIR}/cost`, {
    method: "POST",
    headers: {
      key: `${process.env.SECRETKEY}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: initData,
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to post data");
  }
  const result = await res.json();
revalidatePath("/")
  return result;
};

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  const errorMessage = { message: 'Invalid login credentials.' };

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Query the database for the user with the given email
  // const user = await db.query.users.findFirst({
  //   where: eq(users.email, validatedFields.data.email),
  // });

  const user = validatedFields.data.email === "test@test.com"

  // If user is not found, return early
  if (!user) {
    return errorMessage;
  }
  // 3. Compare the user's password with the hashed password in the database
  // const passwordMatch = await bcrypt.compare(
  //   validatedFields.data.password,
  //   "123test",
  // );
  const passwordMatch = 
    validatedFields.data.password ===
    "123test"
  

  // If the password does not match, return early
  if (!passwordMatch) {
    return errorMessage;
  }

  // 4. If login successful, create a session for the user and redirect
  const userId = "test@test.com";
  await createSession(userId);
}

export async function logout() {
  deleteSession();
}