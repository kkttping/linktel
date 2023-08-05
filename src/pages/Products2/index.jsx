import { Menu, Row, Col,Empty  } from 'antd'
import { useNavigate } from "react-router-dom";
import imgBg from '@/static/img/bg_2.jpg'
import TopInfo from '@/components/TopInfo'
import NavLink from '@/components/NavLink'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import './index.scss'
export default function Products2() {
    const navigate = useNavigate()
    const getParams = useParams();
    const [info, setInfo] = useState({});
    const [info2, setInfo2] = useState([]);
    const [info3, setInfo3] = useState([]);

    const [curr, setcurr] = useState('');
    const [curr2, setcurr2] = useState(0);

    const [currid, setcurrid] = useState('');

    const toProducts3 = (id) => {
        navigate('/products3/' + id + '/' + getParams?.id);
    }
    const toPage = (address, routerName) => {
        navigate('/' + address);
    }
    useEffect(() => {
        getInfo();
        getInfo2();
    }, []);
    useEffect(() => {
        getInfo3();
        // navigate('/products2/'+getParams?.id)
        console.log(curr);
    }, [curr]);
    const getInfo = async () => {
        let res = await Http.to.items("CLASSIFICATION/" + getParams?.id).readByQuery({
            sort: ['id'],
        });
        setInfo(res.data)
    }
    const getInfo2 = async () => {
        let res = await Http.to.items("product_category").readByQuery({
            fields: ['*'],
            filter:{superior:getParams?.id+"",status:"published"}
        });
        setInfo2(res.data);
        if (getParams?.itemId) {
            res.data.some((item,index)=>{
                if(item.name===getParams?.itemId){
                    setcurr(item?.id + '');
                    setcurr2(index)
                    return true
                }
            })
        } else {
            setcurr(res.data[0].id + '');

        }
        getInfo3(res.data[0].id, getParams?.id)

    }
    const getInfo3 = async (id1, id2) => {
        if (getParams?.itemId !== undefined) id1 = getParams?.itemId;
        if (!getParams?.id) return
        if (curr === '') return

        let res = await Http.to.items("Pluggable_Transceiver").readByQuery({
            fields: ['*'],
            filter: { 'Advanced_category': getParams?.id, category: curr,status:"published" }
        });
        setInfo3(res.data)
    }
    const menuonClick = (index) => {
        setcurr(index.key);
    }
    const navInfo = {
        '1': 'Pluggable Transceiver',
        '2': 'Optical Engine',
        '3': 'NPO/CPO ELSFP & OE Connectivity'
    }
    return (
        <div className='products2'>
            <TopInfo imgBg={ConstValue.url + "assets/" +info?.topimg} title={info?.name} styleSelf={{ bgColor: '#000', height: '400px' }} info1={''} info2={''} />
            <NavLink title1={'Products'} link1={() => { toPage('products') }} title2={navInfo[getParams?.id]} />

            <div className="info">
            {info?.text && (
  <div className='infoma' dangerouslySetInnerHTML={{ __html: info.text }}></div>
)}
                {/* <div className='title'>
                    Linktel’s family of 800G transceivers accelerate data connectivity for data center Interconnection and Metro Networks. Our complete product line includes OSFP 2xFR4，OSFP 2xLR4，QSFP-DD DR8，QSFP-DD DR8+
                </div>
                <div className="infomation">
                    Linktel’s family of 800G transceivers accelerate data connectivity for data center Interconnection and Metro Networks. Our complete product line includes OSFP 2xFR4，OSFP 2xLR4，QSFP-DD DR8，QSFP-DD DR8+，QSFP-DD DR8++ series for applications up to 800 Gb/s. Each transceiver solution leverages Linktel's optoelectronic Integration technology for the transmission of data while reducing the size and power dissipation of traditional high speed design.
                </div> */}
                <div className='select' id='select'>

                    <Menu  selectedKeys={[curr]} mode="horizontal" >
                        {info2.map((item, index) => {
                            return (<Menu.Item key={item.id} >
                                <span onClick={() => {setcurr(item.id+'');setcurr2(index);document.getElementById('select').scrollIntoView();navigate('/products2/'+getParams?.id+'/'+item.name) }}>{item.name}</span>
                            </Menu.Item>)
                        })}
                    </Menu>
                </div>
            </div>
            <div className="solutions">
                <Row justify={'center'}>
                    <Col sm={24} xl={12} className="productleft">
                        <div className="solution" dangerouslySetInnerHTML={{ __html: info2?.[curr2]?.text }}>

                            {/* <span className='title'>1G solutions</span> */}
                            {/* <span className='item1'>Linktel’s family of 800G transceivers accelerate data connectivity for data center Interconnection and Metro Networks. Our complete product line includes OSFP 2xFR4，OSFP 2xLR4，QSFP-DD DR8，QSFP-DD DR8+</span> */}
                            {/* <span className='item2'>Linktel’s family of 800G transceivers accelerate data connectivity for data center Interconnection and Metro Networks. Our complete product line includes OSFP 2xFR4，OSFP 2xLR4，QSFP-DD DR8，QSFP-DD DR8+，QSFP-DD DR8++ series for applications up to 800 Gb/s. Each transceiver solution leverages Linktel's optoelectronic Integration technology for the transmission of data while reducing the size and power dissipation of traditional high speed design.</span> */}
                        </div> 
                    </Col>
                    <Col sm={24} xl={12} className="productright">
                        <div className='items'>
                            {info3.map((item, index) => {
                                return (
                                    <div key={index} className='item'>
                                        <Row justify={'center'}>
                                            <Col>
                                                <div className='img' style={{backgroundImage:`url(${ConstValue.url + "assets/"+item?.image})`}}></div>
                                            </Col>
                                            <Col>
                                                <div className='info_item'>
                                                    <span>{item?.name}</span>
                                                    <span dangerouslySetInnerHTML={{ __html: item?.description }}></span>
                                                    <span className='readmore' onClick={() => {
                                                        toProducts3(item?.id); // retain the original action
                                                        document.querySelector('#top').scrollIntoView(); // scroll to #top
                                                    }}>READ MORE<span></span></span>

                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })}
                            {info3?.length===0&&<Empty></Empty>}
                        </div>
                    </Col>
                </Row>


            </div>
        </div>
    )
}
