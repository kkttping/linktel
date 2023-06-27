import React from 'react'
import './index.scss'
export default function CardPersonInfo(props) {
    const { title,name,email=[],phone } = props;
    return (
        <div className='card_person_info'>
            <div className='content_info'>
                {title && <div className="title">{title}</div>}
{name && 
<div className="address">
  <div className='svg_address'></div>
  {name} 
</div>  
} 
{phone &&  
<div className="phone">
  <div className='svg_phone'></div>
  {phone}
</div>   
}
{email?.length > 0 &&  
<div className="email">
  <div className='svg_email'></div>
  {email?.map(item => {
    return <span>{item.Email}<br/></span>  
  })} 
</div>}
            </div>
        </div>
    )
}
