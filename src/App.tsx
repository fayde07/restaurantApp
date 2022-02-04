import React, { useEffect, useState } from 'react';
import './App.css';
import ResLayout from './components/RestaurantLayout/ResLayout';
import { Rectangle } from './utils/classes/Rectangle';
import { db, auth } from './utils/firebase';
import { collectionGroup, collection, doc, getDoc, setDoc, onSnapshot, getDocs } from 'firebase/firestore';

//questions:
//how to handle posts and get data from collection; in app? or separate and import
//uuid for document id?
//here doc(db,'tables',"H0CsyvTqhFoOt65ks3G7"); it's pretty useless to pass the document id mannunally.
//how to get it whithout having it to pass it manually

const App: React.FC = () => {
  const rect = new Rectangle(300, 100, 10, 10, '#000');
  const rect2 = new Rectangle(250, 180, 10, 10, '#000');
  const [ restData, setRestData ]: any = useState<object[]>();

  const tables = collection(db, 'tables');

  // const tablesQuerySnapshot = async () => await getDocs(tables)
  // tablesQuerySnapshot().then((res)=>{
  //   res.docs.forEach((doc)=>console.log(doc.id,doc.data()))
  // }
  // );

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

  const docRef = doc(db, 'tables', 'H0CsyvTqhFoOt65ks3G7');
  const unsub = onSnapshot(docRef, (doc) => {
    console.log(doc.data());
  });
  // const data = onSnapshot(tables, (doc) => {
  //   doc.docs.map((item) => console.log(item.data()));
  // });

  const getData = async () => {
    const docSnap = await getDoc(docRef);

    // console.log(docSnap.get("tables"));

    // setRestData(docSnap.data());
    // console.log(docSnap.data());
  };

  // tot timpul cand adaug ceva, trebuie sa fac un reference la collection/documentId sa pun ceva.
  //nu ma pot folosi de un closure sa nu trebuiasca scriu tot timpul acelasi lucru?
  function addToTablesCollection(item: object){
    return async function postData(){
      await setDoc(doc(db, 'tables', 't3'), item);
    };
  }
  // const postData = async () => {
  //   await setDoc(doc(db, 'tables', 't2'), {
  //     maxSeats: 2,
  //     reservastion: new Date(),
  //     reservationName: 'raz',
  //     tableNr: 2,
  //   });
  // };
  // let fn1=addToTablesCollection({});
  // console.log(fn1());

  const handlePostData = () => {
    let data = addToTablesCollection({
      maxSeats: 6,
      reservastion: new Date(),
      reservationName: 'alexya',
      tableNr: 3,
    });
    data();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {/* [to do] add style to header*/}
      {/* [to do] header should contain: date, hour, table number, reserve button, firebase - login component*/}
      <header>some Header data</header>
      <ResLayout draw={draw} rect={rect} />
      <button onClick={handlePostData}>add some data</button>
      <div />
    </div>
  );
};

export default App;
