import React, { useEffect, useState } from 'react'
import NavLink from '@/components/NavLink'
import { useParams } from 'react-router-dom';
import imgitem from '@/static/img/an_item3.jpg'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import './index.scss'
export default function AboutNewsInfo() {
    const [info, setInfo] = useState({});
    const navigate = useNavigate()

    const toPage = (address, info) => {
        navigate('/' + address + '/' + info);
    }
    const toPage2 = (address, info) => {
        navigate('/' + address);
    }
    const getParams = useParams();
    useEffect(() => {
        getInfo("New/" + getParams?.id);
    }, []);

    const getInfo = async (url) => {
        let res = await Http.to.items(url).readByQuery({
            sort: ['id'],
            fields: ['*'],

            filter: {
                type
                    :
                    getParams?.type, status: "published"
            }
        });
        let res2 = await Http.to.items("New_Content").readByQuery({
            sort: ['id'],
            fields: [' *,item.*'],
            filter: { 'collection': 'Img', }
        });
        let res3 = await Http.to.items("New_Content").readByQuery({
            sort: ['id'],
            fields: ['*,item.*'],
            filter: { 'collection': 'Text', }
        });


        res.data.Content.forEach((item) => {
            res2?.data?.forEach((item2) => {
                if (item === item2.id
                ) {
                    res.data.img = item2?.item?.Img;
                }
            })
            res3?.data?.forEach((item2) => {
                if (item === item2.id
                ) {

                    res.data.text1 = item2?.item?.Text;
                }
            })
        })


        setInfo(res.data);

    }
    const timeSet = (num) => {
        if (num < 10) {
            return '0' + num;
        }
        return num
    }
    return (
        <div className='about_news_info'>
            <NavLink title1={'About'} link1={() => { toPage2('about') }} title2={getParams?.type} link2={() => { if (getParams?.type !== 'Event') { toPage2(getParams?.type?.toLocaleLowerCase()) } else { toPage2('events') } }} title3={info?.Title} />
            <div className='title'>
                <div className='title_box'>
                    {info?.date_created && info?.type !== 'Responsibility' && (<div className='time'>

                        <span>{timeSet((new Date(info?.date_updated)).getMonth()+1)}-{timeSet((new Date(info?.date_updated)).getDate())}<br /></span>
                        <span >{(new Date(info?.date_updated)).getFullYear()}</span>

                    </div>)}

                    <div className='title_info'>{info?.Title}</div>

                    <div className='title_ps' dangerouslySetInnerHTML={{ __html: info?.Exhibition?.replace(/\n/g, "") }}>

                    </div>
                </div>

            </div>
            {info?.contactfull && (
 
<div
                className='contactfull'
                dangerouslySetInnerHTML={{ __html: (info?.contactfull) }}
            />
)}
           {info?.text1 && (  <div className='info' dangerouslySetInnerHTML={{ __html: info?.text1 }} />)}
          {info?.img && (   <div className='img'>
                <img src={ConstValue.url + "assets/" + info?.img} alt="" />
            </div>)}
        </div>

    )
}
