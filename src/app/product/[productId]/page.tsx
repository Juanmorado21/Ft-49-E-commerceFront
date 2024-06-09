"use client"
import { getProductById } from "@/helpers/product.helper"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IProduct, userSession } from "@/types";


const DetailProduct =  ({ params } : {params: {productId: string}}) => {
    const router = useRouter();
    const [userSession, setUserSession] = useState<userSession> ()
    const [product, setProduct] = useState<IProduct>()

    useEffect(() => {
        const fetchData = async () => {
        const product = await getProductById(params.productId)
        setProduct(product)
        }
        fetchData()

        if(typeof window !== "undefined" && window.localStorage){
            const userToken = localStorage.getItem("userSession");
            setUserSession(JSON.parse(userToken!)) 
        }
    }, [])

    console.log(userSession, product)


    const handleBuy = () => { 
        if(!userSession) {
          alert("Debes estar logueado para poder realizar la compra")
           router.push("/login")
        } else {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
            cart.push(product)
            localStorage.setItem("cart", JSON.stringify(cart))
            alert("Se agrego correctamente el producto al carrito")
            router.push("/cart")
        }
    }

    
    return (
        <div className="relative w-full bg-white mt-32 py-8 ">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">   
                 <img className="w-full h-full object-cover" src={product?.image} alt="imagendelproducto"  />
                </div>
                <div className=" flex justify-center flex mx-2 mb-4">
                   <div className="w-1/2 px-2"> 
                     <button onClick={handleBuy}  className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to cart</button>
                   </div>
                </div>
            </div>
            <div className="md:flex-1 px-4 flex flex-col">
    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">{product?.name}</h2>
    <div className="mb-4">
        <div className="mr-4">
            <p className="font-bold text-black">Price: ${product?.price}</p>
        </div>
        <div>
            <p>Stock: {product?.stock}</p>
        </div>
    </div>
    <div className="mb-4">
        <span className="font-bold text-back">Select Color:</span>
        <div className="flex items-center mt-2">
            <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-pink-200 mr-2"></button>
            <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
            <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
            <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
        </div>
    </div>
    <div className="font-bold text-black">
        <p className="text-black text-sm mt-2">{product?.description}</p>
    </div>
     </div>
     </div>
      </div>
     </div>
        
    )
}

export default DetailProduct