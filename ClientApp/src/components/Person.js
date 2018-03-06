import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Person';
import { Intent, ProgressBar, Slider, Switch } from "@blueprintjs/core";
import { VictoryPie, VictorySharedEvents, VictoryBar, VictoryStack, VictoryLabel } from 'victory';

class Person extends Component {
  constructor(props) {
   super(props);
   this.state = { value: props.count / 10 }
  }
  render() {
    return (
      <div>
        <h1>Person</h1>

    

        <p>This is a simple example of a React component.</p>
        {renderExample(this.props.count/10)}
        <p>Current count: <strong>{this.props.count}</strong></p>

        <button onClick={this.props.increment}>Increment</button>
        <Slider

          key="value"
          labelStepSize={1}
          min={0}
          max={1}
          onChange={this.handleValueChange}

          stepSize={0.1}
          showTrackFill={false}
          value={this.props.count/10}
        />

      </div>
    );
  }
  handleValueChange = (value) => this.setState({ value: value });
}
function renderExample(props) {
  return (
  <div>
    <ProgressBar  value={props} />
    </div>
  );
}


export default connect(
  state => state.person,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Person);
