import React, { useState, useRef } from 'react'
import './inderx.scss'
import { Modal, Row, Col, Upload, message, Button, Form, Input, Spin } from 'antd'
import { FolderOpenOutlined } from '@ant-design/icons';
import ConstValue from "@/utils/value";
import Http from "@/utils/http";
const { Dragger } = Upload;

export default function CardOpportunities(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [loadFlag, setloadFlag] = useState(false);
    const [updata, setupdata] = useState(null);

    const formRef = useRef()

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
                setupdata(info?.file?.response?.data);
            }
        },
        showUploadList: false, maxCount: 1,
        onChange(info) {

            // 添加文件数据处理
            if(info.file.response) {
        
              // 保存文件数据
              setupdata(info.file.response.data); 
        
              messageApi.open({
                key: 'updatable',
                type: 'loading',
                content: 'Loading...',
              });
            }
          }
        
    };
    const uploadData = async (data2, data3) => {
        let res = await Http.to.items("biographical_notes").createOne({
            email
                :
                data3?.email,
            name
                :
                data3?.name,
            phone
                :
                data3?.phone,
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
    const onFinish = (e) => {
        if (updata === null) {
            messageApi.open({
                key: 'updatable',
                type: 'error',
                content: 'Please upload file',
                style: {
                    marginTop: '50vh',
                },
                duration: 2,
            }); return;
        }
        uploadData(updata, e)
    }
    const onFinishFailed = () => { }

    return (
        <div className='card_opportunities'>
            {contextHolder}
            <div>
                <div className="title_tag">Position</div>
                <div className="title">{data?.position}</div>
            </div>

            <div className='infomation'>
                <div className='item'>
                    <div className='type'>Country</div>
                    <div className='info'>{data?.country}</div>
                </div>
                <div className='item'>
                    <div className='type'>City</div>
                    <div className='info'>{data?.Place}</div>
                </div>
           
            </div>
            <span className='readmore' onClick={() => { setIsModalOpen(true) }}>READ MORE <span></span></span>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]} width={720}>
                <div className='content'>
                    <div>
                        <div className="title">{data?.position}</div>
                    </div>

                    <div className='infomation'>
                        <div className='item'>
                            <div className='type'>Country</div>
                            <div className='info'>{data?.country}</div>
                        </div>
                        <div className='item'>
                            <div className='type'>City</div>
                            <div className='info'>{data?.Place}</div>
                        </div>
                        
                    </div>
                    <div className='info2'>
  <div className='info2_title'>Requirements</div>
  <div className='info2_text' dangerouslySetInnerHTML={{ __html: data?.Requirements }}></div>
  <div className='info2_title'>Responsibility</div>
  <div className='info2_text' dangerouslySetInnerHTML={{ __html: data?.Responsibility }}></div>
</div>

                    <div className='info3'>
                        <div className='info3_title'>Online delivery:</div>
                        <div className='form'>
                            <Form
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
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
                                <Row justify={'center'}>
                                    <Col >
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
                                    </Col>
                                    <Col>
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
                                    </Col>
                                    <Col >
                                        <Form.Item
                                            name="phone"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Phone!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder={"Your phone"} />
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item

                                        >
                                            <div className='upload_box_item'>


                                                <Upload {...propsD} >
                                                    <div className='upload_svg' onClick={() => setShowModal(true)}>
                                                        <div className='up_box'><span>{updata?.filename_download || 'Add file'}</span><FolderOpenOutlined style={{ fontSize: '20px' }} />  </div>
                                                    </div>
                                                </Upload>

                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col >
                                        <Form.Item
                                        >
                                            <Button type="primary" htmlType="submit" className='opp_apply' >
                                                <div className='name'>Apply <div className='svg'></div></div>
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                    
                                    <Col >
                                        <div >
                                            <div className='to_website'>
                                                <a  href={data.link} target="_blank">Or go to the recruitment website {'>'} </a>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>





                            </Form>
                        </div>
                    </div>
                </div>

                {/* <div>
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


                </div> */}
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