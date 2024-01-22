import React from 'react';
import LoginForm from "./components/Forms/Login/LoginForm";


const HomePage = () => {
  return (
    <main className="flex flex-col lg:flex-row h-screen">
      <div className="basis-[60%] md:basis-[60%] lg:basis-1/2 flex justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-7xl font-bold text-white"><span className="text-green-500">N</span>exus</h1>
          <p className="ps-1 text-white">Share your thoughts.</p>
        </div>
      </div>
      <div className="basis-[40%] md:basis-[40%] lg:basis-1/2 flex lg:justify-center items-center ">
        <div className="m-auto w-[85%] md:w-[70%] lg:w-[70%]">
          <LoginForm/>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
