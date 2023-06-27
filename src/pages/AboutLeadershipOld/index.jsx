import React, { useState, useEffect, useRef } from 'react'
import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/al_bg1.jpg'
import NavLink from '@/components/NavLink'
import AboutNav from '@/components/AboutNav'
import { Carousel, Row, Col } from 'antd'
import imgitem3 from '@/static/img/ah_item3.jpg'
import imgPerson from '@/static/img/al_item1.jpg'
import rightDir from '@/static/svg/right_dir2.svg'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import './index.scss'
import { useNavigate } from "react-router-dom";

export default function AboutLeadership() {
    const [imgSelect, setImgSelect] = useState(0);
    const [leadershipList, setLeadershipList] = useState([]);
    const navigate = useNavigate()
    const toPage = (address, routerName) => {
        navigate('/' +address);
    }
    const carRfe = useRef();

    const add = () => {
        if (imgSelect >= leadershipList.length-1) return;
        setImgSelect(imgSelect + 1);
        selectChange(imgSelect + 1)
    }
    const mius = () => {
        if (imgSelect <= 0) return;
        setImgSelect(imgSelect - 1);
        selectChange(imgSelect - 1)

    }
    const selectChange = (index) => {
        carRfe.current.goTo(index);
    }
    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        let res = await Http.to.items("Leadership").readByQuery({
            sort: ['id'],
        });
        setLeadershipList(res.data)
    }

    return (
        <div className='about_leadership'>
            <TopInfo imgBg={imgBg} title={'Leadership'} styleSelf={{ bgColor: '#000' }} info1={'LINK TO THE UNKNOWN'} info2={' '} />
            <NavLink title1={'About'} link1={()=>{toPage('about')}} title2={'Leadership'}/>
            <AboutNav />
            <div className='content'>
                <Row justify={"center"}>
                    <Col sm={24} xl={12} >
                        <div className='human_img'>
                            {/* <img src={imgitem3} alt="" /> */}
                            <div className='bg'>
                                <Carousel ref={carRfe} style={{ height: '100%' }} dots={false}  >
                                    {leadershipList.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <img src={ConstValue.url + "assets/" + item?.Img} alt="" />
                                            </div>
                                        )
                                    })}

                                </Carousel >
                            </div >
                            <div className='name'>
                            {leadershipList[imgSelect]?.Position}
                                <div className='select_control'>
                                    <div className={'left'} onClick={mius} style={{ opacity: imgSelect === 0 ? 0.3 : 1 }} >
                                        <img src={rightDir} alt="" />
                                    </div>
                                    <div className='right' onClick={add} style={{ opacity: imgSelect === leadershipList.length-1 ? 0.3 : 1 }}>
                                        <img src={rightDir} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={24} xl={12} >
                        <div className='infomation'>
                            <div className="name"><div className='person_svg'></div>{leadershipList[imgSelect]?.Name}</div>
                            <div className='info'>
                                <div dangerouslySetInnerHTML={{ __html: leadershipList[imgSelect]?.Introduce?.replace(/\n/g, "<br/>") }}></div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="select">
                    {leadershipList.map((item, index) => {
                        return (
                            <div key={index} className={imgSelect === index ? 'select_img activty' : 'select_img'} onClick={() => { setImgSelect(index); selectChange(index) }}><img src={ConstValue.url + "assets/" + item?.Thumbnail} alt="" /><span>{item?.Name}</span></div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}
