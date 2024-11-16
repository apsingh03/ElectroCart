import React, { createContext, useContext, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const BACKENDPOINT = process.env.REACT_APP_BACKENDHOSTNAME;
    const socket = socketIOClient(BACKENDPOINT, { transports: ["websocket"] });
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
