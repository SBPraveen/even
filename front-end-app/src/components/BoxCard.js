import { Box, Tooltip } from '@mui/material'
import React from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextButton from './buttons/TextButton';
import BoxCardChild from './BoxCardChild';



const BoxCard = ({buttonName, cardData, infoToolTipMessage, cardDataId, onCloseCard, onClickButton}) => {
  
  return (
    <Box sx={{ width: "100%", bgcolor: "primary.white", borderRadius: "8px", height: "5vh", minHeight: "30px", maxHeight: "50px", display: "flex" }}>
      <Box sx={{ display: "flex", height: "100%", flex:1, overflow: "scroll", scrollbarWidth: "none", alignItems:"center", justifyContent:"flex-start", paddingLeft:'1rem' }}>
        {cardData.map((card) => {
          return(
            <BoxCardChild data={card} cardDataId={cardDataId} onClose={onCloseCard} key={card[cardDataId]}/>
          )
        })}
      </Box>
      <Box sx={{ width: ['50%', '50%', '30%', '25%', '20%'], height: "100%", display: "flex", alignItems: "center", position:"relative"}}>
        <Box sx={{width:"calc(100% - 30px)", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <TextButton text={buttonName} color={'text.disabled'} onHoverColor={'primary.main'} onClick={onClickButton}/>
        </Box>
        <Tooltip title={infoToolTipMessage}>
          <InfoOutlinedIcon sx={{ color: 'text.disabled', fontSize: "1rem", cursor: "pointer", position:"absolute", right:"15px" }} />
        </Tooltip>
      </Box>


    </Box>
  )
}

export default BoxCard

