import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'

const startServer = () => ({
    body: [
        {
            description:
                'The port where the web socket server will start. Use this port to connect from the frontend',
            fields: [
                {
                    placeholder: 'Port',
                    size: 'large',
                    type: 'textfield',
                },
            ],
            isRequired: true,
            name: 'Port',
        },
        {
            description:
                'Messages will be encrypted using the key and the algorithm selected when sent to the web socket server from "even" and vice versa',
            fields: [
                {
                    placeholder: 'Key',
                    size: 'small',
                    type: 'textfield',
                },
                {
                    options: ['Advanced Encryption Standard (AES) algorithm'],
                    placeholder: 'Algorithm',
                    size: 'medium',
                    type: 'dropdown',
                },
            ],
            isRequired: false,
            name: 'Encryption & Decryption',
        },
        {
            description:
                'If a web socket server is already present, then "even" will run your web socket server in the background, so that the browser will receive the messages sent by your web socket server as well as the messages manually sent from even. NOTE: In the "Port" field below, mention the port where your web socket server will start. Don\'t use this port to connect from the frontend',
            fields: [
                {
                    placeholder: 'Port',
                    size: 'small',
                    type: 'textfield',
                },
                {
                    placeholder: 'Command (Eg: yarn build && yarn start)',
                    size: 'medium',
                    type: 'textfield',
                },
                {
                    placeholder: 'Command (Eg: yarn build && yarn start)',
                    size: 'large',
                    type: 'folderSelector',
                },
            ],
            isRequired: false,
            name: 'Proxy Server',
        },
    ],
    footer: [
        {
            buttonColor: 'success.main',
            icon: <FlightTakeoffIcon />,
            iconColor: 'success.light',
            name: 'Start',
            type: 'iconButton',
        },
    ],
    header: {
        name: 'Start a server',
    },
})

export default startServer
