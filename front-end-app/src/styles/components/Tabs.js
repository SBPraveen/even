const styles = {
    main: {
        width: '100%',
        minHeight: '25px',
        maxHeight: '50px',
        height: '2%',
        display: 'flex',
        boxShadow: 3,
        bgcolor: 'primary.tabs',
    },
    tabsSection: {
        display: 'flex',
        height: '100%',
        maxWidth: '95%',
        overflow: 'scroll',
        scrollbarWidth: 'none',
    },
    tabMain: {
        height: '100%',
        display: 'flex',
        cursor: 'pointer',
    },
    tabSection1: {
        width: '10vw',
        minWidth: '150px',
        maxWidth: '350px',
        height: '100%',
        display: 'flex',
        cursor: 'pointer',
    },
    tabIcon: {
        height: '100%',
        width: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabTextMain: {
        height: '100%',
        width: '75%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    tabText: {
        width: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: 'block',
        color: 'text.disabled',
    },
    tabClose: {
        height: '100%',
        width: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabsAdd: {
        flex: '1',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
    },
}

export default styles
