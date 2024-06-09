import { IProduct } from "@/types/index";
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function getProductsDB (){
    try{
      const res = await fetch (`${apiUrl}/products`, {
        method:"GET",
        headers: {
            'ngrok-skip-browser-warning': 'true'
        },
        
      })
      const products: IProduct[] = await res.json();
      return products;
    }catch (error: any) {
        throw new Error(error)
    }
}

export const getProducts = async (): Promise<IProduct[]> => {
    try {
        // Suponiendo que `getProductsDB` es una función que obtiene los productos de la base de datos.
        const productsDB: IProduct[] = await getProductsDB();
        return productsDB;
    } catch (error: any) {
        throw new Error('Error al obtener los productos: ' + error.message);
    }
};

export async function getProductById(id: string){
    try {
        const products = await getProducts();
        const product = products.find((product) => product.id.toString() === id)
        if(!product) throw new Error("Product not found")
        return product;
    } catch (error: any) {
        throw new Error(error) 
    }
}