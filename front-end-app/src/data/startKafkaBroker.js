const startKafkaBroker = {
    body: [
        {
            description:
                'The version of the kafka and the port where the kafka broker will start.',
            fields: [
                {
                    fieldName: 'port',
                    placeholder: 'Port',
                    register: 'registerKafkaStart',
                    size: 'medium',
                    type: 'textfield',
                },
                {
                    fieldName: 'version',
                    options: [
                        '3.0',
                        '3.1',
                        '3.2',
                        '3.3',
                        '3.4',
                        '3.5',
                        '3.6',
                        '3.7',
                    ],
                    placeholder: 'Kafka Version',
                    register: 'registerKafkaStart',
                    size: 'small',
                    type: 'dropdown',
                },
            ],
            isRequired: true,
            name: 'Port & Version',
        },
    ],
    footer: [
        {
            buttonColor: 'success.main',
            icon: 'flightTakeoffIcon',
            iconColor: 'success.light',
            name: 'Start',
            onClick: 'handleSubmitKafkaStart',
            onSubmit: 'onSubmitKafkaStart',
            type: 'iconButton',
        },
    ],
    header: {
        name: 'Start a Kafka server',
    },
}

export default startKafkaBroker
