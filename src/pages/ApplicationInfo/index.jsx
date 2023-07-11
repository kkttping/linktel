import React, { useEffect, useState } from 'react'
import NavLink from '@/components/NavLink'
import { useParams } from 'react-router-dom';
import imgitem from '@/static/img/an_item3.jpg'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import './index.scss'
export default function ApplicationInfo() {
    const [info, setInfo] = useState({});
    const navigate = useNavigate()


    const toPage2 = (address, info) => {
        navigate('/' + address);
    }
    const getParams = useParams();
    useEffect(() => {
        getInfo("New/" + getParams?.id);
    }, []);



    return (
        <div className='application_info'>
            <NavLink title1={'Application'} link1={() => { toPage2('markets2') }}  title2={info?.Title} />
            <div className='title'>
                <div className='title_box'>
                    

                    <div className='title_info'>{info?.Title}</div>

                    
                </div>

            </div>
            <div
                className='contactfull'
                dangerouslySetInnerHTML={{ __html: (info?.contactfull) }}
            />
            <div className='info' dangerouslySetInnerHTML={{ __html: info?.text1 }} />
            <div className='img'>
                <img src={ConstValue.url + "assets/" + info?.img} alt="" />
            </div>
        </div>


    )
}
