"use client";
import { UserType } from "@/@types";
import { deleteUser } from "@/app/actions";
import React, { FC, useState } from "react";

interface CardProps extends UserType {
  removeFromState: (id: string | number) => void;
  updateUserInState: (user: UserType) => void;
}

const Card: FC<CardProps> = ({ removeFromState, updateUserInState, ...props }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const deleteUsersFromApi = async () => {
    if (!confirm("Rostdan ham o'chirmoqchimisiz?")) return;
    
    setIsDeleting(true);
    try {
      console.log("Deleting user:", props.id);
      const isDeleted = await deleteUser(props.id);
      
      if (isDeleted) {
        removeFromState(props.id);
      } else {
        alert("O'chirib bo'lmadi. Qayta urinib ko'ring.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Xatolik yuz berdi.");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Noma'lum";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Noma'lum";
      
      return date.toLocaleString("uz-UZ", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Noma'lum";
    }
  };

  return (
    <div className="relative group h-full">
      <div className="h-auto min-h-96 w-full bg-[url('/frodo.jpg')] bg-cover bg-center rounded-lg shadow-md flex flex-col justify-center p-4">
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#4a3b2a]"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#4a3b2a]"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#4a3b2a]"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#4a3b2a]"></div>

        <div className="text-center space-y-2 bg-white/90 p-4 rounded-md backdrop-blur-sm">
          <div className="text-xs font-bold text-[#8b0000] uppercase tracking-widest opacity-70">
            ID: {props.id}
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2c1810]">
            {props.name}
          </h3>
          <p className="text-[#5c4033] italic font-serif pb-2">
            {props.surname}
          </p>

       
          <div className="text-xs text-gray-700 space-y-1 border-t border-[#4a3b2a]/30 pt-2 mb-2">
            {props.createdAt && (
              <div className="flex justify-between">
                <span className="font-semibold">Qo'shildi:</span>
                <span>{formatDate(props.createdAt)}</span>
              </div>
            )}
            {props.updatedAt && props.updatedAt !== props.createdAt && (
              <div className="flex justify-between">
                <span className="font-semibold">Tahrirlandi:</span>
                <span>{formatDate(props.updatedAt)}</span>
              </div>
            )}
          </div>

          
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isDeleting}
              className="flex-1 inline-flex items-center justify-center rounded bg-yellow-700 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-yellow-600 focus:outline-none disabled:opacity-50"
            >
              <span className="mr-1"></span>
              Tahrirlash
            </button>
            <button
              onClick={deleteUsersFromApi}
              disabled={isDeleting}
              className="flex-1 inline-flex items-center justify-center rounded bg-[#2c1810] px-4 py-2 text-sm font-medium text-yellow-500 transition-all duration-300 hover:bg-[#8b0000] hover:text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="mr-1">⚔️</span>
              {isDeleting ? "O'chirilmoqda..." : "O'chirish"}
            </button>
          </div>
        </div>
      </div>

     
      {isEditing && (
        <EditModal
          user={props}
          onClose={() => setIsEditing(false)}
          onUpdate={updateUserInState}
        />
      )}
    </div>
  );
};

const EditModal: FC<{
  user: UserType;
  onClose: () => void;
  onUpdate: (user: UserType) => void;
}> = ({ user, onClose, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://69369720f8dc350aff316930.mockapi.io/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Updated user:", updatedUser);
        onUpdate(updatedUser);
        onClose();
      } else {
        alert("Tahrirlash muvaffaqiyatsiz");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-black/90 border-2 border-yellow-600 p-8 rounded-xl shadow-[0_0_30px_rgba(202,138,4,0.5)] max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl text-yellow-500 font-serif text-center mb-6 border-b border-yellow-800 pb-2">
          Tahrirlash
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm font-serif block mb-1">
              Ism
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-900/80 border border-yellow-700 text-yellow-100 p-3 rounded focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm font-serif block mb-1">
              Familiya
            </label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="w-full bg-gray-900/80 border border-yellow-700 text-yellow-100 p-3 rounded focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-all disabled:opacity-50"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500 text-black font-bold py-3 px-4 rounded transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Card;
