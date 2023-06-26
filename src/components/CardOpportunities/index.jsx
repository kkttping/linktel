import React, { useState } from 'react'
import './inderx.scss'
import { Modal, Row, Col, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import ConstValue from "@/utils/value";
import Http from "@/utils/http";
const { Dragger } = Upload;

export default function CardOpportunities(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { data } = props;
    const propsD = {
        name: 'file',
        multiple: true,
        action: '/files',
        accept: 'jpg, .jpeg, .png,.pdf,.doc,.docx,',
        onChange(info) {
            messageApi.open({
                key: 'updatable',
                type: 'loading',
                content: 'Loading...',
            });
            if (info?.file?.response?.data) {
                uploadData(info?.file?.response?.data)
            }
        },
        showUploadList: false, maxCount: 1,
    };
    const uploadData = async (data2) => {
        let res = await Http.to.items("biographical_notes").createOne({

            biographical: data2?.id,
            position: {
                "create": [
                    {
                        "biographical_notes_id": "+",
                        "collection": "recruit",
                        "item": {
                            "id": data.id
                        }
                    }
                ],
                "update": [],
                "delete": []
            }
        });
        if (res) {
            setIsModalOpen(false);
            messageApi.open({
                key: 'updatable',
                type: 'success',
                content: 'success!',
                duration: 2,
            })
        }
    }
    return (
        <div className='card_opportunities'>
            {contextHolder}      
            <div>
                <div className="title_tag">Position</div>
                <div className="title">{data?.position}</div>
            </div>

            <div className='infomation'>
                <div className='item'>
                    <div className='type'>country</div>
                    <div className='info'>{data?.country}</div>
                </div>
                <div className='item'>
                    <div className='type'>Place</div>
                    <div className='info'>{data?.Place}</div>
                </div>
                <div className='item'>
                    <div className='type'>Hiring</div>
                    <div className='info'>{data?.Hiring}</div>
                </div>
            </div>
            <span className='readmore' onClick={() => { setIsModalOpen(true) }}>READ MORE <span></span></span>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]} width={720}>
                <div className='content'>
                    <div>
                        <div className="title">Hardware development engineer</div>
                    </div>

                    <div className='infomation'>
                        <div className='item'>
                            <div className='type'>country</div>
                            <div className='info'>{data?.country}</div>
                        </div>
                        <div className='item'>
                            <div className='type'>Place</div>
                            <div className='info'>{data?.Place}</div>
                        </div>
                        <div className='item'>
                            <div className='type'>Hiring</div>
                            <div className='info'>{data?.Hiring}</div>
                        </div>
                    </div>
                    <div className='info2'>
                        <div className='info2_title'>Requirements</div>
                        <div className='info2_text'>
                            {data?.Requirements}
                        </div>
                        <div className='info2_title'>Responsibility</div>
                        <div className='info2_text'>
                            {data?.Responsibility}
                        </div>

                    </div>
                </div>

                <div>
                    <Row className="careeropentable">
                        <Col sm={24} xl={12} >
                            <div className='upload_box'>


                                <Upload {...propsD} >
                                    <div className='upload_svg' onClick={() => setShowModal(true)}>
                                        <div className='name'>Apply <div className='svg'></div></div>
                                    </div>
                                </Upload>

                            </div>



                        </Col>
                        <Col sm={24} xl={12}>
                            <div className='upload_box'>
                                <div className='upload_svg'>
                                    <a className='name' href={data.link}  target="_blank">Linkedin <div className='svg2'></div></a>
                                </div>
                            </div>

                        </Col>
                    </Row>


                </div>
            </Modal >
            {/* <Modal open={showModal}  onCancel={()=>{setShowModal(false)}} footer={[]} width={720}>
                <Dragger {...propsD}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
            </Modal> */}
        </div >
    )
}