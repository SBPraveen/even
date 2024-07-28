/* eslint-disable id-length */
/* eslint-disable no-unused-vars */
import { Box } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PropTypes from 'prop-types'
import { useState } from 'react'

const CustomList = ({ data, handleSideBarOpen, onUrlSelection }) => {
    return (
        <List
            // eslint-disable-next-line sort-keys
            sx={{
                bgcolor: 'primary.box',
                width: '100%',
            }}
            component='nav'
            aria-labelledby='nested-list-subheader'
        >
            {data.map((folder, indexFolder) => (
                <Box key={indexFolder}>
                    <ListItemButton onClick={() => handleSideBarOpen(folder)}>
                        <ListItemIcon>
                            <FolderOpenOutlinedIcon
                                sx={{ color: 'primary.main' }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={folder.name}
                            sx={{
                                '& .MuiTypography-root': {
                                    color: 'primary.main',
                                },
                            }}
                        />
                        {folder.isOpen ? (
                            <ExpandLess
                                sx={{ color: 'text.backgroundMatch' }}
                            />
                        ) : (
                            <ExpandMore
                                sx={{ color: 'text.backgroundMatch' }}
                            />
                        )}
                    </ListItemButton>
                    <Collapse in={folder.isOpen} timeout='auto' unmountOnExit>
                        {folder.data.map((environments, indexUrl) => (
                            <List
                                key={`${indexFolder}${indexUrl}`}
                                component='div'
                                disablePadding
                            >
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText
                                        sx={{
                                            '& .MuiTypography-root': {
                                                color: 'text.backgroundMatch',
                                                cursor: 'pointer',
                                            },
                                        }}
                                        primary={environments.url}
                                        onClick={() =>
                                            onUrlSelection(environments)
                                        }
                                    />
                                </ListItemButton>
                            </List>
                        ))}
                    </Collapse>
                </Box>
            ))}
        </List>
    )
}

CustomList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    url: PropTypes.string.isRequired,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
    ),
    handleSideBarOpen: PropTypes.func.isRequired,
    onUrlSelection: PropTypes.func.isRequired,
}
export default CustomList
