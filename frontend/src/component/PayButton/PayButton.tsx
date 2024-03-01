import React from 'react'
import Button from "../general/Button"

export default function PayButton() {
    const handleCheckout = () => {

    }

    return (
        <div>
            <Button
                onClick={() => handleCheckout()}
                whileHover={{background: "#ffffff", border: "3px solid #0252ED", color: "#0252ED"}}
                width="27.608069164265128vw"
                height='57px'
                text="Sign Up"
                style={{background: "#0252ED", color: "#ffffff", marginTop: "25px", minWidth: "100%"}}
            />
        </div>
    )
}