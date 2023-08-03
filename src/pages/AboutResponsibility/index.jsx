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
   const toPage2 = (address, routerName) => {
        navigate('/' + address);
    }
    useEffect(() => {
        getInfo("New");
    }, []);

    const getInfo = async (url) => {
        let res = await Http.to.items(url).readByQuery({
            sort: ['-sort', '-date_updated'],
            filter: {
                type
                    :
                    "Responsibility",status:"published"
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
            <TopInfo imgBg={imgBg} title={'Responsibility'} styleSelf={{ bgColor: '#000' }} info1={'LINK TO THE UNKNOWN'} info2={' '} />
            <NavLink title1={'About'} link1={()=>{toPage2('about')}} title2={'Responsibility'}/>
            <AboutNav />
            {info.map((item, index) => {
                return (
                    <CardNews2 key={index} 
                    link={() => {
                    if (item?.outlink) {
                    const link = item?.outlink.startsWith('http') ? item?.outlink : `./#/${item?.outlink}`;
                    window.open(link);    // 打开外链
                    } else {
                    return toPage('newsInfo', item.id+'/'+item.type);
                    }
                    }}
                    title={item.Title} infoList={[item.Preview]} img={ConstValue.url + "assets/" + item?.Img} />

                )
            })}

        </div>
    )
}
