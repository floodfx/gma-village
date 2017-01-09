import React from 'react';
import { Link } from 'react-router';

const GmaHome = ({user}) => (

  <div>
    <div className="pv3 ph4 gma-orange-border">
      <h1 className="lh-title f1 serif gma-orange">Welcome Gma {user.first_name}!</h1>
      <p className="lh-copy f3">
        You can <Link to="/profile">change your profile</Link>.  
      </p>
    </div>      
  </div>

)

export default GmaHome
