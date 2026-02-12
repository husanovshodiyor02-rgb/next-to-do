"use client";
import { FormData, UserType } from "@/@types";
import { addUsers } from "@/app/actions";
import { useForm } from "react-hook-form";
import { FC } from "react";


interface FormProps {
  addUserToState: (user: UserType) => void;
}

const Form: FC<FormProps> = ({ addUserToState }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const submit = async (e: FormData) => {
   
    const newUser = await addUsers(e);

 
    if (newUser) {
      addUserToState(newUser);
      reset();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/60 backdrop-blur-sm border-2 border-yellow-600 p-8 rounded-xl shadow-[0_0_20px_rgba(202,138,4,0.3)]">
      <h2 className="text-2xl text-yellow-500 font-serif text-center mb-6 border-b border-yellow-800 pb-2">
        Join the Fellowship
      </h2>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <div className="space-y-1">
          <label className="text-gray-300 text-sm font-serif">
            Warrior Name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Aragorn"
            className="w-full bg-gray-900/80 border border-yellow-700 text-yellow-100 p-3 rounded focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 placeholder-gray-600 transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-300 text-sm font-serif">
            Clan / Surname
          </label>
          <input
            {...register("surname", { required: true })}
            type="text"
            placeholder="Son of Arathorn"
            className="w-full bg-gray-900/80 border border-yellow-700 text-yellow-100 p-3 rounded focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 placeholder-gray-600 transition-all"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500 text-black font-bold py-3 px-4 rounded border border-yellow-400 shadow-lg transform active:scale-95 transition-all font-serif tracking-wide"
        >
          SUMMON HERO
        </button>
      </form>
    </div>
  );
};

export default Form;
