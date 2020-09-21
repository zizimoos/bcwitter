import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (argz) => user.updateProfile(argz),
        });
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        ></AppRouter>
      ) : (
        "Initializing ..."
      )}
      <footer>&copy; bcwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
