import React from 'react';
import { Link } from 'react-router';

const ParentHome = ({user}) => (

  <div>
    <div className="pv3 ph4 gma-orange-border">
      <h1 className="lh-title f1 serif gma-orange">Welcome {user.first_name}!</h1>
      <p className="lh-copy f3">
        We are looking forward to supporting you with you child care needs.        
      </p>
      <p className="lh-copy f3">      
        To search for Gmas click <Link to="/gma/list">here</Link>.
        <br/>
        To edit your profile click <Link to="/profile">here</Link>.
      </p>
    </div>      
  </div>

)

export default ParentHome
