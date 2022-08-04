import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomeDashboard } from "./pages/Home/Dashboard";
import { UserContext } from "./components/Context/UserContext";
import { IJwtToken, IUser } from "./types";
import ReservatiePage from "./pages/ReservatiePage/ReservatiePage";
import Header from "./components/Header/Header";
import styles from "./App.module.css";
import { UserNotFound } from "./components/404/NotFound";
import { SettingsPage } from "./pages/settingsPage/settingsPage";
import axios, { AxiosError, AxiosResponse } from "axios";
import { MakeReservationPage } from "./pages/MakeReservation/MakeReservation";
import { Checkin_checkout } from "./pages/Checkin-checkout/Checkin-checkout";
import { LoadingIndicator } from "./components/LoadingIndicator/LoadingIndicator";

let jwt = require("jsonwebtoken");

function App() {
  const [statusCode, setStatusCode] = useState<number>(404);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser>({
    id: "not provided",
    firstName: "not provided",
    lastName: "not provided",
    isAdmin: false,
    email: "not provided",
    languageUse: "not provided",
    hasAssingedSeat: false,
  });

  async function UserVerification(){
    //get request to azure app service for the id_token
    let user_id = await axios
      .get("https://workplace-reservations.azurewebsites.net/.auth/me", {
        headers:{
          "Content-Type": "application/json",
        }
      })
      .then((response) => {
        let jwtIdToken = response.data[0].id_token;
        let jwtTokenDecoded = jwt.decode(jwtIdToken) as IJwtToken; // decoding jwt payload 
        return jwtTokenDecoded.oid as string;

      }).catch((error) => console.log(error));

    //get request to sql db to find specific user by id
    await axios
      .get(`https://reservation-api.azurewebsites.net/api/user/get/${user_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: AxiosResponse) => {
        setStatusCode(response.status);
        setUser(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setStatusCode(error.response!.status);
        setLoading(false);
      });
  }

  useEffect(() => {   
    UserVerification();
  }, []);
  
  return (
    <div className={styles.container}>
      {/* loading change to false */}
      {false ? ( 
        <LoadingIndicator />
      ) : (
        <div className={styles.appContainer}>
          {/* 'statusCode === 404' change to false */}
          {false ? (
            <div className={styles.errorContainer}>
              <UserNotFound />
            </div>
          ) : (
            <UserContext.Provider value={{ user: user, setUser: setUser }}>
              <Router>
                <div className={styles.routerContainer}>
                  <Header />
                  <div>
                    <Switch>
                      <Route path="/make-reservation/"> 
                        <MakeReservationPage />
                      </Route>
                      <Route path="/my-reservations">
                        <ReservatiePage />
                      </Route>
                      
                      {/* user.isAdmin change to true */}
                      {user.isAdmin  && (
                        <Route path="/settings">
                          <SettingsPage />
                        </Route>
                      )}
                      <Route path="/scanned/:SeatID/:usersId">
                        <Checkin_checkout />
                      </Route>
                      <Route path="/layout">
                        {/*<Layout/>*/}
                      </Route>
                      <Route path="/">
                        <HomeDashboard />
                      </Route>
                      
                    </Switch>
                  </div>
                </div>
              </Router>
            </UserContext.Provider>
          )}
        </div>
      )}
    </div>
  );
}

export default App;