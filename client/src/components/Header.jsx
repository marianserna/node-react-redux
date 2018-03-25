import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="left brand-logo">
            <img
              src="https://cdn.iconscout.com/public/images/icon/free/png-512/react-native-logo-3b38fe0f8005ff45-512x512.png"
              alt="logo"
              style={{ width: 50, paddingTop: 8 }}
            />
          </a>
          <ul id="nav-mobile" className="right">
            <li>
              <a style={{ color: '#212121' }}>Login with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
