import Head from "next/head";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const Bubble: React.FC<{
  text: string;
  sent: boolean;
}> = ({ text, sent = true }) => {
  return (
    <>
      {sent ? (
        <div className="font-poppins inline-block max-w-[400px] relative bg-fb-blue px-4 py-3 rounded-3xl self-start text-white drop-shadow-lg mb-2">
          {text}
        </div>
      ) : (
        <div className="font-poppins inline-block max-w-[400px] relative bg-fb-gray px-4 py-3 rounded-3xl self-start text-black drop-shadow-lg mb-2">
          {text}
        </div>
      )}
    </>
  );
};

const SCALE_IN_PX = 5;
const WIDTH = SCALE_IN_PX * 9;
const HEIGHT = SCALE_IN_PX * 16;

type ChatData = {
  text: string;
  sent: boolean;
};

export default function Home() {
  const [isSending, setIsSending] = useState<boolean>(true);
  const [activeChat, setActiveChat] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatData[]>([
    { text: "sent", sent: true },
    { text: "received", sent: false },
  ]);

  const handleTyping = (e: any) => {
    if (e.target.value[0] === "!") return;
    setActiveChat(e.target.value);
  };

  const handleEnter = (e: any) => {
    const value = e.target.value.trim();
    if (value === "") return;

    if (e.key === "Enter") {
      if (value === "!clear") {
        setChatHistory([]);
        setActiveChat("");
        e.target.value = "";
        return;
      } else if (value === "!!") {
        setIsSending((prev) => !prev);
        setActiveChat("");
        e.target.value = "";
        console.log("sending?", isSending);
        return;
      }

      setChatHistory((prev) => {
        let newHistory = prev.slice();
        newHistory.push({ text: value, sent: isSending });
        return newHistory;
      });

      setActiveChat("");
      e.target.value = "";
      return;
    }
  };

  return (
    <>
      <main className="bg-fb-white w-mobile-width h-mobile-height border-black border-2 m-4 p-4 flex flex-col justify-end overflow-hidden">
        <div className="flex flex-col">
          {chatHistory.map((e, idx) => (
            <div key={idx} className={`${e.sent ? "self-end" : "self-start"}`}>
              <Bubble text={e.text} sent={e.sent} />
            </div>
          ))}

          {activeChat.length > 0 && (
            <>
              {isSending ? (
                <div className="self-end">
                  <Bubble text={activeChat} sent={isSending} />
                </div>
              ) : (
                <div className="self-start">
                  <Bubble text="•••" sent={isSending} />
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <input
        className="border-black border-2"
        onKeyDown={handleEnter}
        onChange={handleTyping}
        type="text"
      />
    </>
  );
}
