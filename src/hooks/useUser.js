import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase.config";
import { useEffect, useState } from "react";
import axios from "axios";

const useUser = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);
  return [user];
};

export default useUser;
