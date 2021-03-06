import './App.css';
import Item from './Contents'
import React, {useState} from 'react';
import axios from 'axios';

export const todayTimeFormal = () =>{ // present time: yy/mm/dd/hh
  let now = new Date();
  let todayY = now.getFullYear();
  let todayM = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
  let todayD = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
  let hours = now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
  let minutes = now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
  let seconds = now.getSeconds() > 9 ? now.getSeconds() : '0' + now.getSeconds();
  return todayY + '-' + todayM + '-' + todayD + ' ' + hours + ':' + minutes + ':' + seconds;
}

function App() {
  // variables
  const [firstloading, setFirstLoading] = useState(true);

  const [Content, setContent] = useState({
    name: '',
    date: todayTimeFormal(),
    content: '',
  })

  const [viewContent, setViewContent] = useState([]);

  // util function
  const fetchGuest = async () => {
    console.log("Check fetch Guest!");
    const response = await axios({
    url: 'http://localhost:3001/data',
    method: "POST",
    data: {
      request: "INSERT",
      name: Content.name,
      date: Content.date,
      content: Content.content
    }
    });
    console.log(response.data); 
  };

  const eraseInput = e => {
    setContent({
      name: '', 
      date: '', 
      content: '',
    })
  }

  const getGuestInfoList = async() => {
    const response = await axios({
      url: 'http://localhost:3001/data',
      method: "POST",
      data: {
        request: "GUESTLIST"
      }
    });

    const data = response.data;
    console.log(data);
    setViewContent(data);
  }

  // main handler function
  const getValue = e => {
    const {name, value} = e.target;
    setContent({
      ...Content,
      [name] : value
    });
  };

  const handleClick = e => {
    setContent({
        ...Content,
      date: todayTimeFormal()
    });
    fetchGuest();
    eraseInput();
    setViewContent(viewContent.concat({...Content}));
  }

  if (firstloading){
    // view content ?????? 
    setFirstLoading(false);
    getGuestInfoList();
  }


  return (
    <div className="App">
      <h1>Guest Book</h1>
      <div className="form-wrapper">
        <input className="name" type='text' value={Content.name} placeholder="??????" onChange={getValue} name = 'name'/>
        <textarea className="content" value={Content.content} placeholder="????????? ?????? ??????" onChange={getValue} name = 'content'></textarea>
      </div>
      <button className="submit-button" onClick={handleClick}>?????????</button>
      
      {viewContent.map(e =>{
        return <Item Name = {e.name} Date = {e.date} Contents={e.content} />
      })}
    </div>
  );
}

export default App;
