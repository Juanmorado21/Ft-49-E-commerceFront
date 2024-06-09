"use client"
import { createOrder } from "@/helpers/orders.helper"
import { IProduct, userSession } from "@/types";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Cart = () => {
    const [token, setToken] = useState<userSession> ();
    const [cart, setCart] = useState<IProduct[]> ([])
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        if(typeof window !== "undefined" && window.localStorage){
            const userToken = localStorage.getItem("userSession");
            setToken(JSON.parse(userToken!))
            !userToken && redirect ("/login")
        }

        const storedCard = JSON.parse(localStorage.getItem("cart") || "[]");
        if(storedCard){
            let totalCart = 0;
            storedCard?.map((item:IProduct) => {
                totalCart = totalCart + item.price
            })
            setTotal(totalCart)
            setCart(storedCard)
        }

    }, [])


    const removeFromCart = (productId: number) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        const updatedTotal = updatedCart.reduce((acc, item) => acc + item.price, 0);
        setCart(updatedCart);
        setTotal(updatedTotal);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    async function handleClick(){
        try {
            const orderProducts = new Set(cart.map((product) => product.id))
            await createOrder(Array.from(orderProducts), token?.token!)
            localStorage.setItem("cart", "[]");
            setCart([]);
            setTotal(0)
            alert("Compra realizada con exito")
        } catch (error:any) {
            throw new Error (error)
        }
    };

    

    return (
        <div className="container mx-auto pt-20">
            <div className="sm:flex shadow-md my-10">
            <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
                
            <div/>
            <div className="flex flex-col items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
             <div className="md:w-4/12 2xl:w-1/4 w-full"></div>
                {
                    
                    cart.length > 0 ? (
                        cart?.map((el) => {
                            return (
                                <div key={el.id} className="flex items-center py-8 md:py-10 lg:py-8 border-t border-gray-50">
                   <div className="flex-shrink-0">
                     <img src={el?.image} alt="imagendelproduct" className="w-32 h-32 object-cover"  />
                    </div>
                   <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center ml-4">
                     <p className="text-base font-black leading-none text-gray-800">{el.name}</p>
                      <p >Price: ${el.price}</p>
                        <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={() => removeFromCart(el.id)}>Remove</p>
                       </div>
                      </div>

                            )
                        })
                    ) : (
                        <div> No tienes ningun producto agregado a tu carrito </div>
                    )
                }
            </div>

                <div className="py-10">
                  <label
              
                   className="font-semibold inline-block mb-3 text-sm uppercase">
                   Address
                   </label>
                    <input
                     type="text"
                     
                     placeholder="Enter your Address"
                      className="p-2 text-sm w-full"
                />
                <div className="py-10">
                  <label
              
                   className="font-semibold inline-block mb-3 text-sm uppercase">
                   Phone number
                   </label>
                    <input
                     type="text"
                     
                     placeholder="Enter your Number phone"
                      className="p-2 text-sm w-full"
                />

      
                                 <div className="flex flex-col justify-center items-center bg-gray-200 p-6 rounded my-6 w-1/2">
                                    <p>Total: ${total}</p>
                                  </div>


                <button  onClick={handleClick}className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Checkout</button>

            </div>
            </div>
            </div>

          
        </div>
        </div>
        </div>
    )
}

export default Cart