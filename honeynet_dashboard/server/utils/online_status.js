function getStatus(lastOnlineDateTime) {
    const today = new Date();

    let value = (today.getTime() - lastOnlineDateTime.getTime()) / 1000;
    value /= 60;
    const minuteDifference = Math.abs(Math.round(value))

    if (minuteDifference > 10) {
        return "OFF";
    } else {
        return "ON";
    };
}

module.exports = { getStatus };
