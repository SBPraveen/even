import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Consumer from './pages/Consumer'
import CreateWebsocketServer from './pages/CreateWebsocketServer'
import Error from './pages/Error'
import KafkaServer from './pages/KafkaServer'
import Layout from './pages/Layout'
import Producer from './pages/Producer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import SchemaRegistry from './pages/SchemaRegistry'
import { ThemeProvider } from '@emotion/react'
import WebsocketTestEngine from './pages/WebsocketTestEngine'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter([
    {
        children: [
            {
                element: <CreateWebsocketServer />,
                path: '/webSocketServer',
            },
            {
                element: <WebsocketTestEngine />,
                path: '/webSocketTestEngine',
            },
            {
                element: <KafkaServer />,
                path: '/kafkaServer',
            },
            {
                element: <SchemaRegistry />,
                path: '/schemaRegistry',
            },
            { element: <Producer />, path: '/producer' },
            { element: <Consumer />, path: '/consumer' },
        ],
        element: <Layout />,
        errorElement: (
            <Layout>
                <Error />
            </Layout>
        ),
        path: '/',
    },
])

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
)
