export const timeStampFormatter = (timestamp, time = true) => {
    if (time) {
        const date = new Date(timestamp)
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true,
            minute: '2-digit',
            second: '2-digit',
        })
    }
    const milliseconds = timestamp % 1000
    const totalSeconds = Math.floor(timestamp / 1000)
    const seconds = totalSeconds % 60
    const totalMinutes = Math.floor(totalSeconds / 60)
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)
    let timeString = ''
    if (hours > 0) {
        timeString += `${hours} hours, `
    }
    if (minutes > 0) {
        timeString += `${minutes} minutes, `
    }
    if (seconds > 0) {
        timeString += `${seconds} seconds, `
    }
    if (timeString.length > 0) {
        timeString += `and ${milliseconds} milliseconds`
    } else {
        timeString += `${milliseconds} milliseconds`
    }
    return timeString
}
