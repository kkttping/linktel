import React from 'react'
import './index.scss'
export default function CardProducts(props) {
  const {styleSelf,img,link,titleout,titleIn,info}=props;
  return (
    <div className='com_card_products' style={{ color: styleSelf?.color ?? '#000' }}>
      <div className='img'>
        <img src={img} alt="" style={{objectFit:styleSelf?.objectfit??'contain'}} />
      </div>
      <div className='bg_hover'>      
      <div className='name'>{titleout}</div>
      <div className='bg_lin'></div>    
        {info?.map(item=><span   dangerouslySetInnerHTML={{ __html:item}} key={item}></span>)}
        <span className='readmore' onClick={() => {
  link();
  document.querySelector('#top').scrollIntoView(); 
}}>
  READ MORE<span></span>
</span>
      </div>
    </div>
  )
}
