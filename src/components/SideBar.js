import React, { useState } from "react";
import ChatRoom from "./ui/ChatRoom";
import { LuMenu } from "react-icons/lu";

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`w-80 flex flex-row pt-14 ${isOpen ? '' : 'ml-[-276px] '}transition-all duration-300`}>
            <div className="w-full h-screen border-r border-slate-500 flex flex-col overflow-x-hidden overflow-y-auto">
                <ChatRoom key={1} />
                <ChatRoom key={2} />
                <ChatRoom key={3} />
            </div>
            <div className={`cursor-pointer h-11 w-11 flex justify-center items-center ${isOpen?"": ""} bg-slate-700 rounded-r-md border border-l-0 border-slate-500 mt-2`} onClick={() => setIsOpen(!isOpen)}>
                <h1 className="text-2xl text-white">{isOpen ? "X" : <LuMenu />}</h1>
            </div>
        </div>
    );
}
