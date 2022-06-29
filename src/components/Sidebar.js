import React, { useState } from 'react'
import ComposeMail from './ComposeMail'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="sidebar">
        <button className="sidebar_compose" onClick={() => setIsOpen(true)}>
          <span className="material-icons">add</span>
          compose
        </button>
        <div className="sidebarOption sidebarOption_active">
          <span className="material-icons">near_me</span>
          <h3>Send</h3>
        </div>
        <ComposeMail isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  )
}

export default Sidebar