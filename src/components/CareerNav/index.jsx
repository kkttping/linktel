import React,{useState,useEffect} from 'react'
import { Menu, Row, Col } from 'antd'
import { Outlet, useNavigate,useLocation } from 'react-router-dom';

import './index.scss'
export default function CareerNav() {
    const [nav,setNav]=useState('');
    const navigate = useNavigate()
    useEffect(()=>{
       let infoArr= window.location.hash.split('/');
       if(infoArr.length===0)return;
       setNav(infoArr[infoArr.length-1])
    },[])
    const menuonClick = (index) => {
        toPage(index.key)
        setNav(index.key)
    }

    const toPage = (address) => {
        navigate('/' + address);
    }
    return (

        <div className='career_nav'>

            <div className='select'>
                <Row justify={'center'}>
                    <Col xs={24} md={22} xl={16} xxl={12}>
                        <Menu onClick={menuonClick} mode="horizontal" selectedKeys={[nav]} >
                            <Menu.Item key="message" >
                                <span>Words from CEO</span>
                            </Menu.Item>
                            <Menu.Item key="workAtLinktel" >
                                <span>Work At Linktel</span>
                            </Menu.Item>
                            <Menu.Item key="opportunities" >
                                <span>Job opportunities</span>
                            </Menu.Item>
                            
                        </Menu>
                    </Col>
                </Row>

            </div>
        </div>
    )
}
