import React, { createContext, useState, useEffect } from "react";
import { store, retrive } from "../helpers/localStorage";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [score, setScore] = useState();
  const [level, setLevel] = useState();
  const [qariName, setQariName] = useState();
  const [jwt, setJWT] = useState();


  const setAndStoreJWT = async (token=null) => {
    setJWT(token);
    await store('jwt', token);
  };

  const setAndStoreQariName = async (name='menshawi') => {
    setQariName(name);
    await store('qariName', name);
  };

  const setAndStoreLevel = async (newLevel=0) => {
    setLevel(newLevel);
    await store('level', newLevel);
  };
  
  const setAndStoreScore = async (newScore=0) => {
    setScore(newScore);
    await store('score', newScore);
  };

  const init = async () => {
    const localScore = await retrive('score');
    if ( !localScore ) {
      setAndStoreScore(0);
    } else {
      setScore(localScore);
    }
    
    const localLevel = await retrive('level');
    if ( !localLevel ) {
      setAndStoreLevel(0);
    } else {
      setLevel(localLevel);
    }

    const localQariName = await retrive('qariName');
    if ( !localQariName ) {
      setAndStoreQariName('menshawi');
    } else {
      setQariName(localQariName);
    }

    const localJWT = await retrive('jwt');
    if ( !localQariName ) {
      setAndStoreJWT(null);
    } else {
      setJWT(localJWT);
    }
  };

  useEffect(() => {
    init();
  }, []);


  return (
    <UserContext.Provider value={{score, setScore: setAndStoreScore, level, setLevel: setAndStoreLevel,
     qariName, setQariName: setAndStoreQariName, jwt, setJWT: setAndStoreJWT }}>
        {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };