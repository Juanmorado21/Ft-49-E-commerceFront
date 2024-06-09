"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from '@/utils/AuthContext';
import { LoginErrorProps, LoginProps } from "@/types";
import { validateLoginForm } from "@/utils/formValidations";

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [dataUser, setDataUser] = useState<LoginProps>({
    email: "",
    password: ""
  });

  const [errorUser, setErrorUser] = useState<LoginErrorProps>({
    email: "",
    password: "", 
    errorMessage: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({
      ...dataUser,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
    try {
      const res = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(dataUser),
      });

      const json = await res.json();
      console.log(json);
      const { token, user } = json;

      localStorage.setItem("userSession", JSON.stringify({ token, userData: user }));
      alert("El usuario se logueo correctamente");

      login(); // Actualiza el estado de autenticación
      router.push("/");
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    const errors = validateLoginForm(dataUser);
    setErrorUser(errors);
  }, [dataUser]);

  console.log(dataUser);

  return (
    <main className="mt-40 md:mt-44 mb-4 flex-grow relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <section className="w-full">
        <div className="text-center text-4xl font-medium">
          <h2>LOGIN</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <div className="relative mt-6">
              <label htmlFor="email-adress" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email</label>
              <input
                id="email-adress"
                name="email"
                value={dataUser.email}
                type="text"
                required
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
              />
              {errorUser.email && <p>{errorUser.email}</p>}
            </div>

            <div className="relative mt-6">
              <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
              <input
                id="password"
                name="password"
                value={dataUser.password}
                type={showPassword ? "text" : "password"}
                required
                onChange={handleChange}
                placeholder="********"
                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
              />
              <button className="absolute top-[50%] right-0 transform translate-y-[-50%] bg-transparent border-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
              {errorUser.password && <p>{errorUser.password}</p>}
            </div>

            <div className="my-6">
              <button type="submit" className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default LoginForm;
