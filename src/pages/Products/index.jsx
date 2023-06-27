import { Menu, Row, Col } from 'antd'
import CardProducts from '@/components/CardProducts'
import { useNavigate } from "react-router-dom";
import imgitem1 from '@/static/img/item1.png'
import imgitem2 from '@/static/img/item3.png'
import imgitem3 from '@/static/img/item4.png'
import imgBg from '@/static/img/bg_1.jpg'
import TopInfo from '@/components/TopInfo'
import React, { useEffect, useState } from 'react'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import './index.scss'
export default function Products() {
	const navigate = useNavigate()

	const toProducts2 = (id) => {
		navigate('/products2/'+id)
	}
	const [info, setInfo] = useState([]);

	useEffect(() => {
		getInfo();
	}, []);

	const getInfo = async () => {
		let res = await Http.to.items("CLASSIFICATION").readByQuery({
			sort: ['id'],
		});
		setInfo(res.data)
	}
	const imgList = { '0': imgitem1,'1': imgitem2,'2': imgitem3, }

	return (
		<div className='products'>
			<TopInfo
				imgBg={imgBg}
				title={'Products'}
				info1={'LINK TO THE UNKNOWN'}
				info2={' '}
			/>
			<Row justify={"center"}>

				{info.map((item, index) => {
					return (
						<Col key={index} xl={24} xxl={8} >
							<div className='card_item'>
								<CardProducts
									link={()=>toProducts2(item?.id)}
									img={imgList[index]}
									info={[item?.text]}
									titleIn={item?.name}
									titleout={item?.name}
								/>
							</div>
						</Col>
					)
				})}

				
			</Row></div>
	)
}
