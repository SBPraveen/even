import React, { useEffect, useState } from 'react'
import { Box, Typography, Divider, Grid } from '@mui/material'
import CustomTextField from '../components/textFields/CustomTextField'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '../components/buttons/IconButton'
import CookieIcon from '@mui/icons-material/Cookie';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import BoxCard from '../components/BoxCard';
import OutlinedButton from '../components/buttons/OutlinedButton';
import LinkIcon from '@mui/icons-material/Link';


const WebSocketInitPage = () => {

  const infoToolTipMessage = "If cookies are added then they will be sent as a part of the request while establishing connection with the websocket server. NOTE: Cookies are generally used for authentication when connecting to a remote web-socket server"

  const [cookies, setCookies] = useState([{ cookieName: "AWS-ELB-Auth-Session-Cookie-1", cookieDomain: 'app.allegro.sentinel.unifo.in', cookieValue: "JjCe7CRtKT2FS/SpJfPciQ7t/ml3ifjUec+xIRgnKATmwMrBMubHZpfyNj8cl96cNf3aS3FQnPa5rQFCRjaQGeyIZnUIn+h7AkQyyDPHeHGmdWE/jrGwcVbfHLXdbh8Kg5Cr15QAX2LxeDR6lQ==", cookieId: "1234" }, { cookieName: "AWS-ELB-Auth-Session-Cookie-2", cookieDomain: 'app.allegro.sentinel.unifo.in', cookieValue: "JjCe7CRtKT2FS/SpJfPciQ7t/ml3ifjUec+xIRgnKATmwMrBMubHZpfyNj8cl96cNf3aS3FQnPa5rQFCRjaQGeyIZnUIn+h7AkQyyDPHeHGmdWE/jrGwcVbfHLXdbh8Kg5Cr15QAX2LxeDR6lQ==", cookieId: "5678" }])
  const [isAddCookie, setIsAddCookie] = useState(false)
  const [cookieName, setCookieName] = useState("")
  const [cookieDomain, setCookieDomain] = useState("")
  const [cookieValue, setCookieValue] = useState("")

  const onCloseCookie = (data) => {
    const tempData = JSON.parse(JSON.stringify(cookies))
    const updatedCookies = tempData.filter((cookie) => cookie.cookieId !== data.cookieId)
    setCookies(updatedCookies)
  }

  const onAddCookie = () => {
    setIsAddCookie(true)
  }

  
  return (
    <Box sx={{ width: "80%", height: "90%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "27.5%", justifyContent: "space-around" }}>
        <Typography variant='h4' sx={{ color: "text.backgroundMatch" }}>Start a local server</Typography>
        <Box sx={{ width: "47%", height: "51%", display: 'flex', alignItems: 'center', justifyContent: "space-between", flexDirection: 'column' }}>
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <CustomTextField placeholder={"Port"} size={'small'} />
            <CustomTextField placeholder={"Encryption/Decryption Key"} icon={InfoOutlinedIcon} size={'medium'} tooltip={'If the key is entered then the messages are encrypted & decrypted using the Advanced Encryption Standard (AES) algorithm'} isEndAdornment={true} />
          </Box>
          <IconButton buttonName={"Start"} Icon={() => <FlightTakeoffIcon />} buttonBackground={"success.main"} iconColor={"success.light"} />
        </Box>
      </Box>
      <Box sx={{ background: "pink", height: "73.5%", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "space-around" }}>
        <Box sx={{ height: "5%", width: "47%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Divider style={{ width: '100%' }} />
        </Box>
        <Typography variant='h4' sx={{ color: "text.backgroundMatch" }}>Connect to a local or remote server</Typography>
        <Box sx={{ width: "47%", background: "yellow", height: "80%", display: 'flex', alignItems: 'center', justifyContent: "flex-start", flexDirection: 'column' }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <CustomTextField placeholder={"Web-socket server URL"} size={'large'} />
            </Grid>
            <Grid item xs={12}>
              <BoxCard cardData={cookies} buttonName={'Add cookie'} infoToolTipMessage={infoToolTipMessage} cardDataId={'cookieId'} onCloseCookie={onCloseCookie} onClickButton={onAddCookie}/>
            </Grid>
            {
              !isAddCookie && <Grid item xs={12}>
                <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <IconButton buttonName={"Connect"} Icon={() => <LinkIcon />} buttonBackground={"success.main"} iconColor={"success.light"} />
                </Box>
                </Grid>
            }
            {
              isAddCookie && <Grid item xs={4}>
              <CustomTextField placeholder={"Cookie name"} size={'large'} />
            </Grid>
            }
            {
              isAddCookie && <Grid item xs={8}>
              <CustomTextField placeholder={"Cookie domain"} size={'large'} />
            </Grid>
            }
            {
              isAddCookie && <Grid item xs={12}>
              <CustomTextField placeholder={"Cookie value"} size={'large'} />
            </Grid>
            }
            {
              isAddCookie && <Grid item xs={12}>
              <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", height: "4vh", minHeight: "20px", maxHeight: "40px", }}>
                <Box sx={{
                  width: {
                    xs: '100%',
                    sm: '100%',
                    md: '75%',
                    lg: '65%',
                    xl: '50%',
                  }, display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%"
                }}>
                  <OutlinedButton color={'text.disabled'} buttonName={'Cancel'} sx={{ marginRight: "2vw" }} />
                  <IconButton buttonName={"Add cookie"} Icon={() => <CookieIcon />} buttonBackground={"primary.main"} iconColor={"primary.light"} width={{
                    xs: '50%',
                    sm: '50%',
                    md: '50%',
                    lg: '45%',
                    xl: '40%',
                  }} />
                </Box>
              </Box>
            </Grid>
            }
          </Grid>
        </Box>
      </Box>

    </Box>
  )
}

export default WebSocketInitPage