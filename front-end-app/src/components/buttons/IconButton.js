import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import PropTypes from 'prop-types'
import styles from '../../styles/components/buttons/IconButton'

const IconButton = ({
    Icon,
    buttonName,
    buttonBackground,
    handleSubmit,
    iconColor,
    isLoading,
    onSubmit,
    style,
    width,
}) => {
    return (
        <Button
            onClick={
                handleSubmit && onSubmit ? handleSubmit(onSubmit) : handleSubmit
            }
            variant='contained'
            startIcon={!isLoading && <Icon />}
            sx={styles.main(style, width, buttonBackground, iconColor)}
        >
            {isLoading ? (
                <CircularProgress size={20} sx={{ color: iconColor }} />
            ) : (
                buttonName
            )}
        </Button>
    )
}

IconButton.propTypes = {
    Icon: PropTypes.element.isRequired,
    buttonBackground: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    iconColor: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
    style: PropTypes.object,
    width: PropTypes.object,
}
export default IconButton
