import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Counter';
import { Intent, ProgressBar, Slider, Switch } from "@blueprintjs/core";
import { VictoryPie, VictorySharedEvents, VictoryBar, VictoryStack, VictoryLabel } from 'victory';

class Counter extends Component {
  constructor(props) {
   super(props);
   this.state = { value: props.count }
  }
  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>This is a simple example of a React component.</p>

        {renderExample(this.props.count/10)}

        <p>Current count: <strong>{this.props.count}</strong></p>

        <button onClick={this.props.increment}>Increment</button>
        <Slider
          key="value"
          labelStepSize={1}
          min={0}
          max={10}
          onChange={this.handleValueChange}
          stepSize={1}
          showTrackFill={false}
          value={this.props.count}
        />

      </div>
    );
  }
  handleValueChange = (value) => this.props.updateCount(value);
}
function renderExample(progressVal) {
  return (
  <div>
    <ProgressBar  value={progressVal} />
    <VictoryBar
            style={{
              data: {
                fill: "tomato",
                stroke: (d, active) => active ? "black" : "none",
                strokeWidth: 2
              }
            }}
            size={(datum, active) => active ? 5 : 3}
            data={[
              { x: 1, y: progressVal },
              { x: 2, y: 1 },
              { x: 3, y: progressVal },
              { x: 4, y: 1 },
              { x: 5, y: progressVal },
              { x: 6, y: 1},
              { x: 7, y: progressVal }
            ]}
          />
      {/* <VictoryPie
  data={[
    { x: 1, y: 2, label: "one" },
    { x: 2, y: 3, label: "two" },
    { x: 3, y: progressVal, label: "three" }
  ]}
/>     */}
    </div>
  );
}


export default connect(
  state => state.counter,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Counter);
