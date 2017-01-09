import React from 'react';
import FontAwesome from 'react-fontawesome';

const LoadingIndicator = ({text}) => (
  <div>
    <FontAwesome name='spinner' spin={true} className="mr1" />
    {text} 
  </div>
)

export default LoadingIndicator;
