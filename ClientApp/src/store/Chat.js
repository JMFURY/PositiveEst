import * as signalR from '@aspnet/signalr';

const addMessageType = 'ADD_MESSAGE';
const sendMessageType = 'SEND_MESSAGE';

// const decrementCountType = 'DECREMENT_COUNT';
// const updateCountType = 'UPDATE_COUNT';
// const pullUpdateCountType = 'PULL_UPDATE_COUNT';
// const getNewRealtimeCountType = 'GET_NEW_REALTIME_COUNT';
const initialState = { chatLog: [] };
let nextTodoId = 0
let lastMessage = "";
var transportType = signalR.TransportType.ServerSentEvents;
//can also be ServerSentEvents or LongPolling
var thislogger = new signalR.ConsoleLogger(signalR.LogLevel.Information);
var chatHub = new signalR.HttpConnection(`https://${document.location.host}/realtimechat`, { transport: transportType, logging: thislogger });
export const chatConnection = new signalR.HubConnection(chatHub);
chatConnection.onclose = e => {
  console.log('connection closed');
};

chatConnection.start().catch(err => {
  console.log('connection error');
});

export const actionCreators = {
 
  // addMessage: (value) => ({ type: addMessageType, chatMessage: value }),
  addMessage:  value => async (dispatch) =>{ 
    // if (value === lastMessage) {
    //   // Don't issue a duplicate request (we already have or are loading the requested data)
    //   return;
    // } 
      dispatch({type: addMessageType, chatMessage: value });
   
    
  },
  sendMessage: value => async (dispatch) => {
    lastMessage = value;
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