"use server";

import { FormData, UserType } from "@/@types";
import { revalidatePath } from "next/cache";

const API_URL = "https://69369720f8dc350aff316930.mockapi.io/users";

export const getUsers = async (): Promise<UserType[]> => {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      console.error("Failed to fetch users:", response.status);
      return [];
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const addUsers = async (data: FormData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Failed to add user:", response.status);
      return null;
    }

    const newUser = await response.json();
    revalidatePath("/about");
    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete user:", response.status);
      return false;
    }

    revalidatePath("/about");
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
