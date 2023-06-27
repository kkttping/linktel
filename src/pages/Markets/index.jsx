import React from 'react'
import { Menu, Row, Col } from 'antd'
import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/bg_4.jpg'
import imgitem1 from '@/static/img/m_item1.jpg'
import imgitem2 from '@/static/img/m_item2.jpg'
import CardProducts from '@/components/CardProducts'
import { useNavigate } from "react-router-dom";

import './index.scss'
export default function Markets() {
    const navigate = useNavigate()


    const toPage = (address, routerName) => {
        navigate('/' +address);
    }
    return (
        <div className='markets'>
            <TopInfo imgBg={imgBg} title={'Markets'} info1={'LINK TO THE UNKNOWN'} info2={' '} />
            <div className='content'>
                <Row justify={"center"}>
                    <Col sm={24} xl={12} >
                        <div className='card_item'>
                            <CardProducts link={()=>{toPage('products','products')}} img={imgitem1} styleSelf={{ color: '#fff',objectfit:'cover' }} titleout={'Products'} titleIn={'Products'} info={['Linktel is a technology and innovation oriented company. One is pluggable transceivers including SFP+, QSFP+, QSFP28, QSFP-DD, OSFP, etc in various form factors with data rate from 10Gb/s up to 800Gb/s, which are widely applied for Metro']} ></CardProducts>
                        </div>
                    </Col>
                    <Col sm={24} xl={12} >
                        <div className='card_item'>
                            <CardProducts link={()=>{toPage('markets2','markets')}} img={imgitem2} styleSelf={{ color: '#fff',objectfit:'cover' }} titleout={'Application'} titleIn={'Application'} info={['We can support our customers with ODM service,via our expertise and experiences on optical design, hybrid OE package, RF simulation, Thermal simulation and high speed circuit design. We also can work as an OEM partner with global manufacture footprints. ']}></CardProducts>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
