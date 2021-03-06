import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Payments from './Payments';

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
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="3" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            <img
              src="https://cdn.iconscout.com/public/images/icon/free/png-512/react-native-logo-3b38fe0f8005ff45-512x512.png"
              alt="logo"
              style={{ width: 50, paddingTop: 8 }}
            />
          </Link>
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
