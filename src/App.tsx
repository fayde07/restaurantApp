import React, { useEffect, useState } from 'react';
import './App.css';
import ResLayout from './components/RestaurantLayout/ResLayout';
import { Rectangle } from './utils/classes/Rectangle';
import { db} from './utils/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

//questions:
//how to handle posts and get data from collection; in app? or separate and import
//uuid for document id? 
//here doc(db,'tables',"H0CsyvTqhFoOt65ks3G7"); it's pretty useless to pass the document id mannunally. 
//how to get it whithout having it to pass it manually


const App: React.FC = () => {
  const rect = new Rectangle(300, 100, 10, 10, '#000');
  const rect2 = new Rectangle(250, 180, 10, 10, '#000');
  const [restData, setRestData]:any = useState()

  const draw = (ctx: any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(20, 0, 30, 60);

    ctx.fillStyle = '#000000';
    ctx.fillRect(80, 0, 30, 60);

    ctx.fillStyle = '#000000';
    ctx.fillRect(140, 0, 30, 60);

    ctx.fillStyle = '#000000';
    ctx.fillRect(90, 100, 30, 30);

    ctx.fillStyle = '#000000';
    ctx.fillRect(150, 100, 30, 30);

    ctx.fillStyle = 'rgb(200,200,200)';
    ctx.fillRect(210, 0, 90, 90);

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(40, 110, 22, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    rect.draw(ctx);
    rect2.draw(ctx);
  };

  const docRef = doc(db,'tables',"H0CsyvTqhFoOt65ks3G7");
  const getData = async ()=>{
    const docSnap = await getDoc(docRef)
    setRestData(docSnap.data())
    // console.log(docSnap.data());
    
  }
  const postData = async ()=>{
    await setDoc(doc(db,"tables","t2"),{
      maxSeats:2,
      reservastion:null,
      reservationName:'raz',
      tableNr:2,
    })
  }

 const handlePostData= ()=> postData();

  useEffect(()=>{
    getData();
  },[]) 
  

  console.log(restData);
  
  return (
    <div className="App">
      {/* [to do] add style to header*/}
      {/* [to do] header should contain: date, hour, table number, reserve button, firebase - login component*/}
      <header>some Header data</header>
      <ResLayout draw={draw} rect={rect} />
      <button onClick={handlePostData}>add some data</button>
    </div>
  );
};

export default App;
