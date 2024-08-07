const styles = {
    main: {
        width: '100%',
        height: '100%',
        padding: '0 1vw',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    top: {
        width: '100%',
        height: '7%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topLeft: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
    },
    startedAddress: { display: 'flex', alignItems: 'center' },
    bottom: { height: '93%', display: 'flex', width: '100%' },
    chatSection: (jsonViewerData) => ({
        width: jsonViewerData ? '60%' : '100%',
        height: '98%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    }),
    chatBody: {
        width: '100%',
        height: '100%',
        bgcolor: 'primary.white',
        borderRadius: '21px',
    },
    jsonViewerSection: {
        width: '40%',
        height: '98%',
        paddingLeft: '1vw',
        position: 'relative',
    },
    jsonViewerIcon: {
        position: 'absolute',
        top: '1vh',
        right: '1vw',
        width: '10vw',
        zIndex: '100',
        height: '4vh',
    },
    iconStack: { width: '97%', height: '100%' },
    reactJson: {
        borderRadius: '21px',
        borderTopLeftRadius: '16px',
        width: '100%',
        height: '100%',
        maxHeight: '90vh',
        overflow: 'scroll',
    },
}

export default styles
