const createKafkaTopic = {
    body: [
        {
            description:
                'Mention the name of the topic and the number of partitions to start',
            fields: [
                {
                    fieldName: 'topicName',
                    placeholder: 'Topic Name',
                    register: 'registerCreateTopic',
                    size: 'medium',
                    type: 'textfield',
                },
                {
                    fieldName: 'partitions',
                    placeholder: 'No of partitions',
                    register: 'registerCreateTopic',
                    size: 'small',
                    type: 'textfield',
                },
            ],
            isRequired: true,
            name: 'Topic name & No of partitions',
        },
    ],
    footer: [
        {
            buttonColor: 'success.main',
            icon: 'flightTakeoffIcon',
            iconColor: 'success.light',
            name: 'Create',
            onClick: 'handleSubmitCreateTopic',
            onSubmit: 'onSubmitCreateTopic',
            type: 'iconButton',
        },
    ],
    header: {
        name: 'Create a kafka topic',
    },
}

export default createKafkaTopic
