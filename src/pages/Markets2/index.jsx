import React, { useEffect, useState } from 'react'

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
import Http from "@/utils/http";
import ConstValue from "@/utils/value";

export default function Markets2() {
    const navigate = useNavigate()
    const [info, setInfo] = useState([]);

    const toM3Link = (id) => {
        navigate('/markets3/' + id)
    }
    useEffect(() => {
        getInfo()
    }, [])
    const getInfo = async () => {
        let res = await Http.to.items("Application").readByQuery({
            sort: ['id'],
        });
        setInfo(res.data)
    }

    const toPage = (address, routerName) => {
        navigate('/' + address);
    }
    return (
        <div className='markets2'>
            <TopInfo imgBg={imgBg} title={'Application'} styleSelf={{ bgColor: '#000', height: '400px' }} info1={''} info2={''} />
            {/* <NavLink title1={'Markets'} link1={() => { toPage('markets') }} title2={'Application'} /> */}
            <div className='content'>
                {info?.map((item => {
                    return (
                        <div className="caritem" onClick={() => {
                            toM3Link(item?.id);
                            window.scrollTo(0, 0);
                        }}>
                            <CardNormal img={ConstValue.url + "assets/" + item?.img} title={item?.title} />
                        </div>
                    )
                }))}



            </div>
        </div>
    )
}
