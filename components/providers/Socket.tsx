
import React, { useState, useEffect, createContext } from 'react';
import openSocket from 'socket.io-client';
import { baseServerUrl } from "../../secret";

const SocketContext = createContext<SocketIOClient.Socket>(null);

const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(openSocket(baseServerUrl));

	useEffect(() => {
		socket.on('connect', () => {
			console.log("connected")
		});
	}, [socket])

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export { SocketContext, SocketProvider };