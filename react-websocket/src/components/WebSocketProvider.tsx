import React, { useRef } from "react";

const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = `ws://localhost:8080/chat`;
  let ws = useRef<WebSocket | null>(null);

  if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log("connected to " + webSocketUrl);
    };
    ws.current.onclose = (error) => {
      console.log("disconnect from " + webSocketUrl);
      console.log(error);
    };
    ws.current.onerror = (error) => {
      console.log("connection error " + webSocketUrl);
      console.log(error);
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
