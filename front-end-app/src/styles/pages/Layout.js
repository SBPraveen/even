const styles = {
    layoutMain: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
    },
    navBar: {
        height: '100%',
        width: '57.5px',
        bgcolor: 'secondary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        position: 'relative',
    },
    icon: {
        marginTop: '1vh',
        marginBottom: '4vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        bgcolor: 'primary.main',
        position: 'absolute',
        bottom: '0',
        marginBottom: '1vh',
        width: '50',
    },
    childrenComp: {
        height: '100vh',
        width: 'calc(100vw - 57.5px)',
        bgcolor: 'primary.light',
    },
}

export default styles
