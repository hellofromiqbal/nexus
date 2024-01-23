import RegisterForm from '../components/Forms/Register/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="flex flex-col lg:flex-row h-screen">
      <div className="basis-[45%] md:basis-[60%] lg:basis-1/2 flex justify-center items-center">
        <div className="flex flex-col text-white">
          <h1 className="text-7xl font-bold"><span className="text-green-500">N</span>exus</h1>
          <p className="ps-1">Share your thoughts.</p>
        </div>
      </div>
      <div className="basis-[55%] md:basis-[40%] lg:basis-1/2 flex lg:justify-center items-center ">
        <div className="m-auto w-[85%] md:w-[70%] lg:w-[70%]">
          <RegisterForm/>
        </div>
      </div>
    </main>
  );
}
