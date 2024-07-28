/* eslint-disable max-lines-per-function */
const connectToServer = {
    body: [
        {
            fields: [
                {
                    fieldName: 'url',
                    placeholder:
                        'URL (Eg: ws://localhost:8080 or wss://example.com)',
                    register: 'registerWssConnect',
                    size: 'large',
                    type: 'textfield',
                },
            ],
            isRequired: true,
            name: 'Web-socket server URL',
        },
        {
            description:
                'Messages will be encrypted using the key and the algorithm selected when sent to the web socket server from "even" and vice versa',
            fields: [
                {
                    fieldName: 'enDeKey',
                    placeholder: 'Key',
                    register: 'registerWssConnect',
                    size: 'small',
                    type: 'textfield',
                },
                {
                    fieldName: 'enDeAlgorithm',
                    options: ['Advanced Encryption Standard (AES) algorithm'],
                    placeholder: 'Algorithm',
                    register: 'registerWssConnect',
                    size: 'medium',
                    type: 'dropdown',
                },
            ],
            isRequired: false,
            name: 'Encryption & Decryption',
        },
        {
            description:
                'If the WebSocket server accepts requests only from specific origins, list one of the origins in the field below. The origin will be sent as a part of the websocket request header ',
            fields: [
                {
                    fieldName: 'origin',
                    placeholder: 'Origin (Eg: https://example.com)',
                    register: 'registerWssConnect',
                    size: 'large',
                    type: 'textfield',
                },
            ],
            isRequired: false,
            name: 'Origin',
        },
        {
            description:
                'If cookies are added then they will be sent as a part of the request while establishing connection with the websocket server. NOTE: Cookies are generally used for authentication when connecting to a remote web-socket server',
            fields: [
                {
                    buttonName: 'Add cookie',
                    data: [],
                    onCardClick: 'onCookieCardClick',
                    onClickButton: 'onAddCookie',
                    onCloseCard: 'onCloseCard',
                    size: 'large',
                    type: 'boxCard',
                },
                {
                    fieldName: 'cookieName',
                    placeholder: 'Cookie name',
                    register: 'registerAddCookie',
                    shouldNotInitDisplay: true,
                    size: 'small',
                    type: 'textfield',
                },
                {
                    fieldName: 'cookieValue',
                    placeholder: 'Cookie value',
                    register: 'registerAddCookie',
                    shouldNotInitDisplay: true,
                    size: 'medium',
                    type: 'textfield',
                },
            ],
            isRequired: false,
            name: 'Cookies',
        },
    ],
    footer: [
        {
            buttonColor: 'success.main',
            icon: 'linkIcon',
            iconColor: 'success.light',
            name: 'Connect',
            onClick: 'handleSubmitWssConnect',
            onSubmit: 'onSubmitWssConnect',
            type: 'iconButton',
        },
        {
            buttonColor: 'primary.main',
            icon: 'cookieIcon',
            iconColor: 'primary.light',
            name: 'Add cookie',
            onClick: 'handleSubmitAddCookie',
            onSubmit: 'onSubmitAddCookie',
            shouldNotInitDisplay: true,
            type: 'iconButton',
        },
        {
            color: 'text.disabled',
            name: 'Cancel',
            onSubmit: 'onCancelAddCookie',
            shouldNotInitDisplay: true,
            type: 'outlinedButton',
        },
        {
            buttonColor: 'primary.main',
            icon: 'saveIcon',
            iconColor: 'primary.light',
            name: 'Save Cookie',
            onClick: 'handleSubmitAddCookie',
            onSubmit: 'onSaveEditCookie',
            shouldNotInitDisplay: true,
            type: 'iconButton',
        },

        {
            color: 'text.disabled',
            name: 'Cancel Edit',
            onSubmit: 'onCancelEditCookie',
            shouldNotInitDisplay: true,
            type: 'outlinedButton',
        },
    ],
    header: {
        name: 'Connect to a server',
    },
}

export default connectToServer
