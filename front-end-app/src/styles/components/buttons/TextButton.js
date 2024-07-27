const styles = {
    main: (color, onHoverColor) => ({
        color,
        padding: 0,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'inherit',
            boxShadow: 'none',
            color: onHoverColor,
        },
    }),
}

export default styles
