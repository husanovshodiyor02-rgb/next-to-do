"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/card/index";
import Form from "@/components/form/index";
import AudioPlayer from "@/components/AudioPlayer";
import { getUsers, addUsers, deleteUser } from "@/app/actions";
import { UserType, FormData } from "@/@types";

const About = () => {
  const [users, setUsers] = useState<UserType[]>([]);


  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);


  const addUserToState = (newUser: UserType) => {
    setUsers((prev) => [...prev, newUser]);
  };

 
  const removeUserFromState = async (id: number) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <main className="min-h-screen relative bg-[#0a0a0a]">
    
      <div
        className="fixed inset-0 z-0 w-full h-300 bg-cover bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('/frodo.jpg')" }}
      ></div>

    
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none"></div>

  
      <div className="relative z-10 container mx-auto px-4 py-10">
        <h1 className="text-4xl md:text-6xl text-center font-serif text-yellow-500 mb-10 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-widest uppercase">
          Middle Earth Registry
        </h1>

        <div className="mb-16">
      
          <Form addUserToState={addUserToState} />
        </div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {users.length > 0 ? (
            users.map((user) => (
              <Card
                key={user.id}
                {...user}
                removeFromState={removeUserFromState} 
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 italic text-xl">
              The registry is empty. Summon new heroes...
            </div>
          )}
        </div>
      </div>

      <AudioPlayer />
    </main>
  );
};

export default About;
