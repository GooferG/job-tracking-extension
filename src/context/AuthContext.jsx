import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logout,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { format } from "date-fns";

import { mainNav } from "../constants/nav";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [selectedNav, setSelectedNav] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const createUser = (email, password, firstName) => {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      addData(`users`, res?.user?.uid, { email, firstName });
      setIsLoggedIn(true);
    });

    return;
  };

  const signIn = (email, password) => {
    if (chrome?.storage) {
      chrome.storage.sync.set({ isLoggedIn: true });
    } else {
      setIsLoggedIn(true);
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const requestPasswordResetEmail = (email) => {
    sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    });
  };

  const signOut = () => {
    chrome.storage.sync.set({ isLoggedIn: false });
    setIsLoggedIn(false);
    return logout(auth);
  };

  const addData = async (path, uid, data) => {
    const userRef = doc(db, path, uid);
    setDoc(userRef, data, { merge: true });
  };

  const getData = async (path, uid) => {
    if (db && path && uid) {
      const docRef = doc(db, path, uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
      }
    }
  };

  const updateData = () => {
    getData(`users`, user?.uid).then((res) => setData(res));
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (chrome?.storage && currentUser?.id) {
        chrome.storage.sync.set({ isLoggedIn: true });
      }
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    if (user?.uid) {
      updateData();
    }

    return () => {
      setData({});
    };
  }, [user]);

  useEffect(() => {
    if (chrome?.storage) {
      chrome.storage.sync.get((result) => {
        const today = Date.now();

        if (result?.lastUsed) {
          const formattedToday = format(today, "MM/dd/yy");
          const formatLastUsed = format(result.lastUsed, "MM/dd/yy");

          return formattedToday === formatLastUsed
            ? setSelectedNav(mainNav.Apply)
            : setSelectedNav(mainNav.Dashboard);
        } else {
          setSelectedNav(mainNav.Dashboard);
        }
      });
    } else {
      setSelectedNav(mainNav.Dashboard);
    }
  }, []);

  useEffect(() => {
    if (chrome?.storage) {
      chrome?.storage.sync.get((result) => {
        setIsLoggedIn(result.isLoggedIn);
      });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        signOut,
        signIn,
        addData,
        requestPasswordResetEmail,
        isLoading,
        data,
        updateData,
        setData,
        selectedNav,
        setSelectedNav,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
