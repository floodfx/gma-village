import React from 'react';
import { Link } from 'react-router';

const ParentHome = ({user}) => (

  <div>
    <div className="pv3 ph4 gma-orange-border">
      <h1 className="lh-title f1 serif gma-orange">Welcome Parent {user.first_name}!</h1>
      <p className="lh-copy f3">
        You can <Link to="/gma/list">search for Gmas</Link> to help with you child care needs.  
      </p>
    </div>      
  </div>

)

export default ParentHome
