import { InputBase, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import InputAdornment from '@mui/material/InputAdornment'
import PropTypes from 'prop-types'
import styles from '../../styles/components/textFields/CustomTextField'

const CustomTextField = ({
    fieldName,
    isEndAdornment,
    placeholder,
    register,
    size = 'large',
    tooltip,
}) => {
    const registerForm = register ? { ...register(fieldName) } : {}
    return (
        <InputBase
            {...registerForm}
            size={size}
            placeholder={placeholder}
            endAdornment={
                isEndAdornment && (
                    <InputAdornment position='end'>
                        <Tooltip title={tooltip}>
                            <InfoOutlinedIcon sx={styles.endAdornment} />
                        </Tooltip>
                    </InputAdornment>
                )
            }
            sx={styles.main}
        />
    )
}

CustomTextField.propTypes = {
    fieldName: PropTypes.string.isRequired,
    isEndAdornment: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.object,
    size: PropTypes.string,
    tooltip: PropTypes.string,
}

export default CustomTextField
