import React, { useEffect, useState } from 'react'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/c4_bg1.jpg'
import NavLink from '@/components/NavLink'
import CareerNav from '@/components/CareerNav'
import { Menu, Row, Col } from 'antd'
import CardOpportunities from '@/components/CardOpportunities'
import { useNavigate } from "react-router-dom";

import './index.scss'
export default function CareerOpportunities() {
    const navigate = useNavigate()
    const toPage = (address, routerName) => {
        navigate('/' +address);
    }
    const [info, setInfo] = useState([]);
    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        let res = await Http.to.items("recruit").readByQuery({
            sort: ['id'],
        });
        setInfo(res.data)
        console.log(res);
    }
    return (
        <div className='career_opportunities'>
            <TopInfo imgBg={imgBg} title={"Job opportunities"} info1={'A Solution and Service Provider'} info2={'of High Speed Optical I/O Connectivity'} />
            <NavLink title1={'Career'} link1={()=>{toPage('career')}} title2={"Job opportunities"}/>
            <CareerNav />
            <div className='content'>

                <Row justify={"center"}>
                    {info.map((item, index) => {
                        return (
                            <Col key={index}>
                                <div className='opportunities_item'>
                                    <CardOpportunities data={item} />
                                </div>
                            </Col>
                        )
                    })}

                </Row>
            </div>

        </div>
    )
}
