import React, { useState, useRef, useEffect } from 'react'
import './index.scss'
import img_bg from '@/static/img/h1_bg1.jpg'
import img_text1 from '@/static/img/h1_text1.png'
import img_item1 from '@/static/img/h1_item1.jpg'
import img_item2 from '@/static/img/h1_item2.jpg'
import img_item3 from '@/static/img/h1_item3.jpg'
import img_item4 from '@/static/img/h1_item4.jpg'
import img_item5 from '@/static/img/h1_item5.jpg'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import imgitem1 from '@/static/img/item1.png'
import imgitem2 from '@/static/img/item3.png'
import imgitem3 from '@/static/img/item4.png'
import img_item6 from '@/static/img/h1_item6.png'
import svg1 from '@/static/svg/blueRightDir.svg'
import { Parallax } from 'rc-scroll-anim';
import img_bg2 from '@/static/img/h1_bg2.jpg'
import img_bg3 from '@/static/img/h1_bg3.jpg'
import Texty from 'rc-texty';
import { Carousel, Row, Col, Table } from 'antd'
export default function HomePage() {
    const [activtyKey, setActivtyKey] = useState(0);
    const [info, setInfo] = useState({});

    const [infoList, setInfoList] = useState([]);

    const [newInfo, setNewInfo] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pFlag, setpFlag] = useState(0);

    const navigate = useNavigate()

    const carRfe = useRef();
    useEffect(() => {
        getInfo();
        getNews();
        selectChange(0);

    }, []);
    useEffect(() => {
        if (newInfo.length >= 2) {
          const interval = setInterval(() => {
            rotateCols();
          }, 5000);
    
          return () => {
            clearInterval(interval);
          };
        }
      }, [newInfo]);

    const toPage = (address) => {
        navigate('/' + address);
    }
    const selectChange = (index) => {
        setActivtyKey(index);
    }
    useEffect(() => {
        carRfe.current.goTo(activtyKey);

    }, [activtyKey])
    const getInfo = async () => {
        let res = await Http.to.items("banner").readByQuery({
            sort: ['sort'],
            filter: { status: "published" }
        });
        setInfo(res.data[0] ?? {});
        let arr = [];
        res.data.forEach((item) => {
            if (item.status === 'published') {
                arr[item.sort] = item;
            }
        })
        let lastArr = arr.filter(function (el) {

            return el != null;

        });

        let arr2 = []
        lastArr.forEach((item) => {
            if (item.status === 'published') {
                arr2.unshift(item)
            } else {
                arr2.push(item)
            }

        })
        setInfoList(arr2)

        let time = window.setInterval(() => {
            let cur = activtyKey;
            setActivtyKey((activtyKey) => (activtyKey + 1) % lastArr.length);
        }, 6000)
        return () => {
            clearInterval(time);
        }
    }
    const getNews = async () => {
        try {
          // 异步请求获取数据并更新 newInfo 状态
          const res = await Http.to.items('New').readByQuery({
            sort: ['-sort'],
            fields: ['*'],
            filter: { Homepage: 'true', status: 'published', type: 'Exhibition' }
          });
    
          setNewInfo(res.data);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      };
    
      const rotateCols = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % newInfo.length);
      };
    const timeSet = (num) => {
        if (num < 10) {
            return '0' + num;
        }
        return num
    }
    return (
        <div className='home_page'>
            <div className='top_bg'>
                <div className='bg'>
                    <Carousel ref={carRfe} style={{ height: '100%' }} dots={false}  >
                        {
                            infoList.map((item, index) => {
                                return (
                                    <div key={index} className='img_box' >
                                          {(item?.img) && <div className='img_bg' style={{ backgroundImage: `url(${ConstValue.url + "assets/" + item?.img})` }}>
                                                {item?.icon && <div className='text1' style={{ backgroundImage: `url(${ConstValue.url + "assets/" + item?.icon})` }}></div>}
                                            </div>}
                                            {(item?.video) && <video className='img_bg img_video'
                                                loop autoPlay={true} muted src={ConstValue.url + "assets/" + item?.video}>
                                            </video>}

                                        <div className='botom_mask2'>
                                            {
                                                (<div className='info' >
                                                    <div className='time'>
                                                        {activtyKey === index && <Texty type={'bottom'} duration={1000} delay={500} mode={'sync'}>{item?.Subtitle}</Texty>}

                                                    </div>
                                                    <div className='title'>

                                                        {activtyKey === index && <Texty split={(i) => { return i.split(' ').map(j => j + ' ') }} type={'bottom'} duration={1000} delay={500} mode={'sync'}>{item?.title}</Texty>}

                                                    </div>
                                                </div>)
                                            }
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </Carousel ></div >
                <div className='botom_mask'>

                    <div className="select">

                        {infoList.map((item, index) => {
                            return (
                                <div key={index} className={"item "} onClick={() => selectChange(index)}>
                                    <div className={'title_name ' + ((activtyKey === index) ? 'activtyitem' : '')}>{item.menu} <div className='buttom'></div> </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
            <div className='content'>
                {
                    newInfo.length !== 0 && (
                        <div className='event'>
                            <Parallax
                                animation={{ x: 0 }}
                                style={{ transform: 'translateX(-200px)', margin: '0px auto' }}
                                className="code-box-shape"
                            >
                                <div className='title_h1'>
                                    Exhibition
                                </div>
                                <div className='slider'>
                                {newInfo.map((item, index) => (
                        <Col key={index} className={index === currentIndex ? 'active' : 'hidden'}>
                                <Row justify={"center"} className='newstable'>
                                    <Col sm={24} xl={10} className='newstableleft' >
                                        <div className='infomation'>
                                            <div className='title'>
                                                {item?.Title}
                                            </div>
                                            <div className='info' dangerouslySetInnerHTML={{ __html: item?.Exhibition?.replace(/\n/g, "<br/>") }}>
                                            </div>

                                            <span
                                                className='readmore'
                                                onClick={() => {
                                                    if (item?.outlink) {
                                                        const link = item?.outlink.startsWith('http') ? item?.outlink : `/#/${item?.outlink}`;
                                                        window.open(link);
                                                    } else {
                                                        toPage('newsInfo/' + item?.id + '/' + item?.type)
                                                    }
                                                    window.scrollTo(0, 0);
                                                }}
                                            >
                                                READ MORE <span></span>
                                            </span>

                                        </div>
                                    </Col>
                                    <Col sm={24} xl={14} className='newstableright'>
                                        <div className='img_info'>

                                           <div className='img_pri' style={{ backgroundImage: `url(${ConstValue.url + "assets/" + item?.Img})` }}>

                                                <div className='time'>
    <span>{(new Date(item?.date_updated)).getFullYear()}<br /></span>
    <span>{timeSet((new Date(item?.date_updated)).getMonth() + 1)}-{timeSet((new Date(item?.date_updated)).getDate())}</span>
</div>

                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                                </Col>
                    ))}</div>
           
                            </Parallax>

                        </div>
                    )
                }

                <div className='leading' style={{ backgroundImage: `url(${img_bg2})` }}>
                    A Solution and Service Provider <br /> of High Speed Optical I/O Connectivity
                </div>
                <div className='products_item' style={{ backgroundImage: `url(${img_bg3})` }}>
                    <div className='title_h1'>
                        Products
                    </div>

                    <div className={pFlag === 0 ? 'act_img item_img' : 'item_img'} style={{ backgroundImage: `url(${imgitem1})` }}></div>
                    <div className={pFlag === 1 ? 'act_img item_img' : 'item_img'} style={{ backgroundImage: `url(${imgitem2})` }}></div>
                    <div className={pFlag === 2 ? 'act_img item_img' : 'item_img'} style={{ backgroundImage: `url(${imgitem3})` }}></div>

                    <Row justify={"center"}>
                        <Col sm={24} xl={24} xxl={12} >
                            <div className='infomation'>
                                <div className={pFlag === 0 ? 'title' : 'titleb'} onClick={() => setpFlag(0)}>
                                    Pluggable Transceiver 
                                </div>
                                <div className={'info '} style={pFlag === 0 ? { height: '100px' } : {}}>
                                    <a style={{ color: '#6e6e6e' }} href="/#/products2/1" onClick={() => {
                                        document.querySelector('#top').scrollIntoView({
                                            block: 'center'
                                        })
                                    }}>100G/400G/800G/1.6T EML/TFLN/Sipho OSFP/QSFP-DD</a>

                                </div>
                                <div className={pFlag === 1 ? 'title' : 'titleb'} onClick={() => setpFlag(1)}>
                                    Optical Engine
                                </div>
                                <div className={'info '} style={pFlag === 1 ? { height: '100px' } : {}} >
                                    <a style={{ color: '#6e6e6e' }} href="/#/products2/2" onClick={() => {
                                        document.querySelector('#top').scrollIntoView({
                                            block: 'center'
                                        })
                                    }}>In-house Design &amp; Manufacture 100G/λ and 200G/λ Optical Engines with Cutting Edge OE Packaging Capabilities            </a>
                                </div>
                                <div className={pFlag === 2 ? 'title' : 'titleb'} onClick={() => setpFlag(2)}>
                                    NPO/CPO ELSFP & OE Connectivity
                                </div>
                                <div className={'info '} style={pFlag === 2 ? { height: '100px' } : {}} >
                                    <a style={{ color: '#6e6e6e' }} href="/#/products2/3" onClick={() => {
                                        document.querySelector('#top').scrollIntoView({
                                            block: 'center'
                                        })
                                    }}>1.6T/3.2T NPO/CPO Optical Engines Optical/Electrical Hybrid Packaging Platforms</a>
                                </div>
                                {/* <div className='info2'>
                                    Optical Engine<br />
                                    NPO or CPO
                                </div> */}
                            </div>
                        </Col>
                        <Col sm={24} xl={24} xxl={12} >
                            <div className='box'></div>
                        </Col>
                    </Row>
                </div>
                <div className='link'>
                    <div className='title_h1'>
                        Members of
                    </div>
                    <Row justify={'center'}>
                        <Col>
                            <Row justify={'center'} className='homelogoul' >
                                <Col>
                                    <div className='link_img' style={{ backgroundImage: `url(${img_item2})` }}></div>
                                </Col>
                                <Col>
                                    <div className='link_img' style={{ backgroundImage: `url(${img_item3})` }}></div>

                                </Col>
                                <Col>
                                    <div className='link_img' style={{ backgroundImage: `url(${img_item4})` }}></div>

                                </Col>
                                <Col>
                                    <div className='link_img' style={{ backgroundImage: `url(${img_item5})` }}></div>

                                </Col>
                            </Row>
                        </Col>
                        
                    </Row>
                </div>
            </div>
        </div>
    )
}