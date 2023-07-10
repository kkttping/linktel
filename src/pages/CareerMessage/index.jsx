import TopInfo from "@/components/TopInfo";
import imgBg from "@/static/img/c2_bg1.jpg";
import imgitem from "@/static/img/c2_item1.jpg";
import imgitem2 from "@/static/img/c2_item2.jpg";
import NavLink from "@/components/NavLink";
import CareerNav from "@/components/CareerNav";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Http from "@/utils/http";
import ConstValue from "@/utils/value";

import "./index.scss";
export default function CareerMessage() {
  const [info, setInfo] = useState({});

  const navigate = useNavigate();
  const toPage = (address, routerName) => {
    navigate("/" + address);
  };
  useEffect(() => {
    getInfo();
  }, []);
  const getInfo = async () => {
    let res = await Http.to.items("GMs_Message").readByQuery({
      sort: ["id"],
    });
    setInfo(res.data);
  };
  return (
    <div className="career_message">
      <TopInfo
        imgBg={imgBg}
        title={"General Manager Speech"}
        info1={"LINK TO THE UNKNOWN"}
        info2={" "}
      />
      <NavLink
        title1={"Career"}
        link1={() => {
          toPage("career");
        }}
        title2={"General Manager Speech"}
      />
      <CareerNav />
      {/* <div className='content'> */}

      {/* <div className="title">General Manager's Message</div>
                <div className='title_info'>Focusing on technologies and products, Linktel Technologies has become one of the fastest developing companies in the field of Optical Components through years of dedication and hard work. Our rapid growth benefits from the ever-changing markets driven by the mobile internet and cloud computing, and thanks to the trust from our global customers, to the commitment of our staff and also to the great supports of our partners.</div>
                <div className='img'><img src={imgitem} alt="" /></div>
                <div className="info2">
                    As an incredibly unique company, almost all of employees at Linktel Technologies are very young, and the entire team is full of vitality and enthusiasm. We will cheer together for our success, and help each other when encountering a setback. Sharing the common value of “Be Earnest Do Best”, we work together and win together.

                    Linktel Technologies is a company with an ambition. We definitely won’t stop where we are now, with the persistence towards our goal of “Become a leading supplier of optical communication transceivers in the world”. We commit to offering best-in-class quality and more cost-effective products and service to our customers.

                    On behalf of Linktel Technologies, I sincerely invite and welcome more talents to join us and strive together for a better future !
                </div>
                <div className='img2'>
                    General<br /> Manager
                    <img src={imgitem2} alt="" />
                    Linktel Technologies Co., Ltd
                </div> */}

      {/* </div> */}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: info?.content }}
      ></div>
    </div>
  );
}
