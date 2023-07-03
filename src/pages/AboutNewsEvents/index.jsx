import React, { useEffect, useState } from 'react'
import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/an_bg2.jpg'
import NavLink from '@/components/NavLink'
import NewsNav from '@/components/NewsNav'
import AboutNav from '@/components/AboutNav'
import CardNews2 from '@/components/CardNews2'
import imgBg1 from '@/static/img/an_item3.jpg'
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './index.scss'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
export default function AboutNewsEvents() {
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
    type: "Event", 
    status: "published"
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
    const timeSet = (num) => {
        if (num < 10) {
            return '0' + num;
        }
        return num
    }
    return (
        <div className='about_news_events'>
            <TopInfo imgBg={imgBg} title={'News'} styleSelf={{ bgColor: '#000' }} />
            <NavLink title1={'About'} link1={() => toPage2('about')} title2={'Events'} />
             <AboutNav />
            <NewsNav />
            {info.map((item, index) => {
  return (
    <CardNews2
      key={index}
      link={() => {
        if (item?.outlink) {
          const link = item?.outlink.startsWith('http') ? item?.outlink : `./#/${item?.outlink}`;
    window.open(link);    // 打开外链
        } else {
          return toPage('newsInfo', item.id+'/'+item.type);
        }
      }}
      time={[`${timeSet((new Date(item?.date_created)).getMonth())}-${timeSet((new Date(item?.date_created)).getDay())}`, (new Date(item?.date_created)).getFullYear()]}
      title={item?.Title}
      infoList={[item?.Preview]}
      img={ConstValue.url + "assets/" + item?.Img}
    />
  ) 
})}
        </div>
    )
}
