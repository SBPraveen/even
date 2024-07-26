import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import OnlyIconButton from './buttons/OnlyIconButton'
import PropTypes from 'prop-types'
import { Tooltip } from '@mui/material'
import styles from '../styles/components/Tabs'

const Tabs = ({ tabsData, onTabClose, onCreateNewTab }) => {
    return (
        <Box sx={styles.main}>
            <Box sx={styles.tabsSection}>
                {tabsData &&
                    tabsData.map((tab) => {
                        return (
                            <Box key={tab.tabId} sx={styles.tabMain}>
                                <Box sx={styles.tabSection1}>
                                    <Box sx={styles.tabIcon}>{tab.icon}</Box>
                                    <Tooltip
                                        title={tab.text}
                                        placement='bottom'
                                    >
                                        <Box sx={styles.tabTextMain}>
                                            <Box sx={styles.tabText}>
                                                {tab.text}
                                            </Box>
                                        </Box>
                                    </Tooltip>
                                    <Box sx={styles.tabClose}>
                                        <OnlyIconButton
                                            Icon={CloseIcon}
                                            color={'fail.light'}
                                            data={tab}
                                            onHoverColor={'fail.main'}
                                            width='60%'
                                            onClick={onTabClose}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
            </Box>
            <Box sx={styles.tabsAdd}>
                <OnlyIconButton
                    Icon={AddIcon}
                    color={'text.backgroundMatch'}
                    onClick={onCreateNewTab}
                    onHoverColor={'primary.main'}
                    width='70%'
                />
            </Box>
        </Box>
    )
}

Tabs.propTypes = {
    onCreateNewTab: PropTypes.func.isRequired,
    onTabClose: PropTypes.func.isRequired,
    tabsData: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.element.isRequired,
            tabId: PropTypes.number.isRequired,
            test: PropTypes.string.isRequired,
        }),
    ),
}

export default Tabs
