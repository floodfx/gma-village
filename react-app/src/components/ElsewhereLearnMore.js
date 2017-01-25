import React, {Component} from 'react';
import ReactTooltip from 'react-tooltip';
import FontAwesome from 'react-fontawesome';

class ElsewhereLearnMore extends Component {

  render() {
    const message = "Gma Village supports parents and Grandms in connecting for care that takes place at the provider’s home and out in the community (Libraries, Zoo’s, Parks, Museums, etc). Please note the care happens at the child’s home, grandmas are automatically considered domestic workers and are bound by all labor and tax laws including minimum wage laws. Parents would be responsible for paying grandmas minimum wage and complying with all laws."

    return (
      <div>
        <FontAwesome name='question-circle' className="mr1"/>
        <a 
          tabIndex="0" 
          className=""
          data-tip 
          data-event='click'
          data-for='learnMore'>
          Learn More
        </a>
        
        <ReactTooltip 
          id='learnMore' 
          aria-haspopup='true' 
          role='example'
          globalEventOff='click'
          effect="solid"
        >
          <div className="pa3" style={{maxWidth: 250}}>
            <h3 className="f2">Please Note:</h3>
            <p className="f3 lh-copy">{message}</p>
          </div>          
        </ReactTooltip>   
      </div>   
    )
  }

}

export default ElsewhereLearnMore;