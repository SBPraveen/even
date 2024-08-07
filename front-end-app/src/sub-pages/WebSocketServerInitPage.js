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
const WebSocketInitPage = ({
    setIsServerStarted,
    setPort,
    setUrl,
    setEncryptionData,
    setSchemas,
}) => {
    const {
        register: registerWssStart,
        handleSubmit: handleSubmitWssStart,
        control: wssStartControl,
    } = useForm()
    const {
        register: registerWssConnect,
        handleSubmit: handleSubmitWssConnect,
        setValue: setValueWssConnect,
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
    const [selectedSchemaRepository, setSelectedSchemaRepository] = useState('')

    useEffect(() => {
        window.ipcRenderer.getAllDocuments().then((documents) => {
            const sideBarData = documents.map((document) => {
                const newDocument = {
                    data: [],
                    name: document.apiName,
                }
                document.urls.forEach((url) => {
                    newDocument.data.push({
                        name: `${document.apiName}:${url}`,
                        url,
                    })
                })
                return newDocument
            })
            setSideBarData(sideBarData)
        })
    }, [])

    const handleSideBarOpen = (folder) => {
        let tempData = JSON.parse(JSON.stringify(sideBarData))
        tempData = tempData.map((data) => {
            if (data.name === folder.name) {
                data.isOpen = !data.isOpen
            }
            return data
        })
        setSelectedSchemaRepository(folder.name)
        setSideBarData(tempData)
    }

    const onSubmitWssStart = async (data) => {
        console.log(data)
        setIsWssStartLoading(true)
        setIsServerStarted(true)
        setPort(data.port)
        setEncryptionData({
            encryptionKey: data.enDeKey,
            encryptionAlg: data.enDeAlgorithm,
        })
        let schemas = []
        if (selectedSchemaRepository) {
            schemas = await window.ipcRenderer.getSchemaValues(
                selectedSchemaRepository,
            )
        }
        setSchemas(schemas?.examples ?? [])
        const serverStatus = await window.ipcRenderer.startWebSocketServer(data)
        if (!serverStatus) {
            setIsWssStartLoading(false)
            setIsServerStarted(false)
        }
    }
    const onSubmitWssConnect = async (data) => {
        setIsWssConnectLoading(true)
        setIsServerStarted(true)
        setUrl(data.url)
        const serverData = { ...data, cookies }
        setEncryptionData({
            encryptionKey: data.enDeKey,
            encryptionAlg: data.enDeAlgorithm,
        })
        const schemas = await window.ipcRenderer.getSchemaValues(
            selectedSchemaRepository,
        )
        setSchemas(schemas.examples ?? [])
        window.ipcRenderer.connectWebSocketServer(serverData)
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
                    <SideBar
                        data={sideBarData}
                        handleSideBarOpen={handleSideBarOpen}
                        setValueWssConnect={setValueWssConnect}
                        setSideBarData={setSideBarData}
                    />
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
