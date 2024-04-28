import { useContext, useRef, useState, useEffect } from "react";
import Button from "./ui/Button";
import TextArea from "./ui/TextArea";
import { LuSendHorizonal, LuSmile, LuAngry, LuAnnoyed, LuLaugh, LuFish, LuFlame, LuFrown, LuGlobe2, LuZap } from 'react-icons/lu'
import Picker from "@emoji-mart/react";
import data from '@emoji-mart/data'
import AppContext from "../context/AppContext";
import { getFirestore, collection, orderBy, limit, query, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";
import ButtonLoader from "./ui/ButtonLoader";

function ChatMessage(props){
    const app = useContext(AppContext);
    const auth = getAuth(app);
    const user = auth.currentUser;
    const sent = "text-xl text-white bg-sky-500 p-2 rounded-md";
    const received = "text-xl text-white bg-rose-500 p-2 rounded-md";
    const sentCont = "justify-start flex-row flex-row-reverse";
    const recCont = "";
    const msgClass = props.message.uid === user.uid ? sent : received;
    const msgCont = props.message.uid === user.uid ? sentCont : recCont;

    return (
        <div className={`w-full flex pr-5 pl-5 mb-1 ${msgCont}`}>
            <img src={props.message.photo} alt="pfp" className="h-12 rounded-md ml-2 mr-2"/>
            <p className={msgClass}>{props.message.text}</p>
        </div>
    );
}

export default function Chat(){
    const app = useContext(AppContext);
    const [emojiCount, setEmojiCount] = useState(0);
    const [hasCountIncreased, setHasCountIncreased] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const [text, setText] = useState('');
    const [buttonClicked, setClicked] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const emojis = [<LuAngry/>, <LuAnnoyed/>, <LuLaugh/>, <LuSmile/>, <LuFish/>, <LuFlame/>, <LuFrown/>, <LuGlobe2/>, <LuZap/>];
    const db = getFirestore(app);
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy("createdAt"), limit(50));
    const [messages] = useCollectionData(q, {idField: 'id'});
    const auth = getAuth(app);
    const bottom = useRef();

    const handleMouseEnter = () => {
        if (!hasCountIncreased) {
            setEmojiCount(prev => prev + 1);
            setHasCountIncreased(true);
        }
    };

    const handleMouseLeave = () => {
        setHasCountIncreased(false);
    };

    const handleEmojiSelect = (emoji) => {
        setText(prevText => prevText + emoji.native);
    };   
    
    const handleMessageSubmit = async ()=>{
        if (text){
            await setIsloading(true);
            const {uid, photoURL} = auth.currentUser;
            await setDoc(doc(collection(db, 'messages')), {
                uid: uid,
                text: text,
                createdAt: serverTimestamp(),
                photo: photoURL
            })
            setText("");
            bottom.current.scrollIntoView({behavior: 'smooth'})
            await setIsloading(false);
        }
    }

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         bottom.current.scrollIntoView({ behavior: 'smooth' });
    //     }, 100);
    
    //     return () => clearTimeout(timeout);
    // }, []);
    
    

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          handleMessageSubmit()
        }
    }

    return(
        <div className="w-full h-full flex justify-center overflow-y-auto">
            <div className="w-full mt-16 mb-12">
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={bottom} className="h-12"></div>
            </div>

            {showEmojis && <div className=" absolute h-screen w-screen flex justify-center items-center"><Picker data={data} onEmojiSelect={handleEmojiSelect} onClickOutside={()=>{if (!buttonClicked) setShowEmojis(false); setClicked(false);}} categories={['frequent', 'people', 'nature', 'foods', 'activity', 'places', 'objects', "symbols"]} /></div>}
            <div className=" w-3/4 max-w-full bg-slate-700 border-r border-t border-l border-slate-500 rounded-t-md absolute bottom-0 flex items-center p-1">
                <button className={`text-3xl flex justify-center hover:scale-110 transition-all duration-150 mr-1 ml-1 ${emojiCount % 2 === 0 ? "text-sky-500" : "text-rose-600"}`} 
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => {setShowEmojis(!showEmojis); setClicked(true)}}>
                    {emojis[emojiCount % emojis.length]}
                </button>
                <TextArea value={text} onChange={(e) => setText(e.target.value)} className={'w-[90%] pr-2'} placeholder={'Type a message . . .'} onKeyPress={handleKeyPress}/>
                <Button disabled={isLoading} className={'w-[10%] flex justify-center ml-1 hover:ml-2 hover:mr-2 taxt-xl'} onClick={handleMessageSubmit} onKeyPress={handleKeyPress}>{isLoading ? <ButtonLoader/> : <LuSendHorizonal/>}</Button>
            </div>
        </div>
    );
}