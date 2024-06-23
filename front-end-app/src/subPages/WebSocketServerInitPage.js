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
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import SaveIcon from '@mui/icons-material/Save';


const WebSocketInitPage = ({setIsServerStarted, setPort}) => {

  const { register: registerWssStart, handleSubmit: handleSubmitWssStart } = useForm();
  const { register: registerWssConnect, handleSubmit: handleSubmitWssConnect } = useForm();
  const { register: registerAddCookie, handleSubmit: handleSubmitAddCookie, reset: resetAddCookie, setValue:setValueAddCookie } = useForm();

  const infoToolTipServerStart = "If cookies are added then they will be sent as a part of the request while establishing connection with the websocket server. NOTE: Cookies are generally used for authentication when connecting to a remote web-socket server"

  const infoTooltipMessage = "If the key is entered then the messages are encrypted & decrypted using the Advanced Encryption Standard (AES) algorithm"

  const [cookies, setCookies] = useState([])
  const [isAddCookie, setIsAddCookie] = useState(false)
  const [cookieEditData, setCookieEditData] = useState(false)
  const [isWssStartLoading, setIsWssStartLoading] = useState(false)
  const [isWssConnectLoading, setIsWssConnectLoading] = useState(false)

  const onSubmitWssStart = data => {
    setIsWssStartLoading(true)
    setIsServerStarted(true)
    setPort(data.port)
    window.ipcRenderer.send('startWebSocketServer', data)
  };
  const onSubmitWssConnect = data => {
    console.log(data, cookies);
    setIsWssConnectLoading(true)
    setIsServerStarted(true)
  };
  const onSubmitAddCookie = data => {
    setCookies([...cookies, {...data, cookieId:uuidv4()}])
    resetAddCookie({
      cookieName: '', 
      cookieDomain: '', 
      cookieValue: ''
    })
    setIsAddCookie(false)
    console.log(data);
  };
  const onSaveEditCookie = data => {
    const editedCookieData = {...cookieEditData, cookieName:data.cookieName, cookieDomain:data.cookieDomain, cookieValue:data.cookieValue}
    const tempCookie = cookies.filter(cookie => cookie.cookieId !== editedCookieData.cookieId)
    setCookies([...tempCookie, editedCookieData])
    setIsAddCookie(false)
    setCookieEditData(false)
    resetAddCookie({
      cookieName: '', 
      cookieDomain: '', 
      cookieValue: ''
    })
  };
  const onCancelEditCookie = data => {
    setIsAddCookie(false)
    setCookieEditData(false)
        resetAddCookie({
      cookieName: '', 
      cookieDomain: '', 
      cookieValue: ''
    })
  };
  const onCancelAddCookie = data => {
    resetAddCookie({
      cookieName: '', 
      cookieDomain: '', 
      cookieValue: ''
    })
    setIsAddCookie(false)
  };
  const onCloseCard = (data) => {
    let tempCookie = JSON.parse(JSON.stringify(cookies))
    tempCookie = tempCookie.filter((cookie) => cookie.cookieId !== data.cookieId)
    setCookies(tempCookie)
  }
  const onCardClick = (data) => {
    setValueAddCookie("cookieName", data.cookieName)
    setValueAddCookie("cookieDomain", data.cookieDomain)
    setValueAddCookie("cookieValue", data.cookieValue)
    setCookieEditData(data)
    setIsAddCookie(true)
  }

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
            <CustomTextField placeholder={"Port"} size={'small'} fieldName={"port"} register={registerWssStart} />
            <CustomTextField placeholder={"Encryption/Decryption Key"} icon={InfoOutlinedIcon} size={'medium'} tooltip={infoTooltipMessage} isEndAdornment={true} fieldName={"enDeKey"} register={registerWssStart} />
          </Box>
          <IconButton buttonName={"Start"} Icon={() => <FlightTakeoffIcon />} buttonBackground={"success.main"} iconColor={"success.light"} handleSubmit={handleSubmitWssStart} onSubmit={onSubmitWssStart} isLoading={isWssStartLoading}/>
        </Box>
      </Box>
      <Box sx={{ height: "73.5%", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "space-around" }}>
        <Box sx={{ height: "5%", width: "47%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Divider style={{ width: '100%' }} />
        </Box>
        <Typography variant='h4' sx={{ color: "text.backgroundMatch" }}>Connect to a local or remote server</Typography>
        <Box sx={{ width: "47%", height: "80%", display: 'flex', alignItems: 'center', justifyContent: "flex-start", flexDirection: 'column' }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <CustomTextField placeholder={"Web-socket server URL"} size={'large'} fieldName={"url"} register={registerWssConnect}/>
            </Grid>
            <Grid item xs={6}>
            <CustomTextField placeholder={"Encryption/Decryption Key"} icon={InfoOutlinedIcon} size={'large'} tooltip={infoTooltipMessage} isEndAdornment={true} fieldName={"enDeKey"} register={registerWssConnect} />
            </Grid>
            <Grid item xs={12}>
              <BoxCard cardData={cookies} buttonName={'Add cookie'} infoToolTipMessage={infoToolTipServerStart} cardDataId={'cookieId'} onCloseCookie={onCloseCookie} onClickButton={onAddCookie} cardLabel={"cookieName"} onCloseCard={onCloseCard} onCardClick={onCardClick}/>
            </Grid>
            {
              !isAddCookie && <Grid item xs={12}>
                <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <IconButton buttonName={"Connect"} Icon={() => <LinkIcon />} buttonBackground={"success.main"} iconColor={"success.light"} handleSubmit={handleSubmitWssConnect} onSubmit={onSubmitWssConnect} isLoading={isWssConnectLoading}/>
                </Box>
                </Grid>
            }
            {
              isAddCookie && <Grid item xs={4}>
              <CustomTextField placeholder={"Cookie name"} size={'large'}  fieldName={"cookieName"} register={registerAddCookie} />
            </Grid>
            }
            {
              isAddCookie && <Grid item xs={8}>
              <CustomTextField placeholder={"Cookie domain"} size={'large'}  fieldName={"cookieDomain"} register={registerAddCookie} />
            </Grid>
            }
            {
              isAddCookie && <Grid item xs={12}>
              <CustomTextField placeholder={"Cookie value"} size={'large'}  fieldName={"cookieValue"} register={registerAddCookie} />
            </Grid>
            }
            {
              !cookieEditData && isAddCookie && <Grid item xs={12}>
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
                  <OutlinedButton color={'text.disabled'} buttonName={'Cancel'} sx={{ marginRight: "2vw" }} onClick={onCancelAddCookie}/>
                  <IconButton buttonName={"Add cookie"} Icon={() => <CookieIcon />} buttonBackground={"primary.main"} iconColor={"primary.light"}  handleSubmit={handleSubmitAddCookie} onSubmit={onSubmitAddCookie} width={{
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
            {
              cookieEditData && isAddCookie && <Grid item xs={12}>
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
                  <OutlinedButton color={'text.disabled'} buttonName={'Cancel'} sx={{ marginRight: "2vw" }} onClick={onCancelEditCookie}/>
                  <IconButton buttonName={"Save"} Icon={() => <SaveIcon />} buttonBackground={"primary.main"} iconColor={"primary.light"}  handleSubmit={handleSubmitAddCookie} onSubmit={onSaveEditCookie} width={{
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