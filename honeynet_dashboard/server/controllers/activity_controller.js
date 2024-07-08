const { retrieveCount } = require('../models/message');
const { getLastOnline } = require('../models/last_online');
const { successResponse, errorResponse } = require('../utils/responses');
const { getStatus } = require('../utils/online_status');
const dotenv = require('dotenv');
dotenv.config();

/* User creation function */
const getDetailsOfPis = async (req, res) => {
    const messageCount = [];
    const onlineStatus = [];
    const overallData = [];

    await retrieveCount()
        .then(data => {
            data.forEach(element => {
                messageCount.push({
                    pi_id: element.pi_id,
                    message_count: Number(element.message_count),
                    last_msg_date: element.last_message_date
                });
            });
        })
        .catch(err => {
            console.error(err);
            errorResponse(res, 400, "Error sending details!");
        });

    await getLastOnline()
        .then(data => {
            data.forEach(element => {
                onlineStatus.push({
                    pi_id: element.pi_id,
                    pi_ip: element.pi_ip,
                    time: element.online_time,
                    num_of_modems: element.num_of_modems,
                    available_modems: element.available_modems,
                    status: getStatus(element.online_time)
                });
            });
        })
        
        .catch(err => {
            console.log(err)
        });

    overallData.push({
        msgCountData: messageCount,
        onlineStatusData: onlineStatus
    });

    successResponse(res, "200", "Data sent successfully", overallData);
};

module.exports = { getDetailsOfPis };
