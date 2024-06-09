import HomePage from "@/components/home/Home";
import { getProducts } from "@/helpers/product.helper";
import { IProduct } from "../../types";

const Home = async () => {
    const products: IProduct[] = await getProducts();

    return <HomePage products={products} />;
};

export default Home;
