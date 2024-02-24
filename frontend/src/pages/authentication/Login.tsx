import React, {useState} from "react"
import Button from "../../component/general/Button"
import {Link} from "react-router-dom"
import LazyImage from "../../component/general/LazyImage"
import {motion} from "framer-motion"
import {config} from '../../config/Config'
import {useNavigate, useSearchParams} from "react-router-dom"
import {LoginCredentials, useAuth} from "../../context/AuthProvider"
import 'react-toastify/dist/ReactToastify.css'
import {toast, ToastContainer} from "react-toastify"

export default function Login() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const {login} = useAuth()

    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
        email: "",
        password: "",
    })

    const redirectToParam = searchParams.get('redirectTo')
    const redirectTo = redirectToParam ? decodeURIComponent(redirectToParam) : "/"

    const inputHandler = (e: any) => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value,
        })
    }

    const LoginUser = (e: any) => {
        e.preventDefault()
        setLoading(true)

        login(loginCredentials)
            .then(() => {
                setLoading(false)
                toast.success("Logged In")
                navigate(redirectTo)
                navigate(0)
            })
            .catch(response => {
                setLoading(false)
                toast.error(response.message)
            })
    }

    const loginAsGoogle = () => {
        window.open(`${config.backendBaseUri}/auth/google`, "_self")
    }

    return (
        <>
            <section className="w-[calc(100vw - 100%)] h-[100vh] flex xsm:flex-col sm:flex-col">
                <div className="authBackground flex-1 flex justify-center items-center py-[60px]">
                    <div
                        className="authFliterEffect rounded-[50px] w-[39.76945244956772vw] xsm:min-w-[80vw] sm:min-w-[60vw] h-[331px] flex justify-center items-center ml-[-45px] xsm:ml-0 sm:ml-0 pl-[4.14985590778098vw]">
                        <h1 className="w-[35vw] xsm:min-w-[70vw] sm:min-w-[50vw] font-[700] text-[48px] leading-[78px] xsm:leading-[40px] sm:leading-[40px] text-[#fff]">
                            Exclusive<span className="text-[#0252ED]"> events,</span>
                            <span className="font-[700] text-[32px] leading-[52px]"> priceless memories.</span>
                        </h1>
                    </div>
                </div>
                <div
                    className="flex-1 bg-[#fff] ml-[-45px] xsm:ml-0 sm:ml-0 xsm:min-w-[80vw] rounded-tl-[50px] rounded-bl-[50px]">
                    <div className="w-[52%] xsm:w-[70%] sm:w-[62%] m-auto">
                        <div className="pt-[38px]">
                            <Link to="/">
                                <img src="/Logo.png" alt=""/>
                            </Link>
                            <h1 className="font-[700] text-[clamp(20px,2.07492795389049vw,36px)] leading-[58px] text-[#473a3a] mt-[13px]">
                                Login
                            </h1>
                        </div>

                        <form className="mt-[25px]">
                            <div>
                                <label
                                    className="font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[26.06px] text-[#473a3a] "
                                    style={{fontWeight: "600"}}
                                >
                                    Email
                                </label>
                                <input
                                    className="w-[27.608069164265128vw] xsm:min-w-full sm:min-w-full h-[50px] block rounded-[10px] border-[1px] border-[#473a3a]"
                                    style={{padding: "0 10px"}}
                                    name="email"
                                    onChange={inputHandler}
                                    value={loginCredentials.email}
                                />
                            </div>
                            <div className="mt-[15px]">
                                <label
                                    className="font-[400] text-[clamp(12px,0.9221902017291066vw,16px)] leading-[26.06px] text-[#473a3a] "
                                    style={{fontWeight: "600"}}
                                >
                                    Password
                                </label>
                                <input
                                    className="w-[27.608069164265128vw] xsm:min-w-full sm:min-w-full h-[50px] block rounded-[10px] border-[1px] border-[#473a3a]"
                                    style={{padding: "0 10px"}}
                                    name="password"
                                    onChange={inputHandler}
                                    value={loginCredentials.password}
                                />
                                <div className="flex justify-between mt-[19px]">
                                    <div className="flex gap-[10px]">
                                        <input type={"checkbox"}/>
                                        <label className="text-[12px]">Remember me</label>
                                    </div>
                                    <p className="text-[12px]">Forget Password</p>
                                </div>
                            </div>

                            <div className="flex flex-col xsm:items-center">
                                {/* <Link to={"/dashboard"}> */}
                                {loading ? (
                                    <Button
                                        whileHover={{
                                            background: "#fff",
                                            border: "3px solid #0252ED",
                                            color: "#0252ED",
                                        }}
                                        width="27.608069164265128vw"
                                        height="57px"
                                        text="Loging In..."
                                        style={{
                                            background: "#0252ED",
                                            color: "#fff",
                                            marginTop: "25px",
                                            minWidth: "100%",
                                        }}
                                        onClick={LoginUser}
                                    />
                                ) : (
                                    <Button
                                        whileHover={{
                                            background: "#fff",
                                            border: "3px solid #0252ED",
                                            color: "#0252ED",
                                        }}
                                        width="27.608069164265128vw"
                                        height="57px"
                                        text="LogIn"
                                        style={{
                                            background: "#0252ED",
                                            color: "#fff",
                                            marginTop: "25px",
                                            minWidth: "100%",
                                        }}
                                        onClick={LoginUser}
                                    />
                                )}

                                {/* </Link> */}
                                <Link to={"/signup"} className="min-w-[100%]">
                                    <Button
                                        whileHover={{
                                            background: "#0252ED",
                                            border: "3px solid #0252ED",
                                            color: "#fff",
                                        }}
                                        width="27.608069164265128vw"
                                        height="57px"
                                        text="SignUp"
                                        style={{
                                            background: "#fff",
                                            color: "#0252ED",
                                            border: "1px solid #473a3a",
                                            marginTop: "20px",
                                            minWidth: "100%",
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className="flex justify-between items-center mt-[17px] xsm:gap-[5px]">
                                <div className="min-w-[8.247838616714697vw] bg-[#e0e0e0] h-[1px]">
                                    {" "}
                                </div>
                                <p className="font-[400] text-[12px] leading-[19px] text-[#918a8a]">
                                    or Login with
                                </p>
                                <div className="min-w-[8.247838616714697vw] bg-[#e0e0e0] h-[1px]">
                                    {" "}
                                </div>
                            </div>

                            <div className="flex justify-between my-[10px]">
                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    className="rounded-[10px] flex justify-center items-center w-[102px] h-[78px] border-[1px] border-[#D9D9D9]"
                                >
                                    <LazyImage alt="" src="/facebook.png"/>
                                </motion.div>
                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    onClick={loginAsGoogle}
                                    className="rounded-[10px] cursor-auto flex justify-center items-center w-[102px] h-[78px] border-[1px] border-[#D9D9D9]"
                                >
                                    <LazyImage alt="" src="/google.png"/>
                                </motion.div>
                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    className="rounded-[10px] flex justify-center items-center w-[102px] h-[78px] border-[1px] border-[#D9D9D9]"
                                >
                                    <LazyImage alt="" src="/apple.png"/>
                                </motion.div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <ToastContainer
                position="bottom-right"
                autoClose={false}
                closeOnClick={false}
            />
        </>
    )
}
