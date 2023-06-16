import React, { useState } from 'react'
import './index.scss'
import { Row, Col, Pagination, Input } from 'antd';
import imgItem3 from '@/static/img/bg_3.jpg'
import { useEffect } from 'react';
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import {
  LoadingOutlined, VideoCameraAddOutlined

} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchV, setSearchV] = useState('');
  const [start, setstart] = useState(1);

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false);

  const [info, setinfo] = useState([]);

  useEffect(() => {
  }, [])
  const getInfo = async () => {
    setstart(1)
    if (searchValue === '') {
      setinfo([])
      return
    }
    setIsLoading(true)
    setSearchV(searchValue);
    let res = await Http.to.items('Pluggable_Transceiver').readByQuery({
      sort: ['id'],
      filter:{status:"published"},
      search: searchValue
    });
    let res2 = await Http.to.items('product_specifications').readByQuery({
      sort: ['id'],
      search: searchValue
    });
    let fildata = []
    res2.data.forEach(element => {
      fildata.push({ "_and": [{ "specification": { "id": { "_eq": element.id + '' } } },{status:"published"}] })
    });
    
    let res3 = await Http.to.items('Pluggable_Transceiver').readByQuery({
      sort: ['id'],
      filter: { "_or": fildata }
    });

    let arr = [...res?.data, ...res3?.data];
    if(fildata.length===0){
      arr=res?.data;
    }
    let temp = {}
    arr.forEach(item => {
      temp[item.id] = item
    })
    // for(let i=0;i<res.data.length;i++){
    //   let res = await Http.to.items('Pluggable_Transceiver').readByQuery({
    //     sort: ['id'],

    //   });
    //   console.log(res);
    // }
    setIsLoading(false)
    setinfo(Object.values(temp))
  }
  const toPage = (address, id1, id2) => {
    navigate('/' + address + '/' + id1 + '/' + id2);
  }
  const pageC=(index)=>{
    setstart(index)
  }
  return (
    <div className='search'>
      <div className='top'>
        <div className='title'>search</div>
        <div className='search_box'><Input value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} placeholder={"Please enter keyword search"} /> <div className='button' onClick={() => getInfo()}><div className='svg'></div></div></div>
      </div>
      <div className='content'>
        <div className='title'>Search result:</div>
        <div>
          {(isLoading) ? <div className='loding_search'> <LoadingOutlined /> </div> : ''}

          {
            info.map((item, index) => {
              if((start-1)*10>index)return
              if(index>=(start-1)*10+10)return

              return (
                <Row key={index} justify={'center'}>
                  <Col>
                    <img src={ConstValue.url + "assets/" + item?.image} alt="" /></Col>
                  <Col className='info_right' >
                    <div className='info_box'><div className='info_title' dangerouslySetInnerHTML={{ __html: item?.name?.replace(RegExp(searchV, "g"), `<i class="color_c">${searchV}</i>`) }}></div>
                      <div className='info_text' dangerouslySetInnerHTML={{ __html: item?.description?.replace(RegExp(searchV, "g"), `<b class="color_c">${searchV}</b>`) }}></div></div>
                    <span className='readmore' onClick={() => { toPage('products3', item?.id, item?.Advanced_category) }}>READ MORE<span></span></span>

                  </Col>
                </Row>
              )
            })}
          {info.length !== 0 &&<Pagination defaultCurrent={1} onChange={pageC} current={start} pageSize={10} total={info.length} pageSizeOptions={[]} />}

          {info.length === 0 && (<div className='nothing'>Nothing found,please search again...</div>)

          }



        </div>
      </div>
    </div>

  )
}
