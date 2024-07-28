const styles = {
    main: (onHoverColor, color) => ({
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent',
            '& .MuiSvgIconRoot': {
                color: onHoverColor,
            },
        },
        '& .MuiSvgIconRoot': {
            color,
        },
    }),
}

export default styles
