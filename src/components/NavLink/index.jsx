import React from 'react'
import './index.scss'
import { useNavigate } from "react-router-dom";

export default function NavLink(props) {
    const navigate = useNavigate()
    const toPage = (address, routerName) => {
        navigate('/' + address);
    }
    return (
        <div className='nav_link'>
            <div className='nav'>
                <div className='left'>
                    <div className='home' onClick={()=>{
  toPage('home');
  document.querySelector('#top').scrollIntoView(); 
}}></div>
<div className="link">
  <span onClick={() => {
    props?.link1();
    document.querySelector('#top').scrollIntoView(); 
  }}> 
    {props?.title1}
  </span>
  <span> · </span>
  <span onClick={() => {
    props?.link2();
    document.querySelector('#top').scrollIntoView(); 
  }}>
    {props?.title2}    
  </span> 
  {props?.title2 && props?.title3 && (  
      <>  
        <span> · </span>
        <span onClick={() => {
          props?.link3();
          document.querySelector('#top').scrollIntoView(); 
        }}>  
          {props?.title3}
        </span>  
      </>
  )} 
</div>
                </div>
                <div className='right' onClick={() => window.history.back()}>
                    <div className='return'></div>
                    <div className="link">
                        <span>Previous</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
