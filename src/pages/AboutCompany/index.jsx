import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/ac_bg1.jpg'
import NavLink from '@/components/NavLink'
import AboutNav from '@/components/AboutNav'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Http from "@/utils/http";
import './index.scss'
export default function AboutCompany() {
    const navigate = useNavigate()
    const toPage = (address, routerName) => {
        navigate('/' +address);
    }
    const [info, setInfo] = useState({});
    useEffect(()=>{
        getInfo()
    },[])
    const getInfo = async () => {
        let res = await Http.to.items("About_us_page" ).readByQuery({
            sort: ['id'],
        });
        setInfo(res.data)
    }
    return (
        <div className='about_company'>
            <TopInfo imgBg={imgBg} title={'Company'} info1={'LINK TO THE UNKNOWN'} info2={' '} />
            <NavLink title1={'About'} link1={()=>{toPage('about')}} title2={'Company'}/>
            <AboutNav />
            {/* <div className='content'>
                <div className='text1'>
                    Linktel Technologies was founded in 2011, and through 11 years of rapid development, the company has become one of the mainstream optical component and transceiver suppliers in the world.
                </div>
                <div className='img'>
                    <img src={imgItem} alt="" />
                </div>
                <div className='text2'>We implement international operations with our branches and presences in China, US, Singapore and Malaysia. We provide high-quality and cutting-edge products for high speed optical I/O connectivity, as well as ODM or OEM service to global customers. Linktel went IPO at Shenzhen Stock Exchange Market on Sep 13, 2022, and will open a new chapter to go for the future growth.<br /><br />

                    Linktel is a technology and innovation oriented company, and offers two categories of products and solutions. One is pluggable transceivers including SFP+, QSFP+, QSFP28, QSFP-DD, OSFP, etc in various form factors with data rate from 10Gb/s up to 800Gb/s, which are widely applied for Metro, Wireless, Access, Enterprise networks and Data Centers. The other is optical engines which can be used for pluggable transceiver modules, and Near-Packaged Optics(NPO) and Co-Packaged Optics(CPO) on board for high speed optical connection. Optical engines are more flexible and time-to-market to realize high density and bandwidth data transmission for the applications like AI and HPC. We can support our customers with ODM service,via our expertise and experiences on optical design, hybrid OE package, RF simulation, Thermal simulation and high speed circuit design. We also can work as an OEM partner with global manufacture footprints.
                </div>
                <div className='com_bg'>
                    <img src={imgBg2} alt="" />
                </div>
                <div className='text3'>
                    Linktel, ISO9001 and ISO14001 certified, has well-established quality control system and MES production execution system in place to ensure product quality stable, consistent and reliable. We are committed to create real value for our customers and pursue long term success.
                    <br /><br />
                    We will be making unremitting efforts to forge Linktel Technologies a leading supplier of next generation of optical I/O connectivity solution, and a pioneer to unknown world.
                </div>
            </div> */}
            <div className='content' dangerouslySetInnerHTML={{__html:info?.About_us_content}}></div>

        </div>
    )
}
