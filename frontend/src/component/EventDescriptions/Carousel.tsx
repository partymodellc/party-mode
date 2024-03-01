import React from 'react'
import Slider from "react-slick";
import {useRef} from 'react';
import LazyImage from '../general/LazyImage';
import {motion} from "framer-motion"

type Props = {
    carouselData?: {
        id: string,
        image: string
    }[],
    settings: {
        dots: boolean,
        infinite: boolean,
        speed: number,
        slidesToShow: number,
        slidesToScroll: number
    },
    maxWidth: string,
    width: string,
    style?: any,
    classes?: string
}


export default function Carousel({carouselData = [], settings, maxWidth, width, style, classes}: Props) {
    const slider1Arrow: any = useRef();

    carouselData?.map((data, idx) => {
        // console.log(data.image)
    })

    let count = 0;

    return (
        <>
            <Slider {...settings}>
                {carouselData.map((data: any) => {
                    count++
                    return (
                        <motion.div key={count} whileHover={{scale: 1.01}}
                                    className="shadow-md xsm:flex xsm:justify-center">
                            <LazyImage alt="" src={`${data.image}`}
                                       style={{maxWidth, width, ...style}} classes={classes}/>
                        </motion.div>)
                })}
            </Slider>
        </>
    )
}