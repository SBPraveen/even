import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
          main: "#FF9B05",
          light:"#FFF9F1",
          tabs:"#FFFBF5"
        },
        secondary:{
          main: "#232F3D"
        },
        text:{
          main:"#2E2E2E",
          disabled:"#AFAFAF",
          light:"#FFFFFF",
          backgroundMatch:"#A1927D"
        },
        success:{
          main: "#1F9B00",
          light: "#7CC36A"
        },
        fail:{
          main:"#EE3124",
          light:"#EC867F"
        }
      },
      typography: {
        fontFamily: 'Nunito, Arial, sans-serif',
      },
})
