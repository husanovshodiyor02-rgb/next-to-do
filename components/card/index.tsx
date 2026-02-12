"use client";
import { UserType } from "@/@types";
import { deleteUser } from "@/app/actions";
import React, { FC, useTransition } from "react";


interface CardProps extends UserType {
  removeFromState: (id: number) => void;
}

const Card: FC<CardProps> = ({ removeFromState, ...props }) => {
  const [isPending, startTransition] = useTransition();

  const deleteUsersFromApi = () => {
    startTransition(async () => {
    
      const isDeleted = await deleteUser(props.id);

     
      if (isDeleted) {
        removeFromState(props.id);
      }
    });
  };

  return (
    <div className="relative group h-full">
   
      
      <div className="h-96 w-full bg-[url('/frodo.jpg')] bg-cover bg-center rounded-lg shadow-md flex flex-col justify-center p-4">
   
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#4a3b2a]"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#4a3b2a]"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#4a3b2a]"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#4a3b2a]"></div>

        <div className="text-center space-y-2 bg-white/80 p-4 rounded-md backdrop-blur-sm">
          <div className="text-xs font-bold text-[#8b0000] uppercase tracking-widest opacity-70">
            ID: {props.id}
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2c1810]">
            {props.name}
          </h3>
          <p className="text-[#5c4033] italic font-serif border-b border-[#4a3b2a]/30 pb-4 mb-4">
            {props.surname}
          </p>

          <button
            onClick={deleteUsersFromApi}
            disabled={isPending}
            className="w-full group/btn relative inline-flex items-center justify-center overflow-hidden rounded bg-[#2c1810] px-6 py-2 font-medium text-yellow-500 transition-all duration-300 hover:bg-[#8b0000] hover:text-white focus:outline-none disabled:opacity-50"
          >
            <span className="mr-2 text-lg">⚔️</span>
            {isPending ? "Banishing..." : "Banish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
