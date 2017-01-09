import React from 'react';
import { Link } from 'react-router';

const AdminHome = ({user}) => (

  <div>
    <div className="pv3 ph4 gma-orange-border">
      <h1 className="lh-title f1 serif gma-orange">Welcome Admin {user.first_name}!</h1>
      <p className="lh-copy f3">
        As an Administrator, you have the power to create new Admins, Gmas,
        and Parents amoung other things.  Please be careful and think twice
        before making a change.
      </p>
    </div>
    <div>
      <div className="cf mv3">
        <div className="fl w-100 w-third-ns pr2-ns">
          <div className="gma-orange-border bg-white pb3 ph4 tc">
            <h2 className="lh-subtitle serif f2 gma-orange">Create Admin</h2>
            <p className="lh-copy">
              Create an Admin if you want to add a user who can create other
              users and edit any profile. Any Admin can also deactivate any user.
            </p>
            <Link className="btn gma-orange-bg" to="admin/create">Create Admin</Link>
          </div>
        </div>
        <div className="fl w-100 w-third-ns pr2-ns">
          <div className="gma-orange-border bg-white pb3 ph4 tc">
            <h2 className="lh-subtitle serif f2 gma-orange">Create Gma</h2>
            <p className="lh-copy">
              Create an Gma to add another Gma to the system.  You can add Gmas
              as inactive to start and activate them as you need to.
            </p>
            <Link className="btn gma-orange-bg" to="gma/create">Create Gma</Link>
          </div>
        </div>
        <div className="fl w-100 w-third-ns">
          <div className="gma-orange-border bg-white pb3 ph4 tc">
            <h2 className="lh-subtitle serif f2 gma-orange">Create Parent</h2>
            <p className="lh-copy">
              Create a Parent to add another Parent to the system.  As with Gmas,
              you can add a Parent as inactive to begin and activate them later.
            </p>
            <Link className="btn gma-orange-bg" to="parent/create">Create Parent</Link>
          </div>
        </div>
      </div>
    </div>
  </div>

)

export default AdminHome
