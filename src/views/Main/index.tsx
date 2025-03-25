import React from 'react'
import './style.css';

// component: 메인 하면 컴포넌트 //
export default function Main() {

  // render: 메인 하면 컴포넌트 렌더링 //
  return (
    <div id='main-wrapper'>
      <div className='user-info-container'></div>
      <div className='recently-container'></div>
    </div>
  )
}
