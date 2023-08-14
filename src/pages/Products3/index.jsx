import React, { useState, useEffect, useRef } from 'react'
import './index.scss'
import img_bg from '@/static/img/bg_3.jpg'
import { Carousel, Row, Col, Table, message,Button } from 'antd'
import NavLink from '@/components/NavLink'
import { useParams } from 'react-router-dom';
import Http from "@/utils/http";
import {
    CloudDownloadOutlined
} from '@ant-design/icons';
import ConstValue from "@/utils/value";
import { useNavigate } from "react-router-dom";
import { get, post } from '@/requests';

export default function Products3() {
    const [activtyKey, setActivtyKey] = useState(0);
    const [flag, setflag] = useState({});
    const [flag2, setflag2] = useState({});

    const carRfe = useRef();
    const getParams = useParams();
    const [info, setInfo] = useState({});
    const [info2, setInfo2] = useState([{}]);
    const [infoImg, setInfoImg] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    const selectArr = [{
        src: img_bg
    }, {
        src: img_bg
    }, {
        src: img_bg
    }]
    const columns = [

        {
            title: 'Part No.',
            dataIndex: 'part_no',
            key: '1',
            width: 79,
        },
        {
            title: 'Power',
            dataIndex: 'Power',
            key: '3',
            width: 64,
        },
        {
            title: 'Channel',
            dataIndex: 'Channel',
            key: '4',
            width: 64,
        },
        {
            title: 'Data Rate',
            dataIndex: 'data_rate',
            key: '5',
            width: 70,
        },
        {
            title: 'Reach',
            dataIndex: 'reach',
            key: '6',
            width: 70,
        },
        {
            title: 'Wavelength',
            dataIndex: 'wavelength',
            key: '7',
            width: 79,
        },
        {
            title: 'Transmitter',
            dataIndex: 'transmitter',
            key: '8',
            width: 79,
        },
        {
            title: 'Receiver',
            dataIndex: 'receiver',
            key: '9',
            width: 79,
        },
        {
            title: 'Interface',
            dataIndex: 'interface',
            key: '10',
            width: 79,

        },
        {
            title: 'Temperature',
            dataIndex: 'temperature',
            key: '11',
            width: 79,

        },
        {
            title: 'Application',
            dataIndex: 'application',
            key: '12',
            width: 79,

        },
        {
            title: 'download',
            key: 'operation',
            fixed: 'right',
            width: 64,
            render: (e, t, index) => { return (e.part_no && (!flag[index]) ? ((!flag2[index])?(<div className='download'><a onClick={(item) => { download(e, 'data', index) }} ><CloudDownloadOutlined /></a> </div>):<div className='svg_load'></div>):<div className='download'><Button  disabled type="link"><CloudDownloadOutlined style={{fontSize:'20px'}}/></Button></div> ) }
        },
    ];
    async function download(e = {}, fileName = 'data', index) {
        let url = '';
        let obj = { ...flag2 };
            obj[index] = true
            setflag2(obj);
        let res = await get(`files?limit=25&fields[]=id&fields[]=modified_on&fields[]=type&fields[]=title&fields[]=type&fields[]=filesize&sort[]=-uploaded_on&page=1&filter=%7B%22_and%22:[%7B%22_and%22:[%7B%22filename_download%22:%7B%22_contains%22:"${e.part_no}"%7D%7D]%7D,%7B%22_and%22:[%7B%22type%22:%7B%22_nnull%22:true%7D%7D,%7B%22folder%22:%7B%22_eq%22:%22579b7761-8fcb-455f-96c7-8112e22d8aab%22%7D%7D]%7D]%7D&meta[]=filter_count&meta[]=total_count`)
        if (!(res?.data?.[0]?.id)) {
            let obj = { ...flag };
            obj[index] = true
            setflag(obj);

            messageApi.open({
                type: 'error',
                content: 'The product has no download resources. Please contact staff to obtain. ',
                className: 'custom-class',
                style: {
                    marginTop: '40vh',
                },
            })
            return
        };
        res?.data.forEach(item => {
            console.log(item);
            console.log(item);
            console.log(item);

            let url = './assets/' + item?.id;
            // const a = document.createElement('a');
            // a.style.display = 'none';
            // a.setAttribute('target', '_blank');

            // fileName && a.setAttribute('download', '');
            // a.href = url;
            // document.body.appendChild(a);
            // a.click();
            // console.dir(a);
            // document.body.removeChild(a);
            
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true); // 也可用POST方式
            xhr.responseType = "blob";
            xhr.onload = function () {
                if (this.status === 200) {
                    var blob = this.response;
                    var fileName = String(item.title) + '.pdf';
                  
                    // 添加下载查询参数
                    var downloadUrl = URL + '?download';
                  
                    if (navigator.msSaveBlob) {
                      // IE 浏览器
                      navigator.msSaveBlob(blob, fileName);
                    } else {
                      // 其他浏览器
                      var link = document.createElement('a');
                      link.href = URL.createObjectURL(blob);
                  
                      // 设置下载文件名
                      link.download = fileName;
                  
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                  
                      URL.revokeObjectURL(link.href);
                    }
                  } else {
                    // 处理页面加载失败的情况
                    alert("页面加载失败，请检查网络连接");
                  }
                  
                  function getFileExtension(filename) {
                    return filename.split('.').pop();
                  }
                  
                let obj = { ...flag2 };
                obj[index] = false
                setflag2(obj);
            };
            xhr.send()

        })

    }
    const selectChange = (index) => {
        carRfe.current.goTo(index); setActivtyKey(index);
    }
    const toPage = (address, routerName) => {
        navigate('/' + address);
    }
    useEffect(() => {
        getInfo();
    }, []);
    const getInfo = async () => {
        let res = await Http.to.items("Pluggable_Transceiver/" + getParams?.id).readByQuery({
            sort: ['id'],
            filter: { status: "published" }
        });
        let res2 = await Http.to.items("Pluggable_Transceiver_files_1").readByQuery({
            fields: ['*'],
            filter: { "Pluggable_Transceiver_id": res.data?.id + '' }
        });
        let res3 = await Http.to.items("Pluggable_Transceiver_product_specifications").readByQuery({
            fields: ['*'],
            filter: { "Pluggable_Transceiver_id": getParams?.id }
        });
        setInfoImg(res2.data);
        console.log(res3?.data);
        getInfo2(res3?.data?.map(item => item?.product_specifications_id))
        setInfo(res.data)
    }

    const getInfo2 = async (ids) => {
         if(ids.length===0){
            setInfo2([])
            return;
        }
        let res3 = await Http.to.items("product_specifications").readByQuery({
            sort: ['id'],
            filter: { '_or': ids.map(item => { return { 'id': item } }) }
        });
        let arr = []
        // for (let i = 0; i < ids.length; i++) {
        //     let res = await Http.to.items("product_specifications/" + ids[i]).readByQuery({
        //         sort: ['id'],
        //     });
        //     // res.data.key=i;
        //     arr.push(res.data);


        // }


        setInfo2(res3.data)
    }
    // 创建一个新的数据源，用于存储清理后的数据
    const cleanedDataSource = info2.map((data) => ({ ...data }));
    
    // 遍历每一列，除了最后一列
    for (let i = columns.length - 2; i >= 0; i--) {
      const column = columns[i];
      const dataIndex = column.dataIndex;
    
      // 检查该列的所有数据是否都为空
      const allEmpty = cleanedDataSource.every((data) => !data[dataIndex]);
    
      // 如果某列的所有数据都为空，将该列从列定义(columns)中删除
      if (allEmpty) {
        columns.splice(i, 1);
    
        // 同时，将数据源(cleanedDataSource)中对应列的数据也删除
        cleanedDataSource.forEach((data) => delete data[dataIndex]);
      }
    }    
      
    const navInfo = {
        '1': 'Pluggable Transceiver',
        '2': 'Optical Engine',
        '3': 'NPO/CPO ELSFP & OE Connectivity'
    }      
    return (
        <div className='products3'>
            {contextHolder}
            <NavLink title1={'Products'} link1={() => { toPage('products') }} title2={navInfo[getParams?.id2]} link2={() => { toPage('products2/' + getParams?.id2) }} title3={info?.name} />
            {infoImg.length !== 0 &&
                (
                    <div className='top_bg'>
                        <div className='bg'>

                            <Carousel ref={carRfe} style={{ height: '100%' }} dots={false}  >

                                {infoImg.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={ConstValue.url + "assets/" + item.directus_files_id} alt="" />
                                        </div>
                                    )

                                })}

                            </Carousel >
                        </div >
                        <div className="select">

                            {infoImg.map((item, index) => {
                                return (
                                    <div key={index} className={"item " + ((activtyKey === (index)) ? 'activtyitem' : '')} onClick={() => selectChange((index))}>
                                        <img src={ConstValue.url + "assets/" + item?.directus_files_id} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }

            <div className='content'>
                <Row justify={'center'}>
                    <Col xs={24} sm={24} xl={8}>
                        <div className='left'>
                            <div className='title'>{info?.name}</div>
                            <div className='item_content' dangerouslySetInnerHTML={{ __html: info?.description }}></div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} xl={8} className='leftborder'>
                        {
                            info?.features && <div className='right'>
                                <div className='item'>
                                    <div className='title'>
                                        Features
                                    </div>
                                    <div className='item_content' dangerouslySetInnerHTML={{ __html: info?.features }}></div>
                                </div>

                            </div>
                        }

                        {
                            info?.application && <div className='right' style={{ marginTop: '24px', marginBottom: '24px' }}>
                                <div className='item'>
                                    <div className='title'>
                                        Application
                                    </div>
                                    <div className='item_content' dangerouslySetInnerHTML={{ __html: info?.application }}></div>
                                </div>

                            </div>
                        }

                    </Col>
                </Row>
                {info2.length !== 0 &&
                    (
                        <div className='table'>
                            <div className='table_content'>
                                <div className="title">SPECIFICATIONS</div>
                                <Table 
                                    id="myTable" 
                                    columns={columns}
                                    dataSource={cleanedDataSource}
                                    scroll={{ x: 1200 }}
                                    pagination={{ position: ['bottomCenter'], pageSize: 10, hideOnSinglePage: true }}
                                />
                            </div>
                        </div>
                    )}

            </div>
        </div>
    );
}