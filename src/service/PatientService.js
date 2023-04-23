import db from '../models/index';
require("dotenv").config();

let saveNewPatientBookingSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data)
            if (!data.email && !data.doctorId &&
                !data.timeType && !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
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
                            timeType: data.timeType
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

// let default = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {

//         } catch (error) {
//             reject(error)
//         }
//     })
// }

module.exports = {
    saveNewPatientBookingSchedule: saveNewPatientBookingSchedule,

}