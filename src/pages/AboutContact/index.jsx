import React, { useEffect, useState, useRef } from 'react'
import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/ah_bg2.jpg'
import NavLink from '@/components/NavLink'
import AboutNav from '@/components/AboutNav'
import CardPersonInfo from '@/components/CardPersonInfo'
import { Button, message, Form, Input, Spin } from 'antd';
// import BMap  from 'BMap';
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { useNavigate } from "react-router-dom";

import './index.scss'
let googleMap = window.google && window.google.maps;
export default function AboutContact() {
    const [mapList, setMapList] = useState([]);
    const [linkList, setLinkList] = useState([]);
    const [loadFlag, setloadFlag] = useState(false);

    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const toPage = (address, routerName) => {
        navigate('/' + address);
    }
    const [selectMap, setSelectMap] = useState(0);

    const onFinish = async (values) => {
        setloadFlag(true)
        messageApi.open({
            key: 'updatable',
            type: 'loading',
            content: 'Loading...',
        });
        try {
            let res = await Http.to.items("message").createOne({
                ...values

            });
            setloadFlag(false)

            if (res) {
                formRef.current?.resetFields()
                messageApi.open({
                    key: 'updatable',
                    type: 'success',
                    content: 'success!',
                    duration: 2,
                })
            }
        } catch (e) {
            setloadFlag(false)

            messageApi.open({
                key: 'updatable',
                type: 'error',
                content: 'error',
            });
        }

    };
    const onFinishFailed = (errorInfo) => {
    };
    const mapRef = useRef()
    const formRef = useRef()

    useEffect(() => {
        // var map = new BMap.Map("mapCurrent"); // 创建Map实例
        // map.centerAndZoom(new BMap.Point(103.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        // map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        // map.setCurrentCity(""); // 设置地图显示的城市 此项是必须设置的
        // map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        // console.log(map);
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDVTk78W-PvhqUC08l6MBqUHTjJXSGcP4g&libraries=places&language=en-US';
        document.getElementById('root').appendChild(script);
        script.onload = () => {
             googleMap = window.google && window.google.maps;
            if (googleMap == undefined) return
            let mapProp = {
                center: new googleMap.LatLng(0, 0),
                zoom: 14,
                mapTypeId: googleMap.MapTypeId.ROADMAP,
            };
            mapRef.current = new googleMap.Map(document.getElementById("mapCurrent"), mapProp);
        }


    }, [])
    useEffect(() => {
        getMapInfo();
        getInfo();
    }, []);
    useEffect(() => {
        if (mapList.length === 0) return
        mapRef.current?.setCenter(new googleMap.LatLng(mapList[selectMap]?.Positioning?.coordinates[1], mapList[selectMap]?.Positioning?.coordinates[0]))
    }, [selectMap])
    const getMapInfo = async () => {
        let res = await Http.to.items("office").readByQuery({
            sort: ['sort'],
            filter: { 'status': 'published', }
        });
        setMapList(res.data)
        res.data.forEach((item, index) => {
            if (index === 0) {
                mapRef.current?.setCenter(new googleMap.LatLng(item?.Positioning?.coordinates[1], item?.Positioning?.coordinates[0]))
            }
            if (googleMap === undefined) return
            new googleMap.Marker({
                position: {
                    lat: item?.Positioning?.coordinates[1]
                    , lng: item?.Positioning?.coordinates[0]
                },
                map: mapRef.current,
                title: ''

            });
        })
    }


    const getInfo = async () => {
        let res = await Http.to.items("Marketing_").readByQuery({
        });
        setLinkList(res.data)
    }
    return (
        <div className='about_contact'>
            {/* <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDVTk78W-PvhqUC08l6MBqUHTjJXSGcP4g&libraries=places&language=en-US"></script> */}
            {contextHolder}
            <TopInfo imgBg={imgBg} title={'Contact'} styleSelf={{ bgColor: '#000' }} info1={'LINK TO THE UNKNOWN'} info2={' '} />
            <NavLink title1={'About'} link1={() => { toPage('about') }} title2={'Contact'} />
            <AboutNav />
            <div className='content'>
                <div className='map' >
                    <div id='mapCurrent' ></div>
                    <div className="link">
                        {mapList.map((item, index) => {
                            return <div className={index === selectMap ? 'act' : ''} key={index} onClick={() => { setSelectMap(index) }}>{item?.Office}</div>
                        })}

                    </div>
                    <div className='content_info'>
                        <div className="title">
  {mapList[selectMap]?.Company && <div>{mapList[selectMap]?.Company}</div>}
</div>
{
  mapList[selectMap]?.Address && 
  <div className="address">
    <div className='svg_address'></div>
    <div style={{width: '90%'}} >{mapList[selectMap]?.Address}</div>
  </div> 
}
{
  mapList[selectMap]?.Phone &&
  <div className="phone">
    <div className='svg_phone'></div>
    <div style={{width: '90%'}} >{mapList[selectMap]?.Phone}</div>
  </div>
}  
{
  mapList[selectMap]?.Email && 
  <div className="email">
    <div className='svg_email'></div>
    <div style={{width: '90%'}} >{mapList[selectMap]?.Email}</div>
  </div> 
}
                    </div>
                </div>
                <div className='infomation'>
                    <div className="content_title">
                        Sales & Marketing
                    </div>
                    {linkList.map((item, index) => {
  if (item?.status === 'published') {
    return (
      <div key={index} className='person_info'> 
        <CardPersonInfo
          title={item?.Project}
          name={item?.contacts}
          phone={item?.Phone}
          email={item?.Email} 
        />  
      </div>
    )
  }
})}

                    <div className="content_title">
                        Leave Your Message
                    </div>
                    <div className='form'>
                        <Form
                            name="basic"
                            ref={formRef}
                            style={{
                                Width: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Name!',
                                    },
                                ]}
                            >
                                <Input placeholder={"Your Name"} />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Your Email" />
                            </Form.Item>
                            <Form.Item
                                name="message"

                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Message!',
                                    },
                                ]}
                            >
                                <Input.TextArea placeholder="Your Message" />
                            </Form.Item>
                            <Form.Item

                            >
                                <Button type="primary" htmlType="submit">
                                    {loadFlag ? <Spin></Spin> : 'Submit'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}