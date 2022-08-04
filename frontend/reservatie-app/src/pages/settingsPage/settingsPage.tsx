import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { AddUserTab } from "../../components/TabPanels/AddUserTab/AddUserPanel";
import {
  boxStyle,
  tabListStyle,
  tabStyle,
  AddUserPanelStyle,
  reservationStyle,
  logTableStyle,
  addSeatTab
} from "./settingsPageStyling";
import ReservatieLijst from "../../components/ReservatieList/ReservatieList";
import VastePlaats from "../../components/TabPanels/VastePlaatsTab/VastePlaats";
import VastePlaatsVerwijderen from "../../components/TabPanels/VastePlaatsVerwijderenTab/VastePlaatsVerwijderen";
import MaxReservations from "../../components/TabPanels/MaxReservationsTab/MaxReservations";
import LogTabel from "../../components/LogTabel/LogTabel";
import { DeleteUserTab } from "../../components/TabPanels/DeleteUserTab/DeleteUser";
import { CancelReservationTime } from "../../components/TabPanels/CancelReservationTimeTab/CancelReservationTime";
import { AddWorkplace } from "../../components/TabPanels/Workplace/AddWorkplace/AddWorkplace";
import { DeleteWorkplace } from "../../components/TabPanels/Workplace/DeleteWorkplace/DeleteWorkplace";
import AddSeatMap from "../../components/TabPanels/AddSeatMap/AddSeatMap";

/**
 * ADDING NEW TABS & TABPANELS
 *  1. Add new tab in TabList (see comment below)
 *  2. Add new tabpanel, make sure the value of the tab and tabpanel are the same
 *  3. Add new component-file in Tabpanels folder in Components (import and add)
 */

export const SettingsPage = () => {
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
    <Box sx={boxStyle}>
      <TabContext value={value}>
        <TabList
          orientation="vertical"
          variant="fullWidth"
          value={value}
          onChange={handleMainTabChange}
          aria-label="main menu tabs"
          sx={tabListStyle}
        >
          <Tab
            label="Maximum bezettingsgraad instellen"
            sx={tabStyle}
            value="1"
          />
          <Tab label="Reservatie log opvragen" sx={tabStyle} value="2" />
          <Tab
            label="Reservatie annuleer tijd instellen"
            sx={tabStyle}
            value="3"
          />
          <Tab label="Nieuwe gebruiker toevoegen" sx={tabStyle} value="4" />
          <Tab label="Gebruiker verwijderen" sx={tabStyle} value="5" />
          <Tab label="Vaste plaats toekennen" sx={tabStyle} value="6" />
          <Tab label="Vaste plaats verwijderen" sx={tabStyle} value="7" />
          <Tab label="logs opvragen" sx={tabStyle} value="8" />
          <Tab
            label="Werkplek toevoegen/verwijderen"
            sx={tabStyle}
            value="9"
          ></Tab>
          <Tab label="Stoel toevoegen" sx={tabStyle} value="10"></Tab>
          {/* <Tab label="[Add New Tab]" sx={tabStyle} value="[last+1]"></Tab> */}
        </TabList>
        <TabPanel value="1" sx={logTableStyle}>
          <MaxReservations />
        </TabPanel>
        <TabPanel value="2" sx={reservationStyle}>
          <ReservatieLijst />
        </TabPanel>
        <TabPanel value="3" sx={logTableStyle}>
          <CancelReservationTime />
        </TabPanel>
        <TabPanel value="4" sx={AddUserPanelStyle}>
          <AddUserTab title={"Nieuwe gebruiker toevoegen"} />
        </TabPanel>
        <TabPanel value="5">
          <DeleteUserTab />
        </TabPanel>
        <TabPanel value="6" sx={logTableStyle}>
          <VastePlaats />
        </TabPanel>
        <TabPanel value="7" sx={logTableStyle}>
          <VastePlaatsVerwijderen />
        </TabPanel>
        <TabPanel value="8" sx={logTableStyle}>
          <LogTabel />
        </TabPanel>
        <TabPanel value="9" sx={{...logTableStyle}}>
          <TabContext value={workplaceTabContextValue}  >
            <TabList
              value={value}
              orientation="horizontal"
              aria-label="workplace tabs"
              sx={{border: '1px solid #283747', borderRadius: '5px'}}
              onChange={handleWorkplaceTabChange}
            >
              <Tab label="Werkplek Toevoegen" value="9.1"></Tab>
              <Tab label="Werkplek Verwijderen" value="9.2"></Tab>
            </TabList>
            <TabPanel value="9.1">
              <AddWorkplace />
            </TabPanel>
            <TabPanel value="9.2">
              <DeleteWorkplace />
            </TabPanel>
          </TabContext>
        </TabPanel>
        <TabPanel value="10" sx={addSeatTab}>
          <AddSeatMap/>
        </TabPanel>
        {/* <TabPanel value="[tab value]"></TabPanel> */}
      </TabContext>
    </Box>
  );
};
