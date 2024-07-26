/* eslint-disable max-lines-per-function */
/* eslint-disable sort-keys */
import { Box, Grid, Tooltip, Typography } from '@mui/material'
import CustomTextField from '../textFields/CustomTextField'
import DropDown from '../DropDown'
import FolderSelect from '../FolderSelect'
import IconButton from '../buttons/IconButton'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PropTypes from 'prop-types'

const gridSizeCompute = (sizeText) => {
    let size
    if (sizeText === 'large') {
        size = 12
    } else if (size === 'medium') {
        size = 12
    } else {
        size = 4
    }
    return size
}

const Form = ({ data, handleSubmit, onSubmit, isLoading }) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '10%',
                    background: 'pink',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant='h5' sx={{ color: 'text.backgroundMatch' }}>
                    {data.header.name}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '74%',
                    background: 'blue',
                    overflowY: 'auto',
                    marginTop: '1%',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'primary.iconLight',
                        borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'primary.main',
                    },
                    '*': {
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'primary.iconLight',
                    },
                }}
            >
                <Grid
                    container
                    spacing={4}
                    sx={{ width: '100%', height: '100%', margin: '0' }}
                >
                    {data.body &&
                        data.body.map((field, index) => (
                            <>
                                <Grid
                                    key={field.name + index}
                                    item
                                    xs={12}
                                    sx={{
                                        background: 'white',
                                        height: '15px',
                                        margin: '0',
                                        '&.MuiGrid-item': {
                                            paddingLeft: '0',
                                            paddingTop: '0',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <Typography variant='body2'>
                                            {field.name}
                                            {field.isRequired && (
                                                <span style={{ color: 'red' }}>
                                                    {' '}
                                                    *
                                                </span>
                                            )}
                                        </Typography>
                                        {field.description && (
                                            <Tooltip title={field.description}>
                                                <InfoOutlinedIcon
                                                    sx={{
                                                        color: 'text.disabled',
                                                        fontSize: '1rem',
                                                        cursor: 'pointer',
                                                        marginLeft: '10px',
                                                    }}
                                                />
                                            </Tooltip>
                                        )}
                                    </Box>
                                </Grid>
                                {field.fields &&
                                    field.fields.map((field, index) => (
                                        <Grid
                                            key={field.type + index}
                                            item
                                            xs={gridSizeCompute(field.size)}
                                        >
                                            {field.type === 'textfield' && (
                                                <CustomTextField />
                                            )}
                                            {field.type === 'dropdown' && (
                                                <DropDown />
                                            )}
                                            {field.type ===
                                                'folderSelector' && (
                                                <FolderSelect />
                                            )}
                                        </Grid>
                                    ))}
                            </>
                        ))}
                </Grid>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '15%',
                    background: 'pink',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                {data.footer &&
                    data.footer.map((field) => (
                        <>
                            {field.type === 'iconButton' && (
                                <IconButton
                                    buttonName={field.name}
                                    Icon={() => field.icon}
                                    buttonBackground={field.buttonColor}
                                    iconColor={field.iconColor}
                                    handleSubmit={handleSubmit}
                                    onSubmit={onSubmit}
                                    isLoading={isLoading}
                                />
                            )}
                        </>
                    ))}
            </Box>
        </Box>
    )
}

Form.propTypes = {
    data: PropTypes.shape({
        body: PropTypes.arrayOf(
            PropTypes.shape({
                description: PropTypes.string,
                fields: PropTypes.arrayOf(
                    PropTypes.shape({
                        placeholder: PropTypes.string,
                        size: PropTypes.string,
                        type: PropTypes.string.isRequired,
                    }),
                ),
                isRequired: PropTypes.bool.isRequired,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
            }),
        ).isRequired,
        footer: PropTypes.arrayOf(
            PropTypes.shape({
                buttonColor: PropTypes.string.isRequired,
                icon: PropTypes.element,
                iconColor: PropTypes.string,
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
            }),
        ).isRequired,
        header: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

export default Form
