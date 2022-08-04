import { SxProps } from "@mui/system";
import colorTheme from "../../colorTheme.json";

export const boxStyle: SxProps = {
  flexGrow: 1,
  bgcolor: "background.paper",
  display: "flex",
  width: "80%",
  height: "90%",
  minHeight: "90vh",
  margin: "15px auto",
  "@media screen and (max-width: 1020px)": {
    width: "100%",
  },
};

export const tabListStyle: SxProps = {
  width: "18rem",
  borderRight: 1,
  borderColor: `${colorTheme.light.headerHoverEffectColor}`,
  "@media screen and (max-width: 1020px)": {
    width: "14rem",
  },
};

export const tabStyle: SxProps = {
  padding: "3px",
  "@media screen and (max-width: 1020px)": {
    margin: "0 0 10px 0",
  },
};

export const AddUserPanelStyle: SxProps = {
  width: '100%',
  minHeight: '90%',
}

export const reservationStyle: SxProps = {
  width :'100%',
  minHeight: '90%'
}

export const logTableStyle: SxProps = {
  width :'100%',
  minHeight: '90%'
}

export const addSeatTab: SxProps = {
  width :'100%',
  minHeight: '90%'
}
