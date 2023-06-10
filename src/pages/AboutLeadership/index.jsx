import React, { useState, useEffect, useRef } from 'react'
import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/al_bg1.jpg'
import NavLink from '@/components/NavLink'
import AboutNav from '@/components/AboutNav'
import { Modal, Row, Col } from 'antd'
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
    const [data, setData] = useState({});
    const [isModalOpen, setisModalOpen] = useState(false);

    const [leadershipListType, setLeadershipListType] = useState([]);

    const navigate = useNavigate()
    const toPage = (address, routerName) => {
        navigate('/' + address);
    }
    const carRfe = useRef();

    const add = () => {
        if (imgSelect >= leadershipList.length - 1) return;
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
        getInfoType();
    }, []);

    const getInfo = async () => {
        let res = await Http.to.items("Leadership").readByQuery({
            sort: ['id'],
        });
        setLeadershipList(res.data)
    }
    const getInfoType = async () => {
        let res = await Http.to.items("Management_team").readByQuery({
            sort: ['sort'],
        });
        setLeadershipListType(res.data);
        console.log(res);
    }
    const CardItem = (text1) => {
        let temp = 0;
        leadershipList.map((item) => {
            if (item.Position === text1) {
                temp++
            }

        })
        if (temp === 0) {
            return
        }
        return (
            <div className='leader_item'>
                <div className='title'>{text1}</div>
                <div>
                    <Row justify={"center"}>
                        {leadershipList.map((item, index) => {
                            if (item.Position === text1) {
                                return (
                                    <Col key={index}>
                                        <div className='item'>
                                            <div className='img'>
                                                <img src={ConstValue.url + "assets/" + item?.Img} alt="" />
                                            </div>
                                            <div className='infomation2'>
                                                <div className='position'>{item?.Position}</div>
                                                <div className='name'>{item?.Name}</div>
                                                <div className='info'>{item?.Introduce}</div>
                                                <span onClick={() => { setisModalOpen(true); setData(item) }}>READ MORE</span>
                                            </div>
                                        </div>
                                    </Col>

                                )
                            }
                        })}

                    </Row>
                </div>
            </div>
        )
    }
    const handleCancel = () => {
        setisModalOpen(false);
    }
    return (
        <div className='about_leadership'>
            <TopInfo imgBg={imgBg} title={'Leadership'} styleSelf={{ bgColor: '#000' }} info1={'A Solution and Service Provider'} info2={'of High Speed Optical I/O Connectivity'} />
            <NavLink title1={'About'} link1={() => { toPage('about') }} title2={'Leadership'} />
            <AboutNav />
            <div className='content'>
                {leadershipListType.map((item, index) => {

                    return <div key={index}>{CardItem(item.classification)}</div>
                })}


            </div>
            <Modal open={isModalOpen} onCancel={handleCancel} footer={[]} width={837.55}>
                <div className='content_modal'>
                    <div className='top'></div>
                    <div className='modal_content'>
                        <div className='img'>
                            <img src={ConstValue.url + "assets/" + data?.Img} alt="" />
                        </div>
                        <div className='infomation2'>
                            <div className='modal_name'>{data?.Name}</div>
                            <div className='modal_position'>{data?.Position}</div>

                            <div className='modal_info'>{data?.Introduce}</div>
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    )
}
