import React from 'react';
import AccountKitContainer from '../containers/AccountKitContainer';

const Login = ({onLoginClick, initialized, loadingMsg, errors, debug}) => {
  let phoneInput
  return (
  <div>
    {loadingMsg &&
      <div>{loadingMsg}</div>
    }
    { errors.length > 0 &&
      <div>
        <span className="b">Errors:</span>
        {errors.map((error) => {
          return <p key={error} className="">{error}</p>
        })}
      </div>
    }
    <form className="pa4 black-80" onSubmit={e => {
      e.preventDefault();
      if(!phoneInput.value.trim()) {
        return;
      }
      onLoginClick(phoneInput.value);
    }}>
      <div className="measure mb3">
        <label htmlFor="phone" className="f6 b db mb2">Phone Number</label>
        <input ref={node => {
          phoneInput = node;
        }} type="phone" className="input-reset ba b--black-20 pa2 mb2 db w-100" id="phone" placeholder="555 867 5309" />
      <small className="f6 black-60 db mb2">Formatting not required</small>
      </div>
      <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2" type="submit" disabled={!initialized || errors.length > 0 || loadingMsg}>Submit</button>
    </form>
    <AccountKitContainer />
  </div>
  )
}


export default Login