"use server";

import { FormData, UserType } from "@/@types";
import { revalidateTag } from "next/cache";

export const getUsers = async (): Promise<UserType[]> => {
  try {
    const data = await fetch(`${process.env.API_URL}/user`, {
      next: { tags: ["users"] },
    });
    const res = await data.json();
    return res;
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};

export const addUsers = async (data: FormData) => {
  try {
    const post = await fetch(`${process.env.API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (post.ok) {
      revalidateTag("users", "default");
    }
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};

export const deleteUser = async (id: number) => {
  try {
    const deleteUser = await fetch(`${process.env.API_URL}/user/${id}`, {
      method: "DELETE",
    });

    if (deleteUser.ok) {
      revalidateTag("users", "default");
    }
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};
