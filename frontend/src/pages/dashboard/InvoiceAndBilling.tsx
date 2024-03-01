import React from 'react'
import Sidebar from '../../component/dashboard/Sidebar'
import InvoiceAndBillingDescription from '../../component/InvoiceAndBilling/InvoiceAndBillingDescription'
import InvoiceDetails from '../../component/InvoiceAndBilling/InvoiceDetails'

type Props = {}

export default function InvoiceAndBilling({ }: Props) {
    return (
        <Sidebar>
            <div className='w-full pt-[65px] ml-[6.282420749279539vw] xsm:ml-[4vw] sm:ml-[6vw] md:ml-[7vw]'>
                <h1 className='font-[700] text-[clamp(20px,2.07492795389049vw,36px)] leading-[58px] text-[#473a3a] ml-[10px]'>Events</h1>

                <InvoiceAndBillingDescription />
                {/* <InvoiceDetails /> */}
            </div>
        </Sidebar>
    )
}