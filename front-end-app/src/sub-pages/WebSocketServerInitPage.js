/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable id-denylist */
/* eslint-disable id-length */
/* eslint-disable sort-keys */
/* eslint-disable max-lines */
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Form from '../components/form/Form'
import SideBar from '../components/SideBar'
import connectToServer from '../data/connectToServer'
import startServer from '../data/startServer'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

// eslint-disable-next-line max-lines-per-function
const WebSocketInitPage = ({ setIsServerStarted, setPort, setUrl }) => {
    const {
        register: registerWssStart,
        handleSubmit: handleSubmitWssStart,
        control: wssStartControl,
    } = useForm()
    const {
        register: registerWssConnect,
        handleSubmit: handleSubmitWssConnect,
    } = useForm()
    const {
        register: registerAddCookie,
        handleSubmit: handleSubmitAddCookie,
        reset: resetAddCookie,
        setValue: setValueAddCookie,
    } = useForm()

    const [cookies, setCookies] = useState([])
    const [cookieEditData, setCookieEditData] = useState('')
    const [sideBarData, setSideBarData] = useState([])
    const [isWssStartLoading, setIsWssStartLoading] = useState(false)
    const [isWssConnectLoading, setIsWssConnectLoading] = useState(false)
    const [connectToServerForm, setConnectToServerForm] =
        useState(connectToServer)

    useEffect(() => {
        const sideBarData = [
            {
                name: 'web-socket-server',
                data: [
                    {
                        name: 'localhost',
                        url: 'ws://localhost:8080',
                    },
                    {
                        name: 'dev',
                        url: 'wss://dev.unifo.in',
                    },
                    {
                        name: 'test',
                        url: 'wss://test.unifo.in',
                    },
                    {
                        name: 'localhost',
                        url: 'wss://unifo.in',
                    },
                ],
            },
            {
                name: 'web-socket-server-v2',
                data: [
                    {
                        name: 'localhost',
                        url: 'ws://localhost:8080',
                    },
                    {
                        name: 'dev',
                        url: 'wss://dev.unifo.in',
                    },
                    {
                        name: 'test',
                        url: 'wss://test.unifo.in',
                    },
                    {
                        name: 'localhost',
                        url: 'wss://unifo.in',
                    },
                ],
            },
        ]
        setSideBarData(sideBarData)
    }, [])

    const onSubmitWssStart = async (data) => {
        setIsWssStartLoading(true)
        setIsServerStarted(true)
        setPort(data.port)
        const serverStatus = await window.ipcRenderer.startWebSocketServer(data)
        if (!serverStatus) {
            setIsWssStartLoading(false)
            setIsServerStarted(false)
        }
    }
    const onSubmitWssConnect = (data) => {
        console.log(data, cookies)
        setIsWssConnectLoading(true)
        setIsServerStarted(true)
        setUrl(data.url)
        const serverData = { ...data, cookies }
        window.ipcRenderer.send('connectToServer', serverData)
    }
    const onSubmitAddCookie = (data) => {
        const newCookie = { ...data, cookieId: uuidv4() }
        setCookies([...cookies, newCookie])
        const tempData = JSON.parse(JSON.stringify(connectToServerForm))
        tempData.body = tempData.body.map((section) => {
            if (section.name === 'Cookies') {
                section.fields = section.fields.map((field) => {
                    if (field.buttonName === 'Add cookie') {
                        field.data = [...field.data, newCookie]
                    } else if (
                        field.fieldName === 'cookieName' ||
                        field.fieldName === 'cookieValue'
                    ) {
                        field.shouldNotInitDisplay = true
                    }
                    return field
                })
            }
            return section
        })
        tempData.footer = tempData.footer.map((button) => {
            if (button.name === 'Connect') {
                button.shouldNotInitDisplay = false
            } else if (
                button.name === 'Add cookie' ||
                button.name === 'Cancel'
            ) {
                button.shouldNotInitDisplay = true
            }
            return button
        })
        setConnectToServerForm(tempData)
        resetAddCookie({
            cookieName: '',
            cookieValue: '',
        })
    }
    const onSaveEditCookie = (data) => {
        const editedCookieData = {
            ...cookieEditData,
            cookieName: data.cookieName,
            cookieDomain: data.cookieDomain,
            cookieValue: data.cookieValue,
        }
        const tempCookie = cookies.filter(
            (cookie) => cookie.cookieId !== editedCookieData.cookieId,
        )
        const updatedCookies = [...tempCookie, editedCookieData]
        setCookies(updatedCookies)
        const tempData = JSON.parse(JSON.stringify(connectToServerForm))
        tempData.body = tempData.body.map((section) => {
            if (section.name === 'Cookies') {
                section.fields = section.fields.map((field) => {
                    if (field.buttonName === 'Add cookie') {
                        field.data = updatedCookies
                    } else if (
                        field.fieldName === 'cookieName' ||
                        field.fieldName === 'cookieValue'
                    ) {
                        field.shouldNotInitDisplay = true
                    }
                    return field
                })
            }
            return section
        })
        tempData.footer = tempData.footer.map((button) => {
            if (button.name === 'Connect') {
                button.shouldNotInitDisplay = false
            } else if (
                button.name === 'Save Cookie' ||
                button.name === 'Cancel Edit'
            ) {
                button.shouldNotInitDisplay = true
            }
            return button
        })
        setConnectToServerForm(tempData)
        resetAddCookie({
            cookieName: '',
            cookieValue: '',
        })
    }
    const onCancelEditCookie = () => {
        const tempForm = JSON.parse(JSON.stringify(connectToServerForm))
        tempForm.body = tempForm.body.map((section) => {
            if (section.name === 'Cookies') {
                section.fields = section.fields.map((field) => {
                    if (
                        field.fieldName === 'cookieName' ||
                        field.fieldName === 'cookieValue'
                    ) {
                        field.shouldNotInitDisplay = true
                    }
                    return field
                })
            }
            return section
        })
        tempForm.footer = tempForm.footer.map((button) => {
            if (button.name === 'Connect') {
                button.shouldNotInitDisplay = false
            } else if (
                button.name === 'Save Cookie' ||
                button.name === 'Cancel Edit'
            ) {
                button.shouldNotInitDisplay = true
            }
            return button
        })
        setConnectToServerForm(tempForm)
        resetAddCookie({
            cookieName: '',
            cookieValue: '',
        })
    }
    const onCancelAddCookie = () => {
        const tempForm = JSON.parse(JSON.stringify(connectToServerForm))
        tempForm.body = tempForm.body.map((section) => {
            if (section.name === 'Cookies') {
                section.fields = section.fields.map((field) => {
                    if (
                        field.fieldName === 'cookieName' ||
                        field.fieldName === 'cookieValue'
                    ) {
                        field.shouldNotInitDisplay = true
                    }
                    return field
                })
            }
            return section
        })
        tempForm.footer = tempForm.footer.map((button) => {
            if (button.name === 'Connect') {
                button.shouldNotInitDisplay = false
            } else if (
                button.name === 'Add cookie' ||
                button.name === 'Cancel'
            ) {
                button.shouldNotInitDisplay = true
            }
            return button
        })
        setConnectToServerForm(tempForm)
        resetAddCookie({
            cookieName: '',
            cookieValue: '',
        })
    }
    const onCloseCard = (data) => {
        let tempCookie = JSON.parse(JSON.stringify(cookies))
        tempCookie = tempCookie.filter(
            (cookie) => cookie.cookieId !== data.cookieId,
        )
        const tempData = JSON.parse(JSON.stringify(connectToServerForm))
        tempData.body = tempData.body.map((section) => {
            if (section.name === 'Cookies') {
                section.fields = section.fields.map((field) => {
                    if (field.buttonName === 'Add cookie') {
                        field.data = tempCookie
                    }
                    return field
                })
            }
            return section
        })
        setConnectToServerForm(tempData)
        setCookies(tempCookie)
    }
    const onCookieCardClick = (data) => {
        setCookieEditData(data)
        setValueAddCookie('cookieName', data.cookieName)
        setValueAddCookie('cookieValue', data.cookieValue)
        const tempForm = JSON.parse(JSON.stringify(connectToServerForm))
        tempForm.body = tempForm.body.map((section) => {
            if (section.name === 'Cookies') {
                section.fields = section.fields.map((field) => {
                    if (
                        field.fieldName === 'cookieName' ||
                        field.fieldName === 'cookieValue'
                    ) {
                        field.shouldNotInitDisplay = false
                    }
                    return field
                })
            }
            return section
        })
        tempForm.footer = tempForm.footer.map((button) => {
            if (button.name === 'Connect') {
                button.shouldNotInitDisplay = true
            } else if (
                button.name === 'Save Cookie' ||
                button.name === 'Cancel Edit'
            ) {
                button.shouldNotInitDisplay = false
            }
            return button
        })
        setConnectToServerForm(tempForm)
    }

    const onAddCookie = () => {
        const tempForm = JSON.parse(JSON.stringify(connectToServerForm))
        tempForm.body = tempForm.body.map((section) => {
            if (section.name === 'Cookies') {
                section.fields = section.fields.map((field) => {
                    if (
                        field.fieldName === 'cookieName' ||
                        field.fieldName === 'cookieValue'
                    ) {
                        field.shouldNotInitDisplay = false
                    }
                    return field
                })
            }
            return section
        })
        tempForm.footer = tempForm.footer.map((button) => {
            if (button.name === 'Connect') {
                button.shouldNotInitDisplay = true
            } else if (
                button.name === 'Add cookie' ||
                button.name === 'Cancel'
            ) {
                button.shouldNotInitDisplay = false
            }
            return button
        })
        setConnectToServerForm(tempForm)
    }

    const connectToServerHandlers = {
        onAddCookie,
        onCookieCardClick,
        onCloseCard,
        handleSubmitWssConnect,
        onSubmitWssConnect,
        registerWssConnect,
        registerAddCookie,
        handleSubmitAddCookie,
        onSubmitAddCookie,
        onSaveEditCookie,
        onCancelEditCookie,
        onCancelAddCookie,
    }

    const serverStartHandlers = {
        handleSubmitWssStart,
        onSubmitWssStart,
        registerWssStart,
        wssStartControl,
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '32%',
                    height: '95%',
                    borderRadius: '23px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <Box
                    sx={{
                        width: '75%',
                        height: '100%',
                        bgcolor: 'primary.box',
                        borderRadius: '23px',
                    }}
                >
                    <SideBar data={sideBarData} />
                </Box>
            </Box>
            <Box
                sx={{
                    width: '65%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                <Box
                    sx={{
                        width: '75%',
                        height: '45%',
                        bgcolor: 'primary.box',
                        borderRadius: '23px',
                    }}
                >
                    <Form
                        data={startServer}
                        handlers={serverStartHandlers}
                        isLoading={isWssStartLoading}
                    />
                </Box>
                <Box
                    sx={{
                        width: '75%',
                        height: '45%',
                        bgcolor: 'primary.box',
                        borderRadius: '23px',
                    }}
                >
                    <Form
                        data={connectToServerForm}
                        isLoading={isWssConnectLoading}
                        handlers={connectToServerHandlers}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default WebSocketInitPage
