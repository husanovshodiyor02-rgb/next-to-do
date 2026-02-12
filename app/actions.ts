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
    console.log("Fetched users:", data);
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

export const updateUser = async (id: string | number, data: FormData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Failed to update user:", response.status);
      return null;
    }

    const updatedUser = await response.json();
    revalidatePath("/about");
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

export const deleteUser = async (id: string | number) => {
  try {
    console.log("Deleting user with ID:", id);
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    console.log("Delete response status:", response.status);
    
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
