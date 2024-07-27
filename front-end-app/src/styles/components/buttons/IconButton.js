const styles = {
    main: (style, width, buttonBackground, iconColor) => ({
        ...(style && { ...style }),
        ...(width && { width }),
        bgcolor: buttonBackground,
        '&:hover': {
            bgcolor: buttonBackground,
            boxShadow: 'none',
        },
        '& .MuiButton-startIcon': {
            color: iconColor,
        },
    }),
}

export default styles
