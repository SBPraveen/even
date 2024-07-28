/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable sort-keys */
import { Box, Grid, Tooltip, Typography } from '@mui/material'
import BoxCard from '../BoxCard'
import { Controller } from 'react-hook-form'
import CookieIcon from '@mui/icons-material/Cookie'
import CustomTextField from '../textFields/CustomTextField'
import DropDown from '../DropDown'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import FolderSelect from '../FolderSelect'
import IconButton from '../buttons/IconButton'
import LinkIcon from '@mui/icons-material/Link'
import OutlinedButton from '../buttons/OutlinedButton'
import PropTypes from 'prop-types'
import SaveIcon from '@mui/icons-material/Save'

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

const iconSelector = (iconName) => {
    let component
    switch (iconName) {
        case 'linkIcon':
            component = <LinkIcon />
            break
        case 'cookieIcon':
            component = <CookieIcon />
            break
        case 'saveIcon':
            component = <SaveIcon />
            break
        case 'flightTakeoffIcon':
            component = <FlightTakeoffIcon />
            break
        default:
            component = ''
    }
    return component
}

const Form = ({ data, isLoading, handlers }) => {
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
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    marginTop: '10px',
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
                    maxHeight: '40vh',
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
                    rowSpacing={1.5}
                    columnSpacing={4}
                    sx={{
                        width: '97%',
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
                                        margin: '0',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        '&.MuiGrid-item': {
                                            paddingTop: '0',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            height: '3.75vh',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        {field.description ? (
                                            <Tooltip title={field.description}>
                                                <Typography
                                                    variant='body2'
                                                    sx={{
                                                        color: 'text.backgroundMatch',
                                                    }}
                                                >
                                                    {field.name}
                                                    {field.isRequired && (
                                                        <span
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            {' '}
                                                            *
                                                        </span>
                                                    )}
                                                </Typography>
                                            </Tooltip>
                                        ) : (
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    color: 'text.backgroundMatch',
                                                }}
                                            >
                                                {field.name}
                                                {field.isRequired && (
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        {' '}
                                                        *
                                                    </span>
                                                )}
                                            </Typography>
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
                                            {!field.shouldNotInitDisplay &&
                                                field.type === 'textfield' && (
                                                    <CustomTextField
                                                        placeholder={
                                                            field.placeholder
                                                        }
                                                        fieldName={
                                                            field.fieldName
                                                        }
                                                        register={
                                                            handlers[
                                                                field.register
                                                            ]
                                                        }
                                                    />
                                                )}
                                            {!field.shouldNotInitDisplay &&
                                                field.type === 'dropdown' && (
                                                    <DropDown
                                                        register={
                                                            handlers[
                                                                field.register
                                                            ]
                                                        }
                                                        menu={field.options}
                                                        fieldName={
                                                            field.fieldName
                                                        }
                                                        placeholder={
                                                            field.placeholder
                                                        }
                                                    />
                                                )}
                                            {!field.shouldNotInitDisplay &&
                                                field.type === 'boxCard' && (
                                                    <BoxCard
                                                        cardData={field.data}
                                                        buttonName={
                                                            field.buttonName
                                                        }
                                                        cardDataId={'cookieId'}
                                                        onClickButton={
                                                            handlers[
                                                                field
                                                                    .onClickButton
                                                            ]
                                                        }
                                                        onCloseCard={
                                                            handlers[
                                                                field
                                                                    .onCloseCard
                                                            ]
                                                        }
                                                        onCardClick={
                                                            handlers[
                                                                field
                                                                    .onCardClick
                                                            ]
                                                        }
                                                        dataKey={'cookieName'}
                                                    />
                                                )}
                                            {!field.shouldNotInitDisplay &&
                                                field.type ===
                                                    'folderSelector' && (
                                                    <Controller
                                                        control={
                                                            handlers[
                                                                field.control
                                                            ]
                                                        }
                                                        name={field.fieldName}
                                                        render={({
                                                            field: { onChange },
                                                        }) => (
                                                            <FolderSelect
                                                                control={
                                                                    handlers[
                                                                        field
                                                                            .control
                                                                    ]
                                                                }
                                                                name={
                                                                    field.fieldName
                                                                }
                                                                onChange={
                                                                    onChange
                                                                }
                                                            />
                                                        )}
                                                    />
                                                )}
                                        </Grid>
                                    ))}
                            </>
                        ))}
                </Grid>
            </Box>
            <Box
                sx={{
                    width: '55%',
                    height: '14%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    paddingTop: '0.5%',
                    justifyContent: 'space-around',
                }}
            >
                {data.footer &&
                    data.footer.map((field) => (
                        <>
                            {!field.shouldNotInitDisplay &&
                                field.type === 'iconButton' && (
                                    <IconButton
                                        buttonName={field.name}
                                        Icon={() => iconSelector(field.icon)}
                                        buttonBackground={field.buttonColor}
                                        iconColor={field.iconColor}
                                        handleSubmit={handlers[field.onClick]}
                                        onSubmit={handlers[field.onSubmit]}
                                        isLoading={isLoading}
                                    />
                                )}
                            {!field.shouldNotInitDisplay &&
                                field.type === 'outlinedButton' && (
                                    <OutlinedButton
                                        color={field.color}
                                        buttonName={field.name}
                                        onClick={handlers[field.onSubmit]}
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
    handlers: PropTypes.objectOf(PropTypes.func),
    isLoading: PropTypes.bool,
}

export default Form
