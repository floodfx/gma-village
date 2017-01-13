import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Alert from './Alert';

class Login extends Component {
  

  render() {
    const {onLoginClick, isLoggingIn, accountKitInited, errors} = this.props;
    let phoneInput;
    var errorMsg = "";
    if(errors && errors.length > 0) { 
      if(errors[0].responseErrors && errors[0].responseErrors.length > 0) {  
        errorMsg = `${errors[0].responseErrors[0].message} (Error ID: ${errors[0].responseErrors[0].id})`;
      } else if(errors.otherErrors){
        errorMsg = JSON.stringify(errors.otherErrors);
      } else {
        errorMsg = JSON.stringify(errors);
      }
    }
    // console.log("errors", JSON.stringify(errors));
    return (
      <div>
        { errors.length > 0 &&
          <Alert 
            type="danger" 
            heading="Error Logging In:" 
            text={errorMsg} />
        }
        <form className="pa4 black-80" onSubmit={e => {
          e.preventDefault();
          if(!phoneInput.value.trim()) {
            return;
          }
          onLoginClick(phoneInput.value);
        }}>
          <div className="center w-50-ns w-100">
            <div className="cf">              
              <div className="fl w-100 pa2-ns pb3">
                <h2 className="lh-title fw2 f1 gma-orange tc">Hi! We are excited to connect you to our child care community!</h2>
                <h3 htmlFor="phone" className="lh-title fw3 f3 tc">If you are a member, please enter your phone number below to Login.</h3>
                <h3 htmlFor="phone" className="lh-title fw3 f3 tc">If you are not a member yet, we invite you to become one. <a href="https://docs.google.com/forms/d/1cSPocmQ9G98X8WF9gcLCyZs2ZYZkDsFPNAO5pggVyr8/viewform?usp=send_form">Register Now</a></h3>
              </div>
            </div>
          </div>
          <div className="center w-30-ns w-100 mt5">
            <div className="cf gma-orange-border">      
              <div className="fl w-100 pa2-ns pb3 tc pt3">
                <label htmlFor="phone" className="lh-title fw4 f3 mid-gray">Login with your Phone Number</label>               
              </div>        
              <div className="fl w-100 pa2-ns pb3 tc">                 
                <input ref={node => {
                  phoneInput = node;
                }} type="phone" className="input-reset ba b--black-20 pa2 mb2 tc" id="phone" placeholder="5551112222" />
                <small className="f5 black-60 db mb2">Formatting not required</small>
                <button className="btn gma-orange-bg tc" type="submit" disabled={!accountKitInited || isLoggingIn}>
                  {isLoggingIn &&
                    <FontAwesome name='spinner' spin={true} className="mr1"/>
                  }
                  Login
                </button>
                
              </div>
              
            </div>
          </div>
          
        </form>
        
      </div>
    )
  }
}

export default Login
