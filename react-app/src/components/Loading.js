import React, { Component } from 'react';

const Loading = ({loading, loadingMsg}) => {

  if(loading) {
    return (
      <div>
        {loadingMsg || "Loading..."}
      </div>
    )
  } else {
    return null
  }

}

export default Loading
