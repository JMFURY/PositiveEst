import * as signalR from '@aspnet/signalr';
const incrementCountType = 'INCREMENT_COUNT';
const decrementCountType = 'DECREMENT_COUNT';
const updateCountType = 'UPDATE_COUNT';
// const pullUpdateCountType = 'PULL_UPDATE_COUNT';
// const getNewRealtimeCountType = 'GET_NEW_REALTIME_COUNT';
const initialState = { count: 0 };



var transportType = signalR.TransportType.WebSockets;
//can also be ServerSentEvents or LongPolling
var thislogger = new signalR.ConsoleLogger(signalR.LogLevel.Information);
var counterHub = new signalR.HttpConnection(`http://${document.location.host}/realtimecounter`, { transport: transportType, logging: thislogger});
var counterConnection = new signalR.HubConnection(counterHub);

counterConnection.onclose = e => {
    console.log('connection closed');
};

counterConnection.on('Send', (message) => {
   console.log('received message');
   console.log(message);
   
});

counterConnection.start().catch(err => {
   console.log('connection error');
});
// export const actionCreators = {
//   increment: () => ({ type: incrementCountType }),
//   decrement: () => ({ type: decrementCountType }),
//   updateCount: value => (dispatch) => {
//     dispatch({ type: updateCountType, count: value });
//   }
// };
export const actionCreators = {
  increment: () => ({ type: incrementCountType }),
  decrement: () => ({ type: decrementCountType }),
  updateCount: value => (dispatch) => {
    counterConnection.invoke('Send', value );
    counterConnection.on('Send', (message) => {
      console.log('received message');
      console.log(message);
      dispatch({ type: updateCountType, count: message });
      
   });
   
  }

};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === incrementCountType) {
    return { ...state, count: state.count + 1 };
  }

  if (action.type === decrementCountType) {
    return { ...state, count: state.count - 1 };
  }
  if (action.type === updateCountType) {
    return { ...state, count: action.count };
  }
  // if (action.type === getNewRealtimeCountType) {
  //   return { ...state, count: action.count };
  // }

  return state;
};
