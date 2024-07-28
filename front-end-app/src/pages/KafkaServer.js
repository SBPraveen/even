/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
/* eslint-disable sort-keys */
import { Box, Tooltip, Grid, Typography } from '@mui/material'
import styles from '../styles/pages/KafkaServer'
import Form from '../components/form/Form'
import { useForm } from 'react-hook-form'
import startKafkaBroker from '../data/startKafkaBroker'
import { useState } from 'react'
import CopyBox from '../components/CopyBox'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import IconButton from '../components/buttons/IconButton'
import TextButton from '../components/buttons/TextButton'
import createKafkaTopic from '../data/createKafkaTopic'

const KafkaServer = () => {
    const [isKafkaStarted, setIsKafkaStarted] = useState(false)
    const [isKafkaLoading, setIsKafkaLoading] = useState(false)
    const [topicData, setTopicData] = useState([])
    const [kafkaPort, setKafkaPort] = useState('')
    const {
        register: registerKafkaStart,
        handleSubmit: handleSubmitKafkaStart,
    } = useForm()
    const {
        register: registerCreateTopic,
        handleSubmit: handleSubmitCreateTopic,
    } = useForm()

    const handleStopKafkaServer = () => {
        console.log('Stop Kafka server')
    }

    const onProducerCreate = () => {
        console.log('Create a new Producer')
    }
    const onConsumerCreate = () => {
        console.log('Create a new consumer')
    }
    const onDeleteTopic = () => {
        console.log('Delete a topic')
    }

    const onSubmitKafkaStart = (formData) => {
        setKafkaPort(formData.port)
        setIsKafkaStarted(true)
        const data = [
            {
                topicName: 'job-data',
                noOfPartitions: '4',
            },
            {
                topicName: 'job-data',
                noOfPartitions: '4',
            },
            {
                topicName: 'job-data',
                noOfPartitions: '4',
            },
            {
                topicName: 'job-data',
                noOfPartitions: '4',
            },
            {
                topicName: 'job-data',
                noOfPartitions: '4',
            },
            {
                topicName: 'job-data',
                noOfPartitions: '4',
            },
            {
                topicName: 'job-data',
                noOfPartitions: '4',
            },
        ]
        setTopicData(data)
    }
    const onSubmitCreateTopic = (formData) => {
        console.log('Create a new topic')
    }

    const brokerStartHandlers = {
        registerKafkaStart,
        handleSubmitKafkaStart,
        onSubmitKafkaStart,
    }
    const createTopicHandlers = {
        registerCreateTopic,
        handleSubmitCreateTopic,
        onSubmitCreateTopic,
    }
    return (
        <Box sx={styles.kafkaServerMain}>
            {!isKafkaStarted && (
                <Box
                    sx={{
                        width: '50%',
                        height: '22%',

                        borderRadius: '23px',
                    }}
                >
                    <Form
                        data={startKafkaBroker}
                        handlers={brokerStartHandlers}
                        isLoading={isKafkaLoading}
                    />
                </Box>
            )}
            {isKafkaStarted && (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '12%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Typography sx={{ margin: '0 1vw' }}>
                            Started Kafka server at
                        </Typography>
                        <CopyBox text={`localhost:${kafkaPort}`} />
                        <IconButton
                            style={{ marginLeft: '2vw' }}
                            buttonName={'Stop'}
                            Icon={() => <FlightLandIcon />}
                            buttonBackground={'fail.main'}
                            iconColor={'fail.light'}
                            handleSubmit={handleStopKafkaServer}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: '20%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Form
                            data={createKafkaTopic}
                            handlers={createTopicHandlers}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10vh',
                        }}
                    >
                        <Typography
                            variant='h5'
                            sx={{ color: 'text.backgroundMatch' }}
                        >
                            Available topics
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            maxHeight: '50vh',
                            overflowY: 'auto',
                            marginTop: '1vh',
                            marginBottom: '1%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'primary.iconLight',
                                borderRadius: '3px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: 'primary.main',
                            },
                            '*': {
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'primary.iconLight',
                            },
                        }}
                    >
                        <Grid
                            container
                            rowSpacing={1.5}
                            columnSpacing={4}
                            sx={{
                                width: '97%',
                                height: '100%',
                            }}
                        >
                            {topicData &&
                                topicData.map((topic, index) => {
                                    return (
                                        <Grid
                                            key={index}
                                            item
                                            xs={3}
                                            sx={{
                                                margin: '0',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                '&.MuiGrid-item': {
                                                    paddingTop: '0',
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '15vh',
                                                    bgcolor: 'primary.box',
                                                    borderRadius: '10px',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Typography>
                                                    Topic name :
                                                    {topic.topicName}
                                                </Typography>
                                                <Typography>
                                                    No of partitions :
                                                    {topic.noOfPartitions}
                                                </Typography>
                                                <TextButton
                                                    text={'Create new producer'}
                                                    color={'text.disabled'}
                                                    onHoverColor={
                                                        'primary.main'
                                                    }
                                                    onClick={onProducerCreate}
                                                />
                                                <TextButton
                                                    text={'Create new consumer'}
                                                    color={'text.disabled'}
                                                    onHoverColor={
                                                        'primary.main'
                                                    }
                                                    onClick={onConsumerCreate}
                                                />
                                                <TextButton
                                                    text={'Delete topic'}
                                                    color={'text.disabled'}
                                                    onHoverColor={'fail.main'}
                                                    onClick={onDeleteTopic}
                                                />
                                            </Box>
                                        </Grid>
                                    )
                                })}
                        </Grid>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default KafkaServer
