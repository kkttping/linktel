import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/aq_bg1.jpg'
import NavLink from '@/components/NavLink'
import AboutNav from '@/components/AboutNav'
import imgItem1 from '@/static/img/aq_item1.jpg'

import { Menu, Row, Col } from 'antd'
import React, { useEffect, useState } from 'react'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { useNavigate } from "react-router-dom";


import './index.scss'
export default function AboutQuality() {
    const [quality, setQuality] = useState([]);
    const [info, setInfo] = useState({});
    const [scriptdata, setscriptdata] = useState('');
    const navigate = useNavigate()
    const toPage = (address, routerName) => {
        navigate('/' +address);
    }
        useEffect(() => {
        getInfo();
        }, []);
        useEffect(() => {
        getInfo2();
        }, []);
 
        const getInfo = async () => {
        let res = await Http.to.items("Certificate").readByQuery({
            sort: ['sort'],
            filter: { 'status': 'published', }
        });
        setQuality(res.data)
    }   
        const getInfo2 = async () => {
        let res = await Http.to.items("Quality").readByQuery({
            sort: ['id'],
        });
        setInfo(res.data)
            if(res?.data?.js===undefined)return
        addExternalScript(ConstValue.url + "assets/" +res?.data?.js);
    }

    // 添加js文件
    function addExternalScript(src) {
        if(src===undefined)return
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject();
            document.body.appendChild(script);
        });
    }

    return (
        <div className='about_quality'>
            <TopInfo imgBg={imgBg} title={'Quality'} styleSelf={{ bgColor: '#000' }} info1={'LINK TO THE UNKNOWN'} info2={' '} />
            <NavLink title1={'About'} link1={()=>{toPage('about')}} title2={'Quality'}/>
            <AboutNav />
            <div className='content' dangerouslySetInnerHTML={{ __html: info?.content }}></div>
            <div className='content'>                 
                <div className='imgList'>
                    <Row justify={'center'}>
                        {quality.map((item, index) => {
                            return (
                                <Col key={index}><div className='img_box'><img src={ConstValue.url + "assets/" + item?.img} alt="" /></div></Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        </div>
    )
}
