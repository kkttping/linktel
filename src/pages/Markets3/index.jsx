import NavLink from '@/components/NavLink'
import { useParams } from 'react-router-dom';
import imgitem from '@/static/img/m3_bg1.jpg'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";

import './index.scss'
export default function Market3() {
    const getParams = useParams();
    const navigate = useNavigate()
    const toPage = (address, routerName) => {
        navigate('/' +address);
    }
    const [info, setInfo] = useState({});

    useEffect(() => {
        getInfo()
    }, [])
    const getInfo = async () => {
        let res = await Http.to.items("Application/"+getParams.id).readByQuery({
            sort: ['id'],
        });
        console.log(res.data);
        setInfo(res.data)
    }
    return (
        <div className='market3'>
            <NavLink  title1={'Application'} link1={()=>{toPage('markets2')}}  title2={info?.title}/>
            <div className='title'>
                {info?.title}
            </div>
            <div className='info' dangerouslySetInnerHTML={{__html:info?.content}}></div>
            <div className='img'>
                <img src={ConstValue.url + "assets/" + info?.img} alt="" />
            </div>
        </div>
    )
}
