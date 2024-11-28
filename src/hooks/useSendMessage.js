import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		if (!message.trim()) {
			toast.error("Message cannot be empty.");
			return;
		}
		if (!selectedConversation?.id) {
			toast.error("No conversation selected.");
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(
				`https://chat-app-backend-x04z.onrender.com/message/send/${selectedConversation.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({ message }),
				}
			);
            console.log(`http://localhost:8080/message/send/${selectedConversation.id}`)
			const contentType = res.headers.get("content-type");
			if (!res.ok || !contentType?.includes("application/json")) {
			  const errorText = await res.text();
			  throw new Error(`Unexpected response: ${errorText}`);
			}

			const data = await res.json();
			setMessages([...messages, data]);
		} catch (error) {
			console.error("Error sending message: ", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;
