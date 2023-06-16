import React, { useState, useEffect } from 'react'
import imgBg from '@/static/img/ah_bg1.jpg'
import TopInfo from '@/components/TopInfo'
import { Menu, Row, Col } from 'antd'
import imgitem1 from '@/static/img/ah_item1.jpg'
import imgitem2 from '@/static/img/ah_item2.jpg'
import imgitem3 from '@/static/img/ah_item3.jpg'
import imgitem4 from '@/static/img/ah_item4.jpg'
import imgitem6 from '@/static/img/ah_item6.jpg'
import imgitem7 from '@/static/img/ah_item7.jpg'

import imgText from '@/static/img/ah_text1.jpg'
import imgPerson from '@/static/img/ah_person1.jpg'

import CardProducts from '@/components/CardProducts'
import { useNavigate } from "react-router-dom";
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import './index.scss'
export default function AboutHome() {
    const [imgSelect, setImgSelect] = useState(0);
    const [leadershipList, setLeadershipList] = useState([]);
    const [news, setnews] = useState('');

    const navigate = useNavigate()


    const toPage = (address, routerName) => {
        navigate('/' + address);
    }
    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        let res = await Http.to.items("Leadership").readByQuery({
            sort: ['id'],
            filter: {
                Recommend
                    :
                    true, status
                    :
                    "published"
            }
        });
        let res2 = await Http.to.items('New').readByQuery({
            sort: ['id'],
            filter: {
                type
                    :
                    "Event", status: "published"
            }
        });
        setnews(res2.data?.[res2.data.length - 1])
        setLeadershipList(res.data)
    }
    const toPage2 = (address, info) => {
        navigate('/' + address + '/' + info);
    }
    const timeSet = (num) => {
        if (num < 10) {
            return '0' + num;
        }
        return num
    }
    return (
        <div className='about_home'>
            <TopInfo imgBg={imgBg} title={'About'} info1={'A Solution and Service Provider'} info2={'of High Speed Optical I/O Connectivity'} />
            <div className='content'>
                <Row justify={"center"}>
                    <Col sm={24} xl={12} >
                        <div className='card_item'>
                            <CardProducts link={() => { toPage('company', 'about') }} img={imgitem1} styleSelf={{ color: '#fff', objectfit: 'cover' }} titleout={'Company '} titleIn={'Company '} info={['12312313虚拟文字']} ></CardProducts>
                        </div>
                    </Col>
                    <Col sm={24} xl={12} >
                        <div className='card_item'>
                            <CardProducts link={() => { toPage('culture', 'about') }} img={imgitem2} styleSelf={{ color: '#fff', objectfit: 'cover' }} titleout={'Culture '} titleIn={'Culture '} info={['12312313虚拟文字']}></CardProducts>
                        </div>
                    </Col>
                </Row>
                <div className='leadership'>
                    <Row justify={"center"}>
                        <Col sm={24} xl={12} >
                            <div className='human_img'>
                                {leadershipList.length !== 0 && <img src={ConstValue.url + "assets/" + leadershipList[imgSelect]?.Img} alt="" />}
                                <div className='name'>
                                    <img src={imgText} alt="" />
                                </div>
                            </div>
                        </Col>
                        <Col sm={24} xl={12} >
                            <div className='info'>
                                <div className="text">
                                    <div className='leadership_type'>Leadership</div>
                                    <div className='leadership_name'><div className='person_svg'></div>{leadershipList[imgSelect]?.Name}</div>
                                    <div className='leadership_work'>{leadershipList[imgSelect]?.Position}</div>
                                    <div className='leadership_info' dangerouslySetInnerHTML={{ __html: leadershipList[imgSelect]?.Introduce?.replace(/\n/g, "<br/>") }}></div>
                                    <span className='readmore' onClick={() => { toPage('leadership', leadershipList[imgSelect]?.id) }}>READ MORE<span></span></span>

                                </div>
                                <div className="select_img">
                                    {leadershipList.map((item, index) => {
                                        return (
                                            <div key={index} className={imgSelect === index ? 'select_img activty' : 'select_img'} onClick={() => setImgSelect(index)}><img src={ConstValue.url + "assets/" + item?.Thumbnail

                                            } alt="" /></div>

                                        )
                                    })}

                                    <div className='img' onClick={() => { toPage('leadership', 'about') }}><img src={imgitem4} alt="" /></div>
                                </div>
                            </div>
                        </Col>
                    </Row>


                </div>
                <div style={{width:'100vw'}}>
                    <Row justify={"center"}>
                        <Col sm={24} xl={12} >
                            <Row>
                                <Col xs={24} lg={12} xl={12} >
                                    <div className='card_item' style={{width:'100vw'}}>
                                        <CardProducts link={() => { }} img={imgitem6} styleSelf={{ color: '#fff', objectfit: 'cover' }} titleout={'Investors'} titleIn={'Investors'} info={['12312313虚拟文字']} ></CardProducts>
                                    </div>
                                </Col>
                                <Col xs={24} lg={12} xl={12} >
                                    <div className='card_item' style={{width:'100vw'}}>
                                        {news && (
                                            <div className='news' >
                                                <div className='news_title'>News</div>
                                                <div className='time'>{[`${timeSet((new Date(news?.date_created)).getMonth())}-${timeSet((new Date(news?.date_created)).getDay())}`, ',', (new Date(news?.date_created)).getFullYear()]}</div>
                                                <div className='news_info'>{news
                                                    .Title
                                                }</div>
                                                <span className='readmore' onClick={() => toPage2('newsInfo', news.id + '/' + news.type)}>READ MORE<span></span></span>
                                            </div>
                                        )}

                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        <Col sm={24} xl={12} >
                            <div className='card_item'>
                                <CardProducts link={() => { toPage('quality', 'about') }} img={imgitem7} styleSelf={{ color: '#fff', objectfit: 'cover' }} titleout={'Quality'} titleIn={'Quality'} info={['12312313虚拟文字']}></CardProducts>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='earth'>
                    <Row justify={"center"}>
                        <Col sm={24} xl={12} >
                            <div className='card_item_bottom'>
                                <div className='responsibility_title'>
                                    Responsibility
                                </div>
                                <div className='responsibility_info'>
                                    Linktel and MultiLane Showcase a 2xFR4 OSFP Transceiver Demo with Live 800G BERT Traffic at OFC 2022
                                </div>
                                <span className='readmore' onClick={() => { toPage('responsibility', 'about') }}>READ MORE<span> </span></span>

                            </div>
                        </Col>
                        <Col sm={24} xl={12} >
                            <div className='card_item_bottom'>
                                <div className='contact_title'>
                                    Contact
                                </div>
                                <div className='contact_info'>
                                    Headquarters<br />
                                    Linktel USA<br />
                                    Linktel Malaysia
                                </div>
                                <span className='readmore' onClick={() => { toPage('contact', 'about') }}>READ MORE<span></span></span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
