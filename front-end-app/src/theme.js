import { createTheme } from "@mui/material";

export const theme = createTheme({
  shadows:[
    'none',
    '0px 1.6px 6px 0.4px rgba(209, 197, 180, 0.48)',
    '0px 4px 15px 1px rgba(209,197,180, 0.48)',
    '0px 4px 5.2px 1px rgba(209,197,180, 0.25)'
  ],
  palette: {
    primary: {
      main: "#FF9B05",
      light: "#FFF9F1",
      tabs: "#FFFBF5",
      white:"#FFFFFF"
    },
    secondary: {
      main: "#232F3D"
    },
    text: {
      main: "#2E2E2E",
      disabled: "#AFAFAF",
      light: "#FFFFFF",
      backgroundMatch: "#A1927D",
      backgroundMatchDark: "#897A65"
    },
    success: {
      main: "#1F9B00",
      light: "#7CC36A"
    },
    fail: {
      main: "#EE3124",
      light: "#EC867F"
    }
  },
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
    button: {
      textTransform: 'capitalize'
    }
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingBottom: "0px",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          boxShadow: theme.shadows[2],
          borderRadius: "8px",
          height: "5vh",
          minHeight: "30px",
          maxHeight: "50px",
          color: theme.palette.text.backgroundMatchDark,
        }),
      },

      variants: [
        {
          props: { size: 'small' },
          style: {
            width: "33%",
          },
        },
        {
          props: { size: 'medium' },
          style: {
            width: "60%"
          },
        },
        {
          props: { size: 'large' },
          style: {
            width: "100%"
          },
        },
      ]
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableFocusRipple: true,
      },
      styleOverrides: {
        root: () => (
          {
            borderRadius: "8px",
            width: "8vw",
            minWidth: "100px",
            color: theme.palette.text.light,
            fontWeight: "650",
            paddingLeft:"0",
            height: "4vh",
            minHeight: "20px",
            maxHeight: "40px",
          }
        ),
        startIcon: {
          marginRight: '1vw', // Adjust the margin as needed
        }
      },
    }
  }
})
