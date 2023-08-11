import React, { useState, useEffect } from 'react'
import imgBg from '@/static/img/ah_bg1.jpg'
import TopInfo from '@/components/TopInfo'
import { Menu, Row, Col } from 'antd'
import imgitem1 from '@/static/img/ah_item1.jpg'
import imgitem2 from '@/static/img/ah_item2.jpg'
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
            sort: ['sort'],
            filter: {
                Recommend
                    :
                    true, status
                    :
                    "published"
            }
        });
        let res2 = await Http.to.items('New').readByQuery({
            sort: ['-sort', 'date_updated'],
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
            <TopInfo imgBg={imgBg} title={'About'} info1={'LINK TO THE UNKNOWN'} info2={' '} />
            <div className='content'>
                <Row justify={"center"} className='card_two'>
                    <Col sm={24} xl={12} >
                        <div className='card_item'>
                            <CardProducts link={() => { toPage('company', 'about') }} img={imgitem1} styleSelf={{ color: '#fff', objectfit: 'cover' }} titleout={'Company '} titleIn={'Company '} info={['Linktel Technologies was founded in 2011, and through more than a decade of rapid development, the company has become one of the mainstream optical component and transceiver suppliers in the world.']} ></CardProducts>
                        </div>
                    </Col>
                    <Col sm={24} xl={12} >
                        <div className='card_item'>
                            <CardProducts link={() => { toPage('culture', 'about') }} img={imgitem2} styleSelf={{ color: '#fff', objectfit: 'cover' }} titleout={'Culture '} titleIn={'Culture '} info={['Become a world leading provider of integrated optical I/O Connectivity Solution and Service']}></CardProducts>
                        </div>
                    </Col>
                </Row>
                <div className='leadership'>
                    <Row justify={"center"}>
                        <Col sm={24} xl={12} >
                            <div className='human_img'>
                                {leadershipList.length !== 0 && <img src={ConstValue.url + "assets/" + leadershipList[imgSelect]?.Img} alt="" />}
                                <div className='name namefff'>
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
                                    <span className='readmore' onClick={() => { toPage('leadership', leadershipList[imgSelect]?.id); window.scrollTo(0, 0); }}>READ MORE<span></span></span>

                                </div>
                                <div className="select_img">
                                    {leadershipList.map((item, index) => {
                                        return (
                                            <div 
  key={index} 
  className={imgSelect === index ? 'select_img activty' : 'select_img'}
  onClick={() => {
    setImgSelect(index);
   
  }} 
>
  <img src={ConstValue.url + "assets/" + item?.Thumbnail} alt="" />
</div>

                                        )
                                    })}

                                    <div className='img' onClick={() => { toPage('leadership', 'about') ; window.scrollTo(0, 0); }}></div>
                                </div>
                            </div>
                        </Col>
                    </Row>


                </div>
                <div style={{width:'100vw'}}>
                    <Row justify={"center"}>
                        <Col sm={24} xl={12} className='about_card_newsquality'  >
                            <Row>
                               
                                <Col xs={24} lg={12} xl={12} className='card_about_News'>
                                    <div className='card_item card_newsnew' >
                                        {news && (
                                            <div className='news' >
                                                <div className='news_title'>News</div>
                                                <div className='time'>{[`${timeSet((new Date(news?.date_updated)).getMonth()+1)}-${timeSet((new Date(news?.date_updated)).getDate())}`, ',', (new Date(news?.date_updated)).getFullYear()]}</div>
                                                <div className='news_info'>{news
                                                    .Title
                                                }</div>
                                               <span 
  className='readmore' 
  onClick={() => {
    if (news.outlink) {
      const link = news.outlink.startsWith('http') ? news.outlink : `/#/${news.outlink}`;
      window.open(link);
    } else {
      toPage2('newsInfo', news.id + '/' + news.type); 
    }
    window.scrollTo(0, 0);
  }}
>
  READ MORE <span></span>
</span>
                                            </div>
                                        )}

                                    </div>
                                </Col>
                                 <Col sm={24} xl={12}   className='card_about_quality' >
                            <div className='card_item'>
                                <CardProducts link={() => { toPage('quality', 'about'); window.scrollTo(0, 0); }} img={imgitem7} styleSelf={{ color: '#fff', objectfit: 'cover' }} titleout={'Quality'} titleIn={'Quality'} info={['Linktel, ISO9001 and ISO14001 certified, has well-established quality control system and MES production execution system in place to ensure product quality stable, consistent and reliable. ']}></CardProducts>
                            </div>
                        </Col>
                            </Row>
                        </Col>

                       
                    </Row>
                </div>

                <div className='earth'>
                    <Row justify={"center"} className='card_two'>
                        <Col sm={24} xl={12} >
                            <div className='card_item_bottom'>
                                <div className='responsibility_title'>
                                    Responsibility
                                </div>
                                <div className='responsibility_info'>
                                    We focus on the sustainable development of society and ecology, striving to become a global enterprise with social responsibility
                                <span className='readmore' onClick={() => { toPage('responsibility', 'about') ; window.scrollTo(0, 0);}}>READ MORE<span> </span></span>
                                </div>
                                

                            </div>
                        </Col>
                        <Col sm={24} xl={12} >
                            <div className='card_item_bottom'>
                                <div className='contact_title'>
                                    Contact
                                </div>
                                <div className='contact_info'>
                                     Linktel USA<br />
                                    Linktel Malaysia<br />
                                    Linktel China<br />
                                   
                                 <span className='readmore' onClick={() => { toPage('contact', 'about'); window.scrollTo(0, 0); }}>READ MORE<span></span></span>
                                </div>
                                
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
