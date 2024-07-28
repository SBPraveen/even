const styles = {
    main: {
        width: '100%',
        bgcolor: 'primary.white',
        borderRadius: '8px',
        height: '5vh',
        minHeight: '30px',
        maxHeight: '50px',
        display: 'flex',
    },
    cardSection: {
        display: 'flex',
        height: '100%',
        flex: 1,
        overflow: 'scroll',
        scrollbarWidth: 'none',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '1rem',
    },
    buttonSection: {
        width: ['50%', '50%', '30%', '25%', '20%'],
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    buttonSectionButton: {
        width: 'calc(100% - 30px)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}

export default styles
