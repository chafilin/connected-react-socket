[![Build Status](https://travis-ci.org/chafilin/connected-react-socket.svg?branch=master)](https://travis-ci.org/chafilin/connected-react-socket)
[![npm version](https://badge.fury.io/js/connected-react-socket.svg)](https://badge.fury.io/js/connected-react-socket)
[![Coverage Status](https://coveralls.io/repos/github/chafilin/connected-react-socket/badge.svg)](https://coveralls.io/github/chafilin/connected-react-socket)

# connected-react-socket

Lightweight Provider for socket.io connection for react-redux application

## Usage

install it by

```
npm i --save connected-react-socket
```

### ConnectedSocket

Add socket middleware with passing socket client

```js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import io from "socket.io-client";
import { socketReducer, socketMiddleware } from "connected-react-socket";

export const socket = io();

const reducers = combineReducers({
  socket: socketReducer
});

const store = createStore(
  reducers,
  compose(applyMiddleware(socketMiddleware(socket)))
);

export default store;
```

Then wrap componet by `withSocket` HOC and use `socketEvent` prop

```js
const Display = props => {
  const { socketEvent } = props;
  return (
    <div>
      <!-- Will print socket event name-->
      <div>{socketEvent.type}</div>
      <!-- Let's print recieved messages -->
      <div>{socketEvent && socketEvent.data.join(",")}</div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    socketEvent: state.socket
  };
};
const mapDispatchToProps = dispatch => {
  return {
    emit: (type, ...message) => dispatch(emitMessage(type, message))
  };
};
const ConnectedDisplay = connect(
  mapStateToProps,
  mapDispatchToProps
)(Display);
```

Last one: dd socket provider under the redux provider

```xml
...
<ReduxProvider store="{store}">
  <ConnectedSocket socket="{socket}"> <ConnectedDisplay /> </ConnectedSocket>
</ReduxProvider>
...
```

### SocketProvider

Create component and wrap it with HOC

```js
const Display = props => {
  const { socketEvent } = props;
  return (
    <div>
      <!-- Will print socket event name-->
      <div>{socketEvent.type}</div>
      <!-- Let's print recieved messages -->
      <div>{socketEvent && socketEvent.data.join(",")}</div>
    </div>
  );
};

const DisplayEvent = withSocket(Display);
```

And add socket provider

```xml
<SocketProvider socket={socket}>
  <DisplayEvent name="WithSocket" />
</SocketProvider>
```
