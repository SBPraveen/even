/* eslint-disable no-unused-vars */
import List from '@mui/material/List'
import PropTypes from 'prop-types'

const CustomList = ({ data }) => {
    return <div>List</div>
}

CustomList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.number.isRequired,
        }).isRequired,
    ),
}
export default CustomList
