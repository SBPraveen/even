/* eslint-disable id-length */
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
    } else if (sizeText === 'medium') {
        size = 8
    } else {
        size = 4
    }
    return size
}

const Form = ({ data, handleSubmit, onSubmit, isLoading, register }) => {
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
                    height: '73%',
                    background: 'orange',
                    overflowY: 'auto',
                    marginTop: '1%',
                    marginBottom: '1%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                    rowSpacing={1}
                    columnSpacing={4}
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {data.body &&
                        data.body.map((field, index) => (
                            <>
                                <Grid
                                    key={field.name + index}
                                    item
                                    xs={12}
                                    sx={{
                                        background: 'brown',
                                        height: '2.5vh',
                                        margin: '0',
                                        marginTop: '2vh',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <Typography
                                            variant='body2'
                                            sx={{ color: 'text.main' }}
                                        >
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
                                            sx={{
                                                background: 'magenta',
                                            }}
                                        >
                                            {field.type === 'textfield' && (
                                                <CustomTextField
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    fieldName={field.fieldName}
                                                    register={register}
                                                />
                                            )}
                                            {field.type === 'dropdown' && (
                                                <DropDown
                                                    register={register}
                                                    menu={field.options}
                                                    fieldName={field.fieldName}
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                />
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
