import * as signalR from '@aspnet/signalr';
// Redux Types
const addMessageType = 'ADD_MESSAGE';
const sendMessageType = 'SEND_MESSAGE';

// Initial State 
const initialState = { chatLog: [] };
let nextTodoId = 0

// SignalR setup
var transportType = signalR.TransportType.ServerSentEvents;
// can also be WSS or LongPolling -- SSE chosen for AWS ELB ease of use
var thislogger = new signalR.ConsoleLogger(signalR.LogLevel.Information);
// Subscribe to Hub
var chatHub = new signalR.HttpConnection(`https://${document.location.host}/realtimechat`, { transport: transportType, logging: thislogger });
export const chatConnection = new signalR.HubConnection(chatHub);
chatConnection.onclose = e => {
  console.log('connection closed');
};
chatConnection.start().catch(err => {
  console.log('connection error');
});

export const actionCreators = {
  addMessage:  value => async (dispatch) =>{ 
      dispatch({type: addMessageType, chatMessage: value });
  },
  sendMessage: value => async (dispatch) => {
    chatConnection.invoke('Send', value)
   dispatch({type: sendMessageType}, value)
   }
};

export const reducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case addMessageType:
      return {
        chatLog: [
          ...state.chatLog,
          {
            id: nextTodoId++,
            text: action.chatMessage
          }
        ] 
      }
    default:
      return state
  }
}