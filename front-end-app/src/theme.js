import { createTheme } from '@mui/material'

export const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                disableFocusRipple: true,
                disableRipple: true,
            },
            styleOverrides: {
                root: () => ({
                    borderRadius: '8px',
                    color: theme.palette.text.light,
                    fontWeight: '650',
                    height: '4vh',
                    maxHeight: '40px',
                    minHeight: '20px',
                    minWidth: '100px',
                    paddingLeft: '0',
                    width: '8vw',
                }),
                startIcon: {
                    marginRight: '1vw', // Adjust the margin as needed
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: ({ theme }) => ({
                    background: theme.palette.primary.white,
                    borderRadius: '8px',
                    boxShadow: theme.shadows[2],
                    color: theme.palette.text.backgroundMatchDark,
                    height: '5vh',
                    maxHeight: '50px',
                    minHeight: '30px',
                    paddingBottom: '0px',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                }),
            },
            variants: [
                {
                    props: { size: 'small' },
                    style: {
                        width: '33%',
                    },
                },
                {
                    props: { size: 'medium' },
                    style: {
                        width: '60%',
                    },
                },
                {
                    props: { size: 'large' },
                    style: {
                        width: '100%',
                    },
                },
            ],
        },
        MuiTypography: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.main,
                    cursor: 'default',
                }),
            },
        },
    },
    palette: {
        consume: {
            main: '#FF005C',
        },
        fail: {
            chatBg: '#FFF2F8',
            light: '#EC867F',
            main: '#EE3124',
        },
        primary: {
            chat: '#FEF9F1',
            iconLight: '#FFC062',
            light: '#FFF4E5',
            main: '#FF9B05',
            tabs: '#FFFBF5',
            white: '#FFFFFF',
        },
        produce: {
            main: '#00FF0A',
        },
        secondary: {
            main: '#232F3D',
        },
        selected: {
            main: '#EAF7FF',
        },
        success: {
            chatBg: '#F4FFF2',
            light: '#7CC36A',
            main: '#1F9B00',
        },
        text: {
            backgroundMatch: '#A1927D',
            disabled: '#AFAFAF',
            light: '#FFFFFF',
            main: '#2E2E2E',
        },
    },
    shadows: [
        'none',
        '0px 1.6px 6px 0.4px rgba(209, 197, 180, 0.48)',
        '0px 4px 15px 1px rgba(209,197,180, 0.48)',
        '0px 4px 5.2px 1px rgba(209,197,180, 0.25)',
    ],
    typography: {
        button: {
            textTransform: 'capitalize',
        },
        fontFamily: 'Nunito, Arial, sans-serif',
    },
})
