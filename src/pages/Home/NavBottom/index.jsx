import React, { useEffect, useState } from 'react'

import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { useNavigate } from "react-router-dom";

import './index.scss'
export default function NavBottom(porps) {
    const [items, setItem] = useState([])
    const [info, setInfo] = useState([])

    const [items2, setItem2] = useState([])
    const navigate = useNavigate()

    const toPage = (address, data) => {
        if (data) {
            navigate('/' + address + '/' + data);
        window.location.reload()

            return
        }
        navigate('/' + address);
        window.location.reload()

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

    }
    useEffect(() => {
        getNextM();
    }, []);

    const getNextM = async () => {
        let res = await Http.to.items('menu_new').readByQuery({
            sort: ['id'],
        });
        setInfo(res.data);
    }

    const productsPage = (
        <div className='products_nav'>
            {info?.nextmenu?.[0]?.nextmenu?.
                map((item, index) => {

                    return (
                        <div className='item' key={index} >
                            <div className='img' onClick={() => {
  if (!item?.link.includes('http')) {
    toPage(item?.link);
  } else {
    window.open(item?.link);
  } 
}} dangerouslySetInnerHTML={{ __html: item?.img }} ></div>
                            <div className='title' onClick={() => {
  if (!item?.link.includes('http')) {
    toPage(item?.link);
  } else {
    window.open(item?.link);
  } 
}}>
  {item?.menu}
</div>  
{item?.nextmenu?.map(item2 => {
  return <p 
    onClick={() => {
      if (!item2?.link.includes('http')) {
        toPage(item2?.link, item2?.menuby); 
      } else {
        window.open(item2?.link);  
      }
    }}
    key={item2.menuby}
  >
    {item2.menu}
  </p>
})}


                        </div>
                    )
                })}


        </div>
    );
    const aboutPage = (
        <div className='about_nav'>
            {info?.nextmenu?.[2]?.nextmenu?.map((item, index) => {

                return (
                    <div 
  key={index} 
  className='info_nav' 
  onClick={() => {
    if (!item.link.includes('http')) {
      toPage(item.link);
    } else {
      window.open(item.link);
    }
  }} 
>
  {item.menu}
</div>
                )
            })}
        </div>
    );
    const marketsPage = (
        <div className='about_nav'>
            {info?.nextmenu?.[1]?.nextmenu?.map((item, index) => {

                return (
                    <div 
  key={index} 
  className='info_nav' 
  onClick={() => {
    if (!item.link.includes('http')) {
      toPage(item.link);
    } else {
      window.open(item.link);
    }
  }} 
>
  {item.menu}
</div>
                )
            })}
        </div>
    );
    const careerPage = (
        <div className='about_nav'>
            {info?.nextmenu?.[3]?.nextmenu?.map((item, index) => {

                return (
                   <div 
  key={index} 
  className='info_nav' 
  onClick={() => {
    if (!item.link.includes('http')) {
      toPage(item.link);
    } else {
      window.open(item.link);
    }
  }} 
>
  {item.menu}
</div>
                )
            })}
        </div>
    );
    const selectItem = () => {
        switch (porps.type) {
            case 1: return productsPage;
            case 2: return marketsPage;

            case 3: return aboutPage;
            case 4: return careerPage;

        }
    }
    return (
        <div className='nav_bottom'>
            {selectItem()}

        </div>
    )
}
