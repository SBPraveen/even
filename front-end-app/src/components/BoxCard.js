import { Box, Tooltip } from '@mui/material'
import BoxCardChild from './BoxCardChild'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PropTypes from 'prop-types'
import TextButton from './buttons/TextButton'
import styles from '../styles/components/BoxCard'

const BoxCard = ({
    buttonName,
    cardData,
    cardDataId,
    dataKey,
    infoToolTipMessage,
    onCardClick,
    onCloseCard,
    onClickButton,
}) => {
    return (
        <Box sx={styles.main}>
            <Box sx={styles.cardSection}>
                {cardData.map((card) => {
                    return (
                        <BoxCardChild
                            data={card}
                            cardDataId={cardDataId}
                            onClose={onCloseCard}
                            key={card[cardDataId]}
                            onCardClick={onCardClick}
                            dataKey={dataKey}
                        />
                    )
                })}
            </Box>
            <Box sx={styles.buttonSection}>
                <Box sx={styles.buttonSectionButton}>
                    <TextButton
                        text={buttonName}
                        color={'text.disabled'}
                        onHoverColor={'primary.main'}
                        onClick={onClickButton}
                    />
                </Box>
                <Tooltip title={infoToolTipMessage}>
                    <InfoOutlinedIcon sx={styles.buttonSectionInfo} />
                </Tooltip>
            </Box>
        </Box>
    )
}

BoxCard.propTypes = {
    buttonName: PropTypes.string.isRequired,
    cardData: PropTypes.arrayOf(PropTypes.object).isRequired,
    cardDataId: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    infoToolTipMessage: PropTypes.string.isRequired,
    onCardClick: PropTypes.func.isRequired,
    onClickButton: PropTypes.func.isRequired,
    onCloseCard: PropTypes.func.isRequired,
}

export default BoxCard
