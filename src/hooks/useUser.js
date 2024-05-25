import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase.config";
import { useEffect, useState } from "react";

const useUser = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  
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
