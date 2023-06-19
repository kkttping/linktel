import React, { useState, useEffect } from 'react'
import './index.scss'
import { Menu, } from 'antd'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Footer from '@/components/Footer'
import NavBottom from '@/pages/Home/NavBottom'
import Http from "@/utils/http";
import x from '@/static/svg/x.svg'
import more from '@/static/svg/more.svg'


export default function Home() {
    const [current, setCurrent] = useState('home');
    const [flag, setFlag] = useState(0);

    const [showmask, setshowmask] = useState(false);
    const [showList, setshowList] = useState([]);
    const [pFlag, setpFlag] = useState(-1);
    const [info, setInfo] = useState([])

    const [currentIndex, setCurrentIndex] = useState(-1);
    const navigate = useNavigate()
    const getParams = useParams();
    const navList = [
        {
            name: 'Home',
            next: 'home'
        },
        {
            name: 'Products',
            next: [
                {
                    name: 'Pluggable Transceiver',
                    next: 'products2/1'
                },
                {
                    name: 'Optical Engine',
                    next: 'products2/2'
                },
                {
                    name: 'Optical Engine',
                    next: 'products2/3'
                }
            ]
        },
        {
            name: 'Markets',
            next: 'markets'
        },
        {
            name: 'About',
            next: [
                {
                    name: 'Company',
                    next: 'company'
                },
                {
                    name: 'Culture',
                    next: 'culture'
                },
                {
                    name: 'Leadership',
                    next: 'leadership'
                },
                {
                    name: 'Investors',
                    next: 'investors'
                },
                {
                    name: 'News',
                    next: 'news'
                }, {
                    name: 'Quality',
                    next: 'quality'
                },
                {
                    name: 'Responsibility',
                    next: 'responsibility'
                },
                {
                    name: 'Contact',
                    next: 'contact'
                },

            ]
        },
        {
            name: 'Career',
            next: 'career'
        },
    ];
    const items = [
        {
            label: 'Home',
            key: 'home',
        },
        {
            label: 'Products',
            key: 'products',
        },
        {
            label: 'Markets',
            key: 'markets',
        }, {
            label: 'About',
            key: 'about',
        }, {
            label: 'Career',
            key: 'career',
        },

    ]
    const menuonClick = (index) => {
        setFlag(0)
        toPage(index.key)
        setCurrent(index.key)
    }
    const toPage = (address) => {
        setshowmask(false);
        navigate('/' + address);
        window.location.reload()

    }
    useEffect(() => {
        if (window.location.hash === '#/home') {
            setCurrent('home')
        } else {
            setCurrent('')
            setFlag(0)
        }
    }, [getParams])

    useEffect(() => {
        getInfo("menu");
        setshowList(navList)
        getNextM()
    }, []);

    const getInfo = async (url) => {
        let res = await Http.to.items(url).readByQuery({
            sort: ['id'],
        });
    }
    const getNextM = async () => {
        let res = await Http.to.items('menu_new').readByQuery({
            sort: ['id'],
        });
        setInfo(res.data);
    }
    const next = (data) => {
        if (data instanceof Array) {
            setshowList(data);
           
        } else {
            toPage(data);
            setshowmask(false);
            setshowList(navList)
            if (data !== 'home') {
                setCurrent('')
            }
        }

    }
    return (
        <div className='page_home'>

            <div className={current === 'home' ? "nav_home blak" : "nav_home"} onMouseEnter={() => { if (current === 'home') { setCurrent(''); setFlag(1); } }} onMouseLeave={() => {
                if (flag === 1) {
                    setCurrent('home')
                }
            }}>
                <div className="tag" onClick={()=>{toPage('home')}}>
                </div>
                <div className="menu">
                    <Menu current={[current]} onClick={menuonClick} mode="horizontal"  >
                        {items.map((item, index) => {
                            return <Menu.Item key={item.key}>
                                <div onMouseOver={() => { setCurrentIndex(index) }}><span >{item.label}</span></div>
                            </Menu.Item>
                        })}
                    </Menu>
                </div>
                <div className='seach_icon_box'><div className="seach_icon" onClick={() => toPage('search')}>
                </div></div>
                <div className="seach_icon2" style={{ backgroundImage: `url(${!showmask ? more : x})` }} onClick={() => { setshowmask(!showmask) }}>
                </div>

                <div ><div style={(currentIndex === 1) ? { height: 'auto', opacity: '1' } : ((currentIndex === 2 || currentIndex === 3 || currentIndex === 4) ? { height: '70px', opacity: '1' } : {})} className='nav_bottom_page'>< NavBottom type={currentIndex} /></div></div>
                <div className='mask' style={{ display: showmask ? 'flex' : 'none' }}>
                    <div className='menutop'>
                        <div className="tag" onClick={()=>{toPage('home')}}>
                </div>
                <div className="menu">
                    <Menu current={[current]} onClick={menuonClick} mode="horizontal"  >
                        {items.map((item, index) => {
                            return <Menu.Item key={item.key}>
                                <div onMouseOver={() => { setCurrentIndex(index) }}><span >{item.label}</span></div>
                            </Menu.Item>
                        })}
                    </Menu>
                </div>
                <div className='seach_icon_box'><div className="seach_icon" onClick={() => toPage('search')}>
                </div></div>
                <div className="seach_icon2" style={{ backgroundImage: `url(${!showmask ? more : x})` }} onClick={() => { setshowmask(!showmask) }}>
                </div>
                    </div>
                    {/* {showList.map((item, index) => {
                        return <div key={index} onClick={() => next(item.next)}>{item.name}</div>
                    })} */}
                    {info?.nextmenu?.map((item, index) => {
                        return (
                            <div key={index} className={ 'title_nav' } onClick={()=>setpFlag(index)} >
                                {item.menu}
                                <div className='nav_box' style={pFlag !== index ? {height:0} : {height:item.nextmenu.length*33+'px'}}>
                                    {item.nextmenu.map((item2, index2) => {
                                        return (
                                            <div key={index2} className='info_nav' onClick={()=>{toPage(item2.link)}}>
                                                {item2.menu}
                                            </div>
                                        )
                                    })}
                                </div>


                            </div>
                        )
                    })}

                </div>
            </div>

            <div className="content_home" onMouseOver={() => { setCurrentIndex(-1) }}>
                <div id={'top'}></div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
