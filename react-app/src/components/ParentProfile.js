import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ParentProfile extends Component {

  // componentWillMount() {
  //   const { parent } = this.props;
  //   if(parent.profile_image_url) {
  //     window.loadImage(
  //       parent.profile_image_url, (canvas) => {
  //         console.log("canvas", canvas)
  //         if(canvas.type === "error") {
  //           console.log("Error loading image");
  //         } else {
  //           //here's the base64 data result
  //           var base64data = canvas.toDataURL('image/jpeg');
  //           //here's example to show it as on imae preview
  //           var img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
  //           console.log("img_src", img_src)
  //         }
  //       },
  //       {orientation: true, crossOrigin: "http://localhost.gmavillage.com:3000"}
  //     )
  //   }
  // }

  render() {
    const { parent } = this.props;
    return (
      <div className="fl w-100 w-25-ns pa2">
        <div className="thumbnail">
          {parent.profile_image_url &&
            <img className="img-rounded img-responsive gma-orange-border"
              style={{objectFit: 'cover', maxWidth: '135px', maxHeight: '135px', minWidth: '135px', minHeight: '135px'}}
              src={parent.profile_image_url}
              alt={`Parent ${parent.first_name}`}/>
          }
          <div className="tc">
            <h3 className="gma-orange tc gma-font fw3">
              <Link to={`/parent/edit/${parent.id}`}>Parent {parent.first_name} {parent.last_name}</Link>
            </h3>
            <h4 className="tc fw4">
              Phone: {parent.phone}
            </h4>
            <h4 className="tc fw4">
              Status: {parent.active ? "Active" : "Not Active"}
            </h4>
            <Link to={`/careNeed/create/${parent.id}`} className="btn gma-orange-bg">Post Care Request</Link>
          </div>
        </div>
      </div>
    )
  }

}

ParentProfile.propTypes = {
  parent: PropTypes.object.isRequired
};

export default ParentProfile;
