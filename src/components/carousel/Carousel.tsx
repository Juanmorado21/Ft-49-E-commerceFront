"use client"


import { useState, useCallback, useEffect } from "react"
import Image from "next/image"


interface ICarouselImagePorps {
    id: number
    image: string 
}

interface ICarouselPorps {
    images: ICarouselImagePorps[]
}

export default function Carousel({ images }: ICarouselPorps) {
    
    const [activeIndex, setActiveIndex] = useState(0)

    const handleButtonClick = useCallback((index: number) => {
        setActiveIndex(index)
    }, [])

    const handlePrevClick = useCallback (() => {
        setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex -1 : images.length -1
    )
    }, [images.length])

    const handleNextClick = useCallback (() => {
        setActiveIndex((prevIndex) => 
        prevIndex < images.length -1 ? prevIndex +1 : 0
    )
    }, [images.length])

    useEffect(() =>{
        const timer = setInterval(() => {
            handleNextClick()
        }, 2500)

        return () => {
            clearInterval(timer)
        }
    }, [handleNextClick])

    return (
        <div 
        id="default-carousel"
        className="relative w-full sm:mb-8 md:mb-12"
        data-carousel="slide">
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {images.map((img, index)=> (
                <div 
                key={index}
                className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
                data-carousel-item>
                 <Image 
                 src={img.image}
                 className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                 alt={img.image}
                 width={1000}
                 height={1000} 
                 />
                 </div>  
            ))} 
            </div> 
      </div>
    )}