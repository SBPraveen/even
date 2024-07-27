const styles = {
    endAdornment: {
        color: 'text.disabled',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    main: {
        '& .MuiInputBase-input': {
            padding: '0px',
        },
        '& textarea': {
            scrollbarWidth: 'none' /* Firefox */,
            '&::-webkit-scrollbar': {
                display: 'none' /* Safari and Chrome */,
            },
        },
    },
}

export default styles
