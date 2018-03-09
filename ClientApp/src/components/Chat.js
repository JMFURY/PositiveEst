import * as signalR from '@aspnet/signalr';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, chatConnection } from '../store/Chat';
import { ProgressBar, Button, Popover, Slider, Switch, Classes, FormGroup, InputGroup, Intent, Position, Tag, Menu, MenuItem } from "@blueprintjs/core";
import { VictoryPie, VictorySharedEvents, VictoryBar, VictoryStack, VictoryLabel } from 'victory';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryValue: "",
    }
  }
  componentDidMount(props) {
    // Add an 'Event Listener' on Mount for Chat Connection of SignalR client
    chatConnection.on('Send', (message) => {
      this.setMessage(message);
     console.log("Listener added:" + message)

    });
   // Log that component finished mount
    console.log("Mounted")
  }
  handleChange(event) {
    this.setState({ summaryValue: event.target.value });
  }
  setMessage(message) {
    this.props.addMessage(message);
  }
  render() {
    return (
      <div>
        <h1>Chat</h1>
        <p>This is a simple example of a React component.</p>
        <ul>
        {this.props.chatLog.map(chatMessage =>
        <li>
          <p key={chatMessage.id}>{chatMessage.text}</p>
          </li>
        )}
        </ul>
        <FormGroup
          helperText="Helper text with details..."
          label="Label A"
          labelFor="text-input"
          requiredLabel={true}>

          <InputGroup id="text-input" placeholder="Placeholder text" type="text" onChange={this.handleChange.bind(this)} value={this.state.summaryValue} />

          <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit Message</Button>

        </FormGroup>

      </div>
    );
  }
  handleSubmit(event) {
    // Log the submitted message
    console.log('A message was submitted: ' + this.state.summaryValue);
    // Submit Message to Send Message Redux Action
    this.props.sendMessage(JSON.stringify(this.state.summaryValue));
    // I think we need to preventDefault here..
    event.preventDefault();
    // Reset the input value to empty string
    this.setState({ summaryValue: ""})
  }
}


export default connect(
  state => state.chat,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Chat);

