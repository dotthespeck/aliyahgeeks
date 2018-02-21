import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="header-container">
        <div id="align-left">
          <h1><span id="title-firsthalf">Rechov</span><span id="title-secondhalf">Aliyah</span></h1>
        </div>
        <div id="align-right">
          <div className="btn">Share Your Story</div><br/>
          <div className="btn">Your Profile</div>
        </div>
      </div>
    )
  }
}

export default Header