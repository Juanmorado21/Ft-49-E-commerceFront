import { IProduct } from "@/types";
import Card from "../card/Card"
import styled from "styled-components";
import Link from "next/link";


const Cards = ({ products } : { products: IProduct[] }) => {
    return (
        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {
            products?.map((product) => {
                return (
                    <Link href= {`/product/${product.id}`} key={product.name}>
                    <Card key={product.name} {...product} />
                    </Link>
                )
            })
        }
        </div>  
    )
}

export default Cards