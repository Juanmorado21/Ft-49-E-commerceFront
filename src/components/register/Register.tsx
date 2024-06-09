"use client"
import validateRegisterForm  from "@/utils/formValidations";
import { RegisterErrorProps, RegisterProps } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export function RegisterForm() {
  const router = useRouter();

  const [dataUser, setDataUser] = useState<RegisterProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const [errorUser, setErrorUser] = useState<RegisterErrorProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(dataUser),
      })
        .then((res) => res.json())
        .then((json) => {
          const { token, user } = json;
          localStorage.setItem("userSession", JSON.stringify({ token: token, userData: user }));
          alert("El usuario se registro correctamente");
          router.push("/");
          
        });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setErrorUser(errors);
  }, [dataUser]);

  console.log(dataUser);

  return (
    <div className="mt-32 md:mt-44 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-12 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <div className="max-w-xl w-full space-y-8 p-8 rounded-xl shadow-tertiary-500/50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Register 
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-primary font-bold">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={dataUser.name}
                type="text"
                required
                onChange={handlechange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                            border-border-500/50 placeholder-text-500/50 text-primary rounded-t-md
                            focus:outline-none focus:ring-tertiary focus:border-secondary focus:z-10
                            sm:text-sm"
                placeholder="Jhon Doe"
              />
              {errorUser.name && (
                <p className="text-error font-bold">{errorUser.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email-adress" className="text-primary font-bold">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                value={dataUser.email}
                type="email"
                autoComplete="email"
                required
                onChange={handlechange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                            border-border-500/50 placeholder-text-500/50 text-primary rounded-t-md
                            focus:outline-none focus:ring-tertiary focus:border-secondary focus:z-10
                            sm:text-sm"
                placeholder="example@mail.com"
              />
              <p className="text-error font-bold">{errorUser.email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-primary font-bold">
                Password
              </label>
              <div className="flex">
                <input
                  id="password"
                  name="password"
                  value={dataUser.password}
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handlechange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border
                            border-border-500/50 placeholder-text-500/50 text-primary rounded-t-md
                            focus:outline-none focus:ring-tertiary focus:border-secondary focus:z-10
                            sm:text-sm"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex p-2 bg-secondary rounded-sm"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="text-error font-bold">
                {errorUser.password}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirm-password" className="text-primary font-bold">
                Confirm Password
              </label>
              <div className="flex">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  value={dataUser.confirmPassword}
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handlechange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-boder-500/
                            50 placeholder-text-500/50 text-primary rounded-t-md focus:outline-none focus:ring-tertiary
                            focus:border-secondary focus:z-10 sm:text-sm"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="flex p-2 bg-secondary rounded-sm"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="text-error font-bold">
                {errorUser.confirmPassword}
              </p>
            </div>
            <div className="flex flex-col gap-2"><label htmlFor="address" className="text-primary font-bold">
                Address
              </label>
              <input
                id="address"
                name="address"
                value={dataUser.address}
                type="text"
                required
                onChange={handlechange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border-500/50
                            focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="cra 18A"
              />
              <p className="text-error font-bold">{errorUser.address}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-primary font-bold">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                value={dataUser.phone}
                type="tel"
                required
                onChange={handlechange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border-500/50
                            placeholder-text-500/50 text-primary rounded-t-md focus:outline-none focus:ring-tertiary
                            focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="(123) 456-7890"
              />
              <p className="text-error font-bold">{errorUser.phone}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              
              className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
            >
              Register
            </button>
          </div>
          <div
            className="mt-4 flex justify-center text-primary"
          >
            ¿Do you already have an account?
            <Link
              href="/login"
              className="ml-2 text-blue-700 hover:font-bolder hover:underline focus:font-bolder focus:underline
                        focus:outline-none"
            >
              Login
            </Link>
          </div>
        </form>

      </div>

    </div>
  );

}

export default RegisterForm;