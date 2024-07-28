const startServer = {
    body: [
        {
            description:
                'The port where the web socket server will start. Use this port to connect from the frontend',
            fields: [
                {
                    fieldName: 'port',
                    placeholder: 'Port',
                    register: 'registerWssStart',
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
                    fieldName: 'enDeKey',
                    placeholder: 'Key',
                    register: 'registerWssStart',
                    size: 'small',
                    type: 'textfield',
                },
                {
                    fieldName: 'enDeAlgorithm',
                    options: ['Advanced Encryption Standard (AES) algorithm'],
                    placeholder: 'Algorithm',
                    register: 'registerWssStart',
                    size: 'medium',
                    type: 'dropdown',
                },
            ],
            isRequired: false,
            name: 'Encryption & Decryption',
        },
        {
            description:
                'If a web socket server is already present, then "even" will run your web socket server in the background, so that the browser will receive the messages sent by your web socket server as well as the messages manually sent from even. NOTE: (1) In the "Port" field below, mention the port where your web socket server will start. Don\'t use this port to connect from the frontend. (2) If the WebSocket server accepts requests only from specific origins, list one of the origins in the origin field below.',
            fields: [
                {
                    fieldName: 'proxyPort',
                    placeholder: 'Port',
                    register: 'registerWssStart',
                    size: 'small',
                    type: 'textfield',
                },
                {
                    fieldName: 'proxyCommand',
                    placeholder: 'Command (Eg: yarn build && yarn start)',
                    register: 'registerWssStart',
                    size: 'medium',
                    type: 'textfield',
                },
                {
                    fieldName: 'proxyOrigin',
                    placeholder: 'Origin',
                    register: 'registerWssStart',
                    size: 'small',
                    type: 'textfield',
                },
                {
                    control: 'wssStartControl',
                    fieldName: 'proxyFolderPath',
                    size: 'medium',
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
            icon: 'flightTakeoffIcon',
            iconColor: 'success.light',
            name: 'Start',
            onClick: 'handleSubmitWssStart',
            onSubmit: 'onSubmitWssStart',
            type: 'iconButton',
        },
    ],
    header: {
        name: 'Start a server',
    },
}

export default startServer
