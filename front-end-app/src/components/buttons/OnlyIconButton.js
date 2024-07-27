import IconButton from '@mui/material/IconButton'
import PropTypes from 'prop-types'
import styles from '../../styles/components/buttons/OnlyIconButton'

const OnlyIconButton = ({
    Icon,
    color,
    data,
    onClick,
    onHoverColor,
    width,
}) => {
    return (
        <IconButton
            onClick={() => onClick(data)}
            aria-label='close'
            disableRipple
            style={styles.main(onHoverColor, color)}
        >
            <Icon sx={{ width }} />
        </IconButton>
    )
}
OnlyIconButton.propTypes = {
    Icon: PropTypes.element.isRequired,
    color: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onHoverColor: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
}
export default OnlyIconButton
