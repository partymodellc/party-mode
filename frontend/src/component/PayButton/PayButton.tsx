import React from 'react'
import Button from "../general/Button"

export default function PayButton() {
    const handleCheckout = () => {

    }

    return (
        <div>
            <Button
                onClick={() => handleCheckout()}
                whileHover={{background: "#ffffff", border: "3px solid #FB4A04", color: "#FB4A04"}}
                width="27.608069164265128vw"
                height='57px'
                text="Sign Up"
                style={{background: "#FB4A04", color: "#ffffff", marginTop: "25px", minWidth: "100%"}}
            />
        </div>
    )
}