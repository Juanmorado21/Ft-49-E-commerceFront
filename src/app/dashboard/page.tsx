"use client"
import { userSession } from "@/types";
import { redirect } from "next/navigation";
import  { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Dashboard = () => {
    const [userSession, setUserSession] = useState<userSession>();
    console.log(userSession);

    useEffect(() => {
     if(typeof window !== "undefined" && window.localStorage){
    const userToken = localStorage.getItem("userSession");
    console.log(userToken);
    setUserSession(JSON.parse(userToken!)) 
    !userToken && redirect ("/login")
    }
    }, [])

    return (
        <div className="flex pt-12 px-6 md:px-20  items-center justify-center bg-hero md:h-screen overflow-hidden">
    <div className="flex flex-col  gap-6 md:flex-row items-center max-w-8xl">
        <div className="w-full md:w-1/2 lg:pr-32">
            <h2 className="text-4xl lg:text-5xl text-center md:text-left text-blue-900 leading-tight font-medium">we are proud to be able to count on you</h2>
            <h3
                className="mt-6 md:mt-10 text-md lg:text-xl text-center md:text-left text-gray-700 font-light tracking-wider leading-relaxed">
                Thank you for coming this far and choosing us as your trusted brand.
            </h3>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start">
                <Link href="/cart">
                <button className="w-full sm:w-40 px-4 py-3 rounded font-semibold text-md bg-blue-500 text-white border-2 border-blue-500">Buy</button>
                </Link>
                <Link href="/dashboard/orders">
                <button className="w-full mt-4 sm:mt-0 sm:ml-4 sm:w-40 px-4 py-3 rounded font-semibold text-md bg-white text-blue-500 border-2 border-gray-500">Orders</button>
                </Link>
            </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
        <Image 
                    src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/04/estos-son-6-dispositivos-todos-esperan-apple-presente-2023-3005574.jpg?tf=3840x"
                    alt="Thank you and chat symbol"
                    width={900}  
                    height={800} 
                    className="rounded-lg"
                  />
         
        </div>
    </div>
</div>
    )
}

export default Dashboard