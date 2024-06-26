import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { interviewAction } from "../redux/slice/interviewSlice";
import "./Github.css";

const MessagesCard = ({message, index}) => {
  if(!(index&1)){
    return ( 
      <div className="message-card message-card-left" >
      
      {message}

      </div>)
  }
  return (
    <div className= "message-card message-card-right">
        
        {message}

    </div>
)
}

const GithubChat = () => {

  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [level , setLevel] = useState("");
  const [stack , setStack] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState("");

  const chatRef = useRef("");

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);


  const {chat} = useSelector((state) => state.fitbotChat);


  useEffect(() => {
    setMessages([...messages, chat?.message])
  },[chat])
 

  const sendMessagefunction = async () => {
    if(questionAnswer.length>0)messages.push(questionAnswer);
    setQuestionAnswer("");
    await dispatch(interviewAction({questionAnswer,stack,level}));
    setLevel("");
    
    setStack("");
  };

 

  return (
    < div className="fit-bot-body"> 

      
      <div className="chat-box">
        <div className="chat-box-header">CrossFit Chats</div>
          <div ref={chatRef} className="chat-box-body">
            {messages.map((item, i) => (
              <MessagesCard key ={i} message={item} index={i} />
            ))}
          </div>
          <div className="chat-box-footer">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessagefunction();
                }
              }}
              value={questionAnswer}
              onChange={(e) => {
                setQuestionAnswer(e.target.value);
              }}
              type="text"
              placeholder="Ask a question..."
            />
           <button onClick={sendMessagefunction}>Send</button>
          </div>
        </div>
        <div className="fitbot-right">
            <h1 className="fitbot-right-head">FitBot</h1>
            <p className="fitbot-right-desc">Introducing FitBot - your personal AI assistant that can help you with all your fitness and day-to-day queries. With advanced machine learning algorithms, FotBot provides accurate and personalized solutions in real-time. Whether you need workout routines, healthy eating tips, or guidance on managing your daily schedule, FitBot has got you covered. Interact with FotBot through a simple and user-friendly interface, and customize your experience by setting your goals and preferences. FotBot is here to make your life easier, healthier, and more balanced.</p>
            <h3 className="fitbot-hashtag">#GetFitterWithFotBot</h3>
       </div>
       <div className="container">
        <div className="dropdown">
            <select 
              onChange={(e) => {
                setLevel(e.target.value);
              }} value ={level}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advances">Advanced</option>
            </select>
        </div>
        <div className="dropdown">
            <select
              onChange={(e) => {
                setStack(e.target.value);
              }} value ={stack}>
                <option value="Full Stack Dev">Full Stack Developer</option>
                <option value="Backend Dev">Backend</option>
                <option value="Frontend Dev">Frontend</option>
                <option value="Software Developer Engieer">Software Developer</option>
                <option value="Machine learning Dev">Machine learning</option>
            </select>
        </div>
        <button onClick={sendMessagefunction}>Submit</button>
    </div>
      </div>
    
  );
};

export default GithubChat;