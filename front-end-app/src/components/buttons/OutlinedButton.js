import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import styles from '../../styles/components/buttons/OutlinedButton'

const OutlinedButton = ({ buttonName, color, onClick, width }) => {
    return (
        <Button
            disableRipple={true}
            onClick={onClick}
            variant='outlined'
            sx={styles.main(color, width)}
        >
            {buttonName}
        </Button>
    )
}

OutlinedButton.propTypes = {
    buttonName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    width: PropTypes.string,
}
export default OutlinedButton
