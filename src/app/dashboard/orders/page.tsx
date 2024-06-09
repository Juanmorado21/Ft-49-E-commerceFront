"use client"

import { getOrders } from "@/helpers/orders.helper";
import { IOrder, IProduct, userSession } from "@/types";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const Orders = () => {
    const [token, setToken] = useState<userSession> ();
    const [orders, setOrders] = useState<IOrder[]>()
   

    useEffect(() => {
        if(typeof window !== "undefined" && window.localStorage){
            const userToken = localStorage.getItem("userSession");
            setToken(JSON.parse(userToken!))
            !userToken && redirect ("/login")
        }

    }, [])
        
     useEffect(() => {
         async function getData(){
             try {
                 const response = await getOrders(token?.token!)
                 setOrders(response)
             } catch (error: any) {
                 throw new Error (error)
             }
         };
         token && getData()
        },[token])
    
    

    console.log(orders)   
    
        
         
            return (
              <div className="flex flex-row w-full h-screen px-6 mt-12">
                
                <div className="w-full sm:w-1/2 xl:w-1/3 pt-24">
                  <div className="flex flex-col items-start pt-4 shadow-sm rounded-md bg-slate-100 bg-custom-blue">
                    {orders?.length! > 0 ? (
                      orders?.map((el) => (
                        <div key={el.id} className="order-item flex items-center my-4 p-4 border rounded-lg bg-soft-blue shadow-md w-full">
                          <div className="p-3 rounded-full bg-orange-600 bg-opacity-75 mr-4">
                            <svg className="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <p>{new Date(el.date).toLocaleString()}</p>
                            <p>Status: {el.status}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>No tienes ninguna orden aun</div>
                    )}
                  </div>
                </div>
                
                
                <div className="w-1/2 flex justify-end items-center">
                  <Image 
                    src="https://st2.depositphotos.com/2274151/6899/v/450/depositphotos_68997943-stock-illustration-thank-you-blue-square-sticker.jpg"
                    alt="Thank you and chat symbol"
                    width={800}  // Ajusta el ancho según tus necesidades
                    height={1000} // Ajusta la altura según tus necesidades
                    className="rounded-lg"
                  />
                </div>
              </div>
            );
         
          
      
    }
export default Orders 