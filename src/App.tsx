import React, { useEffect, useState } from 'react';
import './App.css';
import ResLayout from './components/RestaurantLayout/ResLayout';
import { Rectangle } from './utils/classes/Rectangle';
import { db, auth } from './utils/firebase';
import {
  collectionGroup,
  addDoc,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  getDocs,
  query,
  collection,
  QuerySnapshot,
  DocumentData,
  CollectionReference,
} from 'firebase/firestore';
import { Outlet, NavLink } from 'react-router-dom';

const App: React.FC = () => {
  const rect = new Rectangle(300, 100, 10, 10, '#000');
  const rect2 = new Rectangle(250, 180, 10, 10, '#000');
  const [ tables, setTables ] = useState<any>([]);

  // next line has to be used in useeffect, but it's verbose. getdoc-> query->collection->.then(res)->res.doc.map(doc)->doc.data sa imi afiseze documentele dintr-o collectie..
  // const theTables2: Promise<QuerySnapshot<DocumentData>> = getDocs(query(collection(db, 'tables'))).then((res) =>
  //   setTables(res.docs.map((doc) => doc.data())),
  // );

  const tablesQuerySnapshot = async () => await getDocs(tables);
  tablesQuerySnapshot().then((res) => {
    res.docs.forEach((doc) => console.log(doc.id, doc.data()));
  });

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

  // tot timpul cand adaug ceva, trebuie sa fac un reference la collection/documentId sa pun ceva.
  //nu ma pot folosi de un closure sa nu trebuiasca scriu tot timpul acelasi lucru?
  function addToTablesCollection(item: object){
    async function postData(){
      return await setDoc(doc(db, 'tables', 't5'), item);
    }
    return postData();
  }

  useEffect(() => {}, []);

  return (
    <div className="App">
      <nav>
        <div className="logo">
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'activeNot')} to="/">
            <img src="logo192.png" alt="redirect-home" height="40px" width="40px" />
          </NavLink>
        </div>
        <div className="rest">
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'activeNot')} to="/home">
            Home
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'activeNot')} to="/about">
            About
          </NavLink>
        </div>
      </nav>
      {/* [to do] add style to header*/}
      {/* [to do] header should contain: date, hour, table number, reserve button, firebase - login component*/}
      <header>some Header data</header>
      <ResLayout draw={draw} rect={rect} />

      <div />
      <Outlet />
    </div>
  );
};

export default App;
