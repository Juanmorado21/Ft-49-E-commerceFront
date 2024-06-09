import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

async function createOrder(products: number[], token: string) {
    try {
        if(!products.length){
            throw new Error ("No products in the order")
        }else if (!token){
            throw new Error ("No token provided")
        }
        const response = await axios.post (`${apiUrl}/orders`,
        {
            products: products
        }, {
            headers: {
                Authorization: token,
                'ngrok-skip-browser-warning': 'true'
            },
           
        }) 
        return response;
    } catch (error: any) {
        throw new Error(error)
    }
}

async function getOrders(token: string) {
    try {
        if(!token){
            throw new Error ("No token provided")
        }
        const response = await axios.get(`${apiUrl}/users/orders`, {
            headers: {
                Authorization: token,
                'ngrok-skip-browser-warning': 'true'
            }
        })
        return response.data
    } catch (error: any) {
        throw new Error(error);
    }
}

export {createOrder, getOrders}