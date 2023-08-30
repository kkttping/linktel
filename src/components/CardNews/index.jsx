import React from 'react'
import { Menu, Row, Col } from 'antd'

import './index.scss'
export default function CardNews(props) {
    const{title,infoList,img,link,outlink}=props
    return (
        <div className='card_news'>
            <Row justify={'center'} className='newstable'>
                <Col className='newsleft'>
                    <div className='infomation'>
                        <div className='title' >{title}</div>
                        <div className='info'>
  {infoList?.map(item => {
    return (
      <span key={item} 
        dangerouslySetInnerHTML={{__html: item }} 
      />
    )
  })}
</div>
                        <span className='readmore' onClick={() => {
                        link(); // 执行原有onclick事件
                        document.querySelector('#top').scrollIntoView(); // 滚动到#top
                        }}>READ MORE<span></span></span>  
                    </div>
                </Col>
                <Col className='newsright'>
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
