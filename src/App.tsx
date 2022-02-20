import "./App.css";
import React, { useContext, useEffect } from "react";

import { db, auth } from "./utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Outlet } from "react-router-dom";
import Nav from "./routes/Nav/Nav";
import { onAuthStateChanged, User } from "@firebase/auth";
import UserContext, { UserAuthContext } from "./contexts/UserContext";

const App: React.FC = () => {
  const { user, signUserIn } = useContext(UserAuthContext);
  // const providerValue = useMemo(() => ({ user, setUser }), [ user, setUser ]);

  // next line has to be used in useeffect, but it's verbose. getdoc-> query->collection->.then(res)->res.doc.map(doc)->doc.data sa imi afiseze documentele dintr-o collectie..
  // const theTables2: Promise<QuerySnapshot<DocumentData>> = getDocs(query(collection(db, 'tables'))).then((res) =>
  //   setTables(res.docs.map((doc) => doc.data())),
  // );

  // const tablesQuerySnapshot = async () => await getDocs(tables);
  // tablesQuerySnapshot().then((res) => {
  //   res.docs.forEach((doc) => console.log(doc.id, doc.data()));
  // });

  // tot timpul cand adaug ceva, trebuie sa fac un reference la collection/documentId sa pun ceva.
  //nu ma pot folosi de un closure sa nu trebuiasca scriu tot timpul acelasi lucru?
  function addToTablesCollection(item: object) {
    async function postData() {
      return await setDoc(doc(db, "tables", "t5"), item);
    }
    return postData();
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (signUserIn) {
        signUserIn({ currentUser });
      }
    });
    return unsub;
  }, [user]);

  return (
    <div className="App">
      <UserContext>
        <Nav />
        {/* [to do] add style to header*/}
        {/* [to do] header should contain: date, hour, table number, reserve button, firebase - login component*/}
        <Outlet />
      </UserContext>
    </div>
  );
};

export default App;
