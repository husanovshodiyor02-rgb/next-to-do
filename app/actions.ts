"use server";

import { FormData, UserType } from "@/@types";
// revalidateTag o'rniga revalidatePath chaqiramiz
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL;

export const getUsers = async (): Promise<UserType[]> => {
  try {
    const data = await fetch(`${API_URL}`, {
      // Tags kerak emas, shunchaki keshni o'chiramiz
      cache: "no-store",
    });
    if (!data.ok) return [];
    return await data.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addUsers = async (data: FormData) => {
  try {
    const post = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (post.ok) {
      // Sahifani to'liq yangilash (tag o'rniga)
      revalidatePath("/about");
      return await post.json();
    }
  } catch (error) {
    throw new Error("Failed to add user");
  }
};

export const deleteUser = async (id: number) => {
  try {
    const deleteReq = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (deleteReq.ok) {
      // Sahifani to'liq yangilash
      revalidatePath("/about");
      return true;
    }
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
