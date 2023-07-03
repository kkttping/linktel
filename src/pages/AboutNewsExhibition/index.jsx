import React, { useEffect, useState } from 'react'
import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/an_bg1.jpg'
import NavLink from '@/components/NavLink'
import NewsNav from '@/components/NewsNav'
import CardNews from '@/components/CardNews'
import AboutNav from '@/components/AboutNav'
import imgBg1 from '@/static/img/an_item1.jpg'
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Http from "@/utils/http";
import ConstValue from "@/utils/value";

import './index.scss'

export default function AboutNewsExhibition() {
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
            sort: ['-sort', 'date_updated'],
            filter: {
                type
                    :
                    "Exhibition",status:"published"
            }
        });
        let res2 = await Http.to.items("New_Content").readByQuery({
            sort: ['id'],
            fields: [' *,item.*'],
            filter: { 'collection': 'Img', }
        });
        let img = '';
        res.data.forEach(item0 => {
  const imgList = res2.data.filter(item2 => item2.id === item0.Content)
  item0.imgList = imgList.map(item => item.item.Img) 
})

let arr = res.data.filter(item => item.status === 'published') 
arr = arr.concat(res.data.filter(item => item.status !== 'published'))

setInfo(arr);

    }

    return (
        <div className='about_news_exhibition'>
            <TopInfo imgBg={imgBg} title={'News'} styleSelf={{ bgColor: '#000' }} />
            <NavLink  title1={'About'} link1={()=>{toPage2('about')}}  title2={'Exhibition'} />
             <AboutNav />
            <NewsNav />
            {info.map((item, index) => {
                return (
                    <CardNews 
                    key={index}
                    link={() => {
                    if (item?.outlink) {
                    const link = item?.outlink.startsWith('http') ? item?.outlink : `./#/${item?.outlink}`;
                    window.open(link);    // 打开外链
                    } else {
                    return toPage('newsInfo', item.id+'/'+item.type);
                    }
                    }}
                    title={item.Title} 
                    infoList={item.Exhibition.split('/n')} 
                    img={ConstValue.url + "assets/" + item?.Img} 
                    />

                )
            })}

        </div>
    )
}
