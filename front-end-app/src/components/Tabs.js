import Box from '@mui/material/Box';
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import OnlyIconButton from './buttons/OnlyIconButton';
import {Tooltip} from '@mui/material';
import { ReactComponent as WsConnection } from '../icons/ws_connection.svg'
import { ReactComponent as WsServer } from '../icons/ws_server.svg'


const Tabs = ({ tabsData, onTabClose, onCreateNewTab }) => {
  return (
    <Box sx={{width: "100%", minHeight: "25px", maxHeight: "50px", height: "2%", display: "flex", boxShadow:3}}>
      <Box sx={{ display: "flex", height: "100%", maxWidth:"95%", overflow:"scroll", scrollbarWidth:"none"  }}>
        {
          tabsData && tabsData.map((tab) => {
            return (
              <Box id={tab.id} key={tab.id} sx={{height: "100%", display:"flex", cursor:"pointer"
            }}>
              <Box sx={{width: "10vw", minWidth: "150px", maxWidth: "350px", height: "100%", display:"flex", cursor:"pointer",
              }}>
                <Box sx={{height: "100%", width:"15%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {tab.icon==="ws_connection"? <WsConnection/> : <WsServer/>}
                </Box>
                <Tooltip title={tab.text} placement="bottom">
                <Box sx={{height: "100%", width:"75%",display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                  <Box sx={{ width:"100%", whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden", display:"block", color:"text.disabled"}}>{tab.text}</Box>
                </Box>
                </Tooltip>
                <Box sx={{height: "100%", width:"10%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <OnlyIconButton Icon={CloseIcon} color={'fail.light'} data={tab} onHoverColor={'fail.main'} width='60%'onClick={onTabClose}/>
                </Box>
              </Box>
              <Box sx={{width:"1px", display:"flex", flexDirection:"column", height:"100%", marginLeft:"2px"}}>
              <Box sx={{width:"100%", height:"15%"}}></Box>
              <Box sx={{width:"100%", bgcolor:"text.backgroundMatch", height:"70%"}}></Box>
              <Box sx={{width:"100%", height:"15%"}}></Box>
            </Box>
                </Box>

            )
          })
        }
      </Box>
      <Box sx={{flex: "1", height: "100%", display:"flex", alignItems:"center", paddingLeft:"10px"}}>
      <OnlyIconButton Icon={AddIcon} color={'text.backgroundMatch'} onClick={onCreateNewTab} onHoverColor={'primary.main'} width='70%'/>
      </Box>

    </Box>
  )
}

export default Tabs
