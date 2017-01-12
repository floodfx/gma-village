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
    console.log("errors", JSON.stringify(errors));
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
          <div className="center w-50">
            <div className="cf">              
              <div className="fl w-100 pa2-ns pb3">
                <h2 className="lh-title fw2 f1">Welcome to Gma Village!</h2>
                <label htmlFor="phone" className="lh-title fw3 f2">Enter your phone number to login</label>                   
              </div>
            </div>
          </div>
          <div className="center w-50">
            <div className="cf">              
              <div className="fl w-one-third pa2-ns pb3">                
                <input ref={node => {
                  phoneInput = node;
                }} type="phone" className="input-reset ba b--black-20 pa2 mb2 db" id="phone" placeholder="5551112222" />
                <small className="f5 black-60 db mb2">Formatting not required</small>
              </div>
              <div className="fl w-two-thirds pa2-ns pb3">
                <button className="btn gma-orange-bg " type="submit" disabled={!accountKitInited || isLoggingIn}>
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
