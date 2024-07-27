const styles = {
    main: (onHoverColor, color) => ({
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent',
            '& .MuiSvgIcon-root': {
                color: onHoverColor,
            },
        },
        '& .MuiSvgIcon-root': {
            color,
        },
    }),
}

export default styles
