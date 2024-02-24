import {motion} from "framer-motion"
import {BaseSyntheticEvent} from "react";

type Props = {
    style?: any,
    text?: string,
    whileHover?: object
    onChangeHandler?: (e: BaseSyntheticEvent) => void
}

export default function Search({style, text = "Search Events", whileHover, onChangeHandler}: Props) {
    return (
        <motion.input
            name="search"
            whileHover={whileHover} style={style}
            className='inputBackground indent-[5.53vw] xsm:pl-[15px] w-[35.04vw] lg:w-[25.04vw] md:w-full xsm:w-full h-[54px] rounded-[20px] border-[3px] border-[#9fb9f4]'
            placeholder={text}
            onChange={onChangeHandler}
        >
        </motion.input>
    )
}