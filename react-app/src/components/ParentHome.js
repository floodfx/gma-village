import React from 'react';
import { Link } from 'react-router';

const ParentHome = ({user}) => (

  <div>
    <div className="pv3 ph4 gma-orange-border">
      <h1 className="lh-title f1 serif gma-orange">Welcome {user.first_name}!</h1>
      <p className="lh-copy f3">
        We are looking forward to supporting you with you child care needs.        
      </p>
      <h3 className="f3 serif gma-orange">Actions</h3>
      <ul className="lh-copy f3">      
        <li><Link to="/gma/list">Search for Gmas</Link></li>
        <li><Link to="/profile">Edit your profile</Link></li>
        <li><Link to="/careNeed/create">Post a Care Need</Link></li>
      </ul>
    </div>      
  </div>

)

export default ParentHome
