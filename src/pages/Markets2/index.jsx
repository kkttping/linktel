import React from 'react'
import imgBg from '@/static/img/m_bg_1.jpg'
import TopInfo from '@/components/TopInfo'
import NavLink from '@/components/NavLink'
import CardNormal from '@/components/CardNormal'
import imgitem1 from '@/static/img/m2_item1.jpg'
import imgitem2 from '@/static/img/m2_item2.jpg'
import imgitem3 from '@/static/img/m2_item3.jpg'
import { useNavigate } from "react-router-dom";
import { Menu, Row, Col } from 'antd'
import './index.scss'
export default function Markets2() {
    const navigate = useNavigate()

    const toM3Link=(title)=>{
        navigate('/markets3/'+title)
    }


    const toPage = (address, routerName) => {
        navigate('/' +address);
    }
    return (
        <div className='markets2'>
            <TopInfo imgBg={imgBg} title={'Application'} styleSelf={{ bgColor: '#000', height: '400px' }} info1={''} info2={''} />
            <NavLink title1={'Markets'} link1={()=>{toPage('markets')}} title2={'Application'} />
            <div className='content'>
                <div className="caritem" onClick={() => {
  toM3Link('Telecom: Metro Wireless');
  window.scrollTo(0, 0); 
}}>
                            <CardNormal img={imgitem1} title={'Telecom: Metro Wireless'} />
                        </div>
                    <div className="caritem" onClick={()=>{toM3Link('Data Center: Inside DC  DCI'); window.scrollTo(0, 0); }}>
                            <CardNormal img={imgitem2}  title={'Data Center: Inside DC  DCI'} />
                        </div>
                   <div className="caritem" onClick={()=>{toM3Link('Data Center: Inside DC  DCI'); window.scrollTo(0, 0); }}>
                            <CardNormal img={imgitem3} title={'Data Center: Inside DC  DCI'} />
                        </div>
              
            </div>
        </div>
    )
}
