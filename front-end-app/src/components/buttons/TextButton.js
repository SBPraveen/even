import PropTypes from 'prop-types'
import { Typography } from '@mui/material'
import styles from '../../styles/components/buttons/TextButton'

const TextButton = ({ color, onClick, onHoverColor, text }) => {
    return (
        <Typography
            onClick={onClick}
            variant='body2'
            sx={styles.main(color, onHoverColor)}
        >
            {text}
        </Typography>
    )
}
TextButton.propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onHoverColor: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}
export default TextButton
