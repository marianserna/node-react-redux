import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="nodereactredux"
        description="$5 for 5 email credits"
        // defaults to USD cents
        amount={500}
        // callback w token that we get back from stripe
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
