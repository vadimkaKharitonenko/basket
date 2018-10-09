import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img src={require("../../assets/logo.png")} alt="logo"/>
      </div>
    );
  }
}

export default Header;