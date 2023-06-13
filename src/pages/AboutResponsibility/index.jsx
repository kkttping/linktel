import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/ar_bg1.jpg'
import NavLink from '@/components/NavLink'
import AboutNav from '@/components/AboutNav'
import CardNews2 from '@/components/CardNews2'
import imgBg1 from '@/static/img/ar_item1.jpg'
import React, { useEffect, useState } from 'react'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";

import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import './index.scss'
export default function AboutResponsibility() {
    const navigate = useNavigate()
    const [info, setInfo] = useState([]);


    const toPage = (address, info) => {
        navigate('/' + address + '/' + info);
    }
    useEffect(() => {
        getInfo("New");
    }, []);

    const getInfo = async (url) => {
        let res = await Http.to.items(url).readByQuery({
            sort: ['id'],
            filter: {
                type
                    :
                    "Responsibility"
            }
        });

        

        setInfo(res.data);
    }
    const timeSet = (num) => {
        if (num < 10) {
            return '0' + num;
        }
        return num
    }
    return (
        <div className='about_responsibility'>
            <TopInfo imgBg={imgBg} title={'Responsibility'} styleSelf={{ bgColor: '#000' }} info1={'A Solution and Service Provider'} info2={'of High Speed Optical I/O Connectivity'} />
            <NavLink title1={'About'} link1={()=>{toPage('about')}} title2={'Responsibility'}/>
            <AboutNav />
            {info.map((item, index) => {
                return (
                    <CardNews2 key={index} link={() => toPage('newsInfo', item.id+'/'+item.type)} title={item.Title} infoList={[item.Preview]} img={ConstValue.url + "assets/" + item?.Img} />

                )
            })}

        </div>
    )
}
