import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  console.log(authUser.user.id);
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser?.user.id;

  console.log("Message Sender ID:", message.senderId);
  console.log("Authenticated User ID:", authUser.user.id);
  console.log("Type of Sender ID:", typeof message.senderId);
  console.log("Type of Authenticated User ID:", typeof authUser.id);
  console.log("From Me:", fromMe);

  const formattedTime = extractTime(message.createdAt);

  
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  
  const profilePic = fromMe
    ? authUser?.user?.avatar
    : selectedConversation?.avatar;


  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300";

  
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Avatar" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
