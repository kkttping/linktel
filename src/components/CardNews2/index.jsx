import React from 'react'
import { Menu, Row, Col } from 'antd'
import imgBg2 from '@/static/img/an_item2.jpg'

import './index.scss'
export default function CardNews2(props) {
    const { title, infoList, img, time,link } = props
    return (
        <div className='card_news'>
            <Row className='newstable' justify={'center'}  onClick={() => {
                        link(); // 执行原有onclick事件
                        document.querySelector('#top').scrollIntoView(); // 滚动到#top
                        }}>
              <div className='newsleft'>  {time && 
                (<Col >
                    <div className='time'>
                        <span>{time?.[0]} <br/></span>
                        <span>{time?.[1]}</span>
                    </div>
                    
                </Col>)
                }
                <Col >
                <div className='infomation' style={{maxWidth:time?'700px':'1000px'}}>
                        <div className='title' style={{maxWidth:time?'700px':'850px'}}>{title}</div>
                        <div className='info' style={{maxWidth:time?'700px':'850px'}}>
                            {infoList?.map(item => {
                                return (<span key={item}>{item} <br /></span>)
                            })}
                        </div>
                        <span className='readmore' >READ MORE<span></span></span>

                    </div>
                 </Col>
               </div> 
                <Col className='newsright'>
                    <div className='img'>
                        <img src={img} alt="" />
                    </div>
                </Col>
            </Row>


        </div>
    )
}
