import Chat from "../components/Chat";
import SideBar from "../components/SideBar";

export default function Home(){
    return (
    <div className="bg-slate-800 h-screen w-screen absolute top-0 overflow-hidden flex flex-row">
        <SideBar></SideBar>
        <div className=" w-full">
            <Chat/>
        </div>
    </div>);
}