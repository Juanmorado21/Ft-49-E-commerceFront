import Cards from "../cards/Cards"
import Carousel from "../carousel/Carousel";
import carouselImagesToPreLoad from  "../../utils/images"
import { getProducts } from "@/helpers/product.helper";


const HomePage =  async()=> {
    const products = await getProducts()
    return (
        <div className="my-32 flex  flex-col items-center justify-center"> 
            <Carousel  images={carouselImagesToPreLoad}/>
            <Cards products={products}/>
        </div>
    )
}

export default HomePage;