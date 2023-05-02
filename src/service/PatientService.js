import db from '../models/index';
import emailService from './EmailService';
import { v4 as uuidv4 } from 'uuid';
require("dotenv").config();

let buildUrlEmail = (doctorId, token) => {

    let result = process.env.URL_REACT +
        "/verify-booking?token=" + token +
        "&doctorId=" + doctorId;
    return result;
}


let saveNewPatientBookingSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data)
        try {
            if (!data.email && !data.doctorId &&
                !data.timeType && !data.date &&
                !data.fullName && !data.gender &&
                !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                let token = uuidv4();
                //upsert patient
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    doctorName: data.doctorName,
                    time: data.timeString,
                    language: data.language,
                    reason: data.reason,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                });

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        firstName: data.fullName,
                        gender: data.gender.value,
                        address: data.address,
                        email: data.email,
                        roleId: 'R3'
                    }
                });

                //create booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token,

                        }

                    })
                }

                resolve({
                    errCode: 0,
                    message: "Booking Successful"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let verifyBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1',
                    },
                    raw: false
                })


                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save()
                    resolve({
                        errCode: 0,
                        errMessage: "Verify booking successful"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Verify booking fail"
                    })
                }
            }

        } catch (error) {
            reject(error)
        }
    })
}

// let default = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {

//         } catch (error) {
//          reject(error)
//         }
//     })
// }

module.exports = {
    saveNewPatientBookingSchedule: saveNewPatientBookingSchedule,
    verifyBooking: verifyBooking
}