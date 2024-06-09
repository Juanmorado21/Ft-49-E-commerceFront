"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-[#FFFFFF29] py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
            <div className="flex items-center justify-between  p-3 ">
                <Link href="/home" className="flex items-center space-x-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/15216/15216856.png" alt="Mhux Heek Logo" className="w-12 h-12" />
                </Link>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link href="/login" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                Login
                            </Link>
                            <Link href="/register" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                Register
                            </Link>
                        </>
                    )}
                    <Link href="/dashboard" className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md hover:bg-gray-100">
                        <img src="https://images.vexels.com/media/users/3/200097/isolated/lists/942820836246f08c2d6be20a45a84139-icono-de-carrito-de-compras-carrito-de-compras.png" alt="cart" className="w-8 h-8" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
