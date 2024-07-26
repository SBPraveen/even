const styles = {
    main: (theme, onClose, boxOutline) => ({
        boxShadow: boxOutline ? 0 : 1,
        border: boxOutline
            ? `1px solid ${theme.palette.primary.iconLight}`
            : 'none',
        borderRadius: '3px',
        bgcolor: 'primary.tabs',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: '1.5rem',
        paddingLeft: '0.5rem',
        paddingRight: onClose ? '0' : '0.5rem',
    }),
    textSection: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'block',
        color: 'text.disabled',
        maxWidth: '130px',
    },
    text: {
        cursor: 'pointer',
        color: 'text.backgroundMatch',
    },
}

export default styles
