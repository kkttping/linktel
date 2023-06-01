import React from 'react'
import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/c2_bg1.jpg'
import imgitem from '@/static/img/c2_item1.jpg'
import imgitem2 from '@/static/img/c2_item2.jpg'
import NavLink from '@/components/NavLink'
import CareerNav from '@/components/CareerNav'

import './index.scss'
export default function CareerMessage() {
    return (
        <div className='career_message'>
            <TopInfo imgBg={imgBg} title={"GM's Message"} info1={'A Solution and Service Provider'} info2={'of High Speed Optical I/O Connectivity'} />
            <NavLink />
            <CareerNav />
            <div className='content'>
                <div className="title">General Manager's Message</div>
                <div className='title_info'>Focusing on technologies and products, Linktel Technologies has become one of the fastest developing companies in the field of Optical Components through years of dedication and hard work. Our rapid growth benefits from the ever-changing markets driven by the mobile internet and cloud computing, and thanks to the trust from our global customers, to the commitment of our staff and also to the great supports of our partners.</div>
                <div className='img'><img src={imgitem} alt="" /></div>
                <div className="info2">
                    As an incredibly unique company, almost all of employees at Linktel Technologies are very young, and the entire team is full of vitality and enthusiasm. We will cheer together for our success, and help each other when encountering a setback. Sharing the common value of “Be Earnest Do Best”, we work together and win together.

                    Linktel Technologies is a company with an ambition. We definitely won’t stop where we are now, with the persistence towards our goal of “Become a leading supplier of optical communication transceivers in the world”. We commit to offering best-in-class quality and more cost-effective products and service to our customers.

                    On behalf of Linktel Technologies, I sincerely invite and welcome more talents to join us and strive together for a better future !
                </div>
                <div className='img2'>
                    General<br /> Manager
                    <img src={imgitem2} alt="" />
                    Linktel Technologies Co., Ltd
                </div>

            </div>

        </div>
    )
}
