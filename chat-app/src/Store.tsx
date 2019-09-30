import React from "react";
import io from "socket.io-client";


// INTERFACES AND TYPES

interface MessageInterface {
  from: string;
  msg: string;
}

interface ActionPayloadInterface {
  from: string;
  msg: string;
  topic: TopicsType;
}

interface Action {
  type: string;
  payload: ActionPayloadInterface;
}

type TopicsType = "General" | "Tech" | "StartUps" | "Economy";

type DiscussionType = {
  [key in TopicsType]: MessageInterface[];
};

// BUSINESS LOGIC

export const CTX = React.createContext<any>(null);

const initialState: DiscussionType = {
  General: [],
  Tech: [],
  StartUps: [],
  Economy: []
};

export function reducer(state: DiscussionType, action: Action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVED_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
}

let socket: SocketIOClient.Socket;

const sendChatAction = (value: string) => {
  socket.emit("chat message", value);
};

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

const userId = getRandomInt(400);

export default function Store(props: any) {
  const [allChats, dispatch] = React.useReducer(reducer, initialState);

  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(message: ActionPayloadInterface) {
      dispatch({ type: "RECEIVED_MESSAGE", payload: message });
    });
  }

  const user = "user" + userId;

  const AppContextProvider = CTX.Provider;

  return (
    <AppContextProvider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </AppContextProvider>
  );
}
