import { SxProps } from "@mui/system";
import colorTheme from "../../../colorTheme.json";

/**
 * SCREEN BREAKPOINTS:
 * sm: 340px,
 * md: 768px,
 * lg: 1024px,
 * xl: 1280px,
 * 2xl: 1536px,
 * 3xl: 1800px
 */

export const boxStyle: SxProps = {
  width: "100%",
  minHeight: "90%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  "@media screen and (max-width: 768px)": {
    width: "100%",
  },
  "@media screen and (min-width: 1024px)": {
    width: "60%",
  },
  "@media screen and (min-width: 1536px)": {
    width: "40%",
  },
};

export const titleStyle :SxProps ={
    paddingY: '5px',
    fontSize: '1.5rem',
    marginX: 'auto',
}
export const dividerStyle:SxProps={
    backgroundImage: `linear-gradient(to right, #fff, ${colorTheme.light.headerHoverEffectColor}, #fff)`,
    height: '1px',
    marginY: '.5rem',
}

export const textFieldsStyle :SxProps ={ 
    paddingY: '5px',
    marginY: '.5rem'
}

export const buttonStyle:SxProps={
    color: '#000', 
    border: '1px solid black',
    marginY: '.5rem',
    height: '56px'
}
