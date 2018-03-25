import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google" style={{ color: '#212121' }}>
              Login with Google
            </a>
          </li>
        );
      default:
        return (
          <li>
            <a>Logout</a>
          </li>
        );
    }
  }

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
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
