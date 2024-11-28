import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import notification from '../assets/sound/notification.mp3'
import useConversation from "../zustand/useConversation";


const useListenMessages = () => {
	const { socket } = useSocketContext();
	const {messages , setMessages} = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notification);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;