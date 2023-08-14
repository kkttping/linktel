import { Menu, Row, Col } from "antd";
import TopInfo from "@/components/TopInfo";
import imgBg from "@/static/img/c1_bg1.jpg";
import imgitem1 from "@/static/img/c1_item1.jpg";
import imgitem2 from "@/static/img/c1_item2.jpg";
import CardProducts from "@/components/CardProducts";
import CardOpportunities from "@/components/CardOpportunities";
import React, { useEffect, useState } from "react";
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { useNavigate } from "react-router-dom";

import "./index.scss";
export default function Career() {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);

  const toPage = (address, routerName) => {
    navigate("/" + address);
  };
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    let res = await Http.to.items("recruit").readByQuery({
      sort: ["-sort", "date_updated"],
      filter: { status: "published" },
    });
    setInfo(res.data);
  };
  return (
    <div className="career">
      <TopInfo
        imgBg={imgBg}
        title={"Career"}
        info1={"LINK TO THE UNKNOWN"}
        info2={" "}
      />
      <div className="content">
        <Row justify={"center"} className="careertable">
          <Col sm={24} xl={12}>
            <div className="card_item">
              <CardProducts
                link={() => {
                  toPage("message", "career");
                }}
                img={imgitem1}
                styleSelf={{ color: "#fff", objectfit: "cover" }}
                titleout={"General Manager Speech"}
                titleIn={"General Manager's Message"}
                info={[
                  "Focusing on technologies and products, Linktel Technologies has become one of the fastest developing companies in the field of ...",
                ]}
              ></CardProducts>
            </div>
          </Col>
          <Col sm={24} xl={12}>
            <div className="card_item">
              <CardProducts
                link={() => {
                  toPage("workAtLinktel", "career");
                }}
                img={imgitem2}
                styleSelf={{ color: "#fff", objectfit: "cover" }}
                titleout={"Culture in Linktel"}
                titleIn={"Culture in Linktel"}
                info={[
                  'Linktel Technologies is full of youth and energy. The environment, systems and codes of conduct here embody the concept of "People First" ... ',
                ]}
              ></CardProducts>
            </div>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col>
            <div className="title_name">Job opportunities</div>
          </Col>
        </Row>
        <Row justify={"center"} className="creertable">
          {info.map((item, index) => {
            return (
              <Col key={index}>
                <div className="opportunities_item">
                  <CardOpportunities data={item} />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
