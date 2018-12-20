# connected-react-socket

WIP: Lightweight Provider for socket.io connection for react-redux application


## Usage

### Connected

1. Add socket middleware with passing socket client 

```js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import io from "socket.io-client";
import { socketReducer, socketMiddleware } from "connected-react-socket";

export const socket = io();

const reducers = combineReducers({
  socket: socketReducer,
});

const store = createStore(
  reducers,
  compose(applyMiddleware(socketMiddleware(socket)))
);

export default store;
```

2. Wrap componet by `withSocket` HOC and use `socketEvent` prop

```js
const Display = props => {
  const { socketEvent } = props;
  return (
    <div>{socketEvent.type}</div> //Will print socket event name
  )
}

const ConnectedDisplay = withSocket(Display)
```

3. Add socket provider under the redux provider 

```html
...
<ReduxProvider store={store}>
  <ConnectedSocket socket={socket}>
    <ConnectedDisplay/>
  </ConnectedSocket>
</ReduxProvider>
...
```

