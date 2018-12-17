/* eslint-disable */
import io from "socket.io-client";

const socket1 = io("http://localhost:8081");
const socket2 = io("http://localhost:8081");

socket1.on("connect", () => {
  console.log("Connect");
});

socket2.on("connect", () => {
  console.log("Connect");
});

export { socket1, socket2 };
