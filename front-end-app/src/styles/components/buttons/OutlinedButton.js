const styles = {
    main: (color, width) => ({
        borderColor: color,
        color,
        ...(width && { width }),
        '&:hover': {
            backgroundColor: 'inherit',
            boxShadow: 'none',
            borderColor: 'inherit',
        },
    }),
}

export default styles
