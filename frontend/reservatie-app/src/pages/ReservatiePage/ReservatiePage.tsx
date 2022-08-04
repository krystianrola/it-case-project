import {BrowserRouter as Router, Redirect, Route, Switch  } from "react-router-dom";
import { Box, Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import ReservatieHeader from "../../components/ReservatieList/ReservatieHeader";
import  ReservatieLijst, { Geanulleerde_reservatieLijst } from "../../components/ReservatieList/ReservatieList";
import { useState } from "react";






const ReservatiePage = () => {

  const [value, setValue] = useState<string>("1");
  const [workplaceTabContextValue, setWorkplaceTabContextValue] =
    useState<string>("9.1");

  const handleMainTabChange = (
    event: React.SyntheticEvent,
    newTabValue: string
  ) => {
    setValue(newTabValue);
  };

  const handleWorkplaceTabChange = (
    event: React.SyntheticEvent,
    newTabValue: string
  ) => {
    setWorkplaceTabContextValue(newTabValue);
  };



  return (
    <Box>
      <TabContext value={value}>
        <TabList orientation="horizontal" value={value} variant="fullWidth" onChange={handleMainTabChange}>
          <Tab label="Mijn reservaties" value="1"/>
          <Tab label="Mijn geannuleerde reservaties" value="2"/>
        </TabList>
        <TabPanel value="1">
        <ReservatieLijst />
        </TabPanel>
        <TabPanel value="2">
        <Geanulleerde_reservatieLijst/>
        </TabPanel>
      </TabContext>
    </Box>





    
  );
};

export default ReservatiePage;


/*
    <Router>
      <Redirect to="/reservations" />
    <div>
      <ReservatieHeader/>
      <div>
        <Switch>
          <Route path="/reservations">
          <ReservatieLijst />
        </Route>
        <Route path="/Geannuleerde_ReservatieLijst">
          <Geanulleerde_reservatieLijst/>
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
    */
