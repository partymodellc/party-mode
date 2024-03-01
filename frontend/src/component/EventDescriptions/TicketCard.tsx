import LazyImage from "../general/LazyImage"
import {motion} from "framer-motion"
import {useEvent} from "../../context/EventProvider"
import "react-toastify/dist/ReactToastify.css"
import {useState} from "react"
import {config} from "../../config/Config"

type Props = {
    id: string
    name: string
    image: string
    price: number
    phase?: string
    removeTicketHandler?: (id: string) => void
    addTicketHandler?: () => void
}

export default function TicketCard({
                                       id,
                                       name,
                                       image,
                                       price,
                                       phase,
                                       removeTicketHandler,
                                       addTicketHandler
                                   }: Props) {
    const {deleteTicket} = useEvent()
    const [purchaseLoading, setPurchaseLoading] = useState(false)

    return (
        <motion.div
            initial={{scale: 0}}
            animate={{scale: 1}}
            whileHover={{scale: 1.01}}
            key={id}
            className="shadow-md md:justify-center flex xsm:flex-col w-[42.305vw] xl:w-[41vw] lg:w-[41vw] md:w-[41vw] sm:w-[80vw] xsm:w-[90vw] md:min-w-[70%]"
        >
            {image &&
                <LazyImage
                    alt=""
                    src={`${config.backendBaseUri}/images/${image}`}
                    classes="w-[13.314vw] xsm:min-w-[100%] min-w-[231px]"
                />
            }
            <div className="flex flex-1">
                <div className="pl-[1.15vw] flex-1 flex flex-col h-[100%] bg-[#9fb9f4] sm:flex-0">
                    <h3 className="mt-[13px] font-[400] leading-[33px] text-[clamp(14px,1.1527377521613833vw,20px)] text-[#231414]">
                        {name}
                    </h3>
                    <h2 className="mt-[12px] font-[700] leading-[53px] xsm:flex xsm:flex-col text-[32px] text-[#231414]">
                        ${price}
                        {/* TODO: support ticket description */}
                        {/*{ticket.description &&*/}
                        {/*    (<span*/}
                        {/*        className="ml-[0.922vw] font-[400] leading-[33px] text-[clamp(14px,1.1527377521613833vw,20px)] text-[#231414]">*/}
                        {/*                {ticket.description}*/}
                        {/*    </span>)*/}
                        {/*}*/}
                    </h2>
                </div>
                {phase === ("creation" || "edit") ?
                    (<div
                        onClick={() => removeTicketHandler ? removeTicketHandler(id) : deleteTicket(id)}
                        className="cursor-pointer flex justify-center items-center w-[4.43vw] bg-[#0252ED] xsm:min-w-[77px] sm:min-w-[55px] md:min-w-[60px]"
                    >
                        <LazyImage alt="" src={"/delete.png"}/>
                    </div>)
                    :
                    (<div
                        onClick={() => addTicketHandler && addTicketHandler()}
                        className="cursor-pointer flex justify-center items-center w-[4.43vw] bg-[#0252ED] xsm:min-w-[77px] sm:min-w-[55px] md:min-w-[60px]"
                    >
                        {purchaseLoading ?
                            (<div>
                                <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 mr-2 text-white animate-spin  fill-orange-400"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            </div>)
                            :
                            (<LazyImage alt="" src={"/add.png"}/>)
                        }
                    </div>)
                }
            </div>
        </motion.div>
    )
}
