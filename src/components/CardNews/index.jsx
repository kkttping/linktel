import React from 'react'
import { Menu, Row, Col } from 'antd'
import imgBg2 from '@/static/img/an_item2.jpg'

import './index.scss'
export default function CardNews(props) {
    const{title,infoList,img,link}=props
    return (
        <div className='card_news'>
            <Row justify={'center'}>
                <Col>
                    <div className='infomation'>
                        <div className='title'>{title}</div>
                        <div className='info'>
                            {infoList?.map(item=>{
                                return (<span key={item}>{item} <br/></span>)
                            })}
                            </div>
                        <span onClick={link}>READ MORE</span>

                    </div>
                </Col>
                <Col>
                    <div className='img'>
                        <img src={img} alt="" />
                        {/* <div className='news_card'>
                            <img src={imgBg2} alt="" />
                        </div> */}
                    </div>
                </Col>
            </Row>


        </div>
    )
}
