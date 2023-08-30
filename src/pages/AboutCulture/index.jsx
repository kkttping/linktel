import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/acu_bg1.jpg'
import NavLink from '@/components/NavLink'
import AboutNav from '@/components/AboutNav'
import CardCulture from '@/components/CardCulture'
import { Menu, Row, Col } from 'antd'
import React, { useState, useEffect } from 'react'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { useNavigate } from "react-router-dom";

import './index.scss'
export default function AboutCulture() {
    const [cultureList, setCultureList] = useState([]);
    const navigate = useNavigate()
    const toPage = (address, routerName) => {
        navigate('/' +address);
    }
    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        let res = await Http.to.items("Culture").readByQuery({
            sort: ['sort'],
        });
        setCultureList(res.data)
    }
    return (
        <div className='about_culture'>
            <TopInfo imgBg={imgBg} title={'Culture'} styleSelf={{ bgColor: '#000' }} info1={'LINK TO THE UNKNOWN'} info2={' '} />
            <NavLink title1={'About'} link1={()=>{toPage('about')}} title2={'Culture'}/>
            <AboutNav />
            <Row justify={'center'} className='card_all'>
                {cultureList.map((item, index) => {
                    return (
                        <Col key={index} className='card_li'>
                            <div className='card_item'><CardCulture title={item?.title} infoList={[item?.text]} img={ConstValue.url + "assets/" + item?.img
                            } /> </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
