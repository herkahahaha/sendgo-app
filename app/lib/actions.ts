"use server";
import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

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

  return result;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}