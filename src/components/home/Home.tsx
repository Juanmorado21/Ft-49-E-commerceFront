import Cards from "../cards/Cards";
import Carousel from "../carousel/Carousel";
import carouselImagesToPreLoad from "../../utils/images";
import { IProduct } from "../../types"; 

interface HomePageProps {
    products: IProduct[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
    return (
        <div className="my-32 flex flex-col items-center justify-center">
            <Carousel images={carouselImagesToPreLoad} />
            <Cards products={products} />
        </div>
    );
};

export default HomePage;
