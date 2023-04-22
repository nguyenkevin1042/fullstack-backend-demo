import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorsHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                // order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEN', 'valueVI'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEN', 'valueVI'] }
                ],
                raw: true,
                nest: true

            });

            resolve({
                errCode: 0,
                message: "getTopDoctorsHome OK",
                data: users
            })
        } catch (error) {
            reject(error)
        }
    });
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' }
            });

            resolve({
                errCode: 0,
                message: "getAllDoctors OK",
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    });
}

let saveDoctorInfor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML
                || !inputData.contentMarkdown || !inputData.action
                || !inputData.selectedPrice || !inputData.selectedPayment
                || !inputData.selectedProvince || !inputData.nameClinic
                || !inputData.addressClinic) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter",
                })
            } else {
                //Markdown table
                if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        await doctorMarkdown.save();
                    }
                }

                if (inputData.action === 'CREATE') {

                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })

                    // await db.Doctor_Infor.create({
                    //     doctorId: inputData.doctorId,
                    //     priceId: inputData.selectedPrice,
                    //     paymentId: inputData.selectedPayment,
                    //     provinceId: inputData.selectedProvince,
                    //     nameClinic: inputData.nameClinic,
                    //     addressClinic: inputData.addressClinic,
                    //     note: inputData.note
                    // })
                }

                //Doctor_Info table
                let doctorInfo = await db.Doctor_Infor.findOne({
                    where: { doctorId: inputData.doctorId },
                    raw: false
                })

                if (doctorInfo) {
                    //update
                    doctorInfo.priceId = inputData.selectedPrice;
                    doctorInfo.paymentId = inputData.selectedPayment;
                    doctorInfo.provinceId = inputData.selectedProvince;
                    doctorInfo.nameClinic = inputData.nameClinic;
                    doctorInfo.addressClinic = inputData.addressClinic;
                    doctorInfo.note = inputData.note;
                    await doctorInfo.save();

                } else {
                    //create
                    await db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        paymentId: inputData.selectedPayment,
                        provinceId: inputData.selectedProvince,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note
                    })
                }
            }

            resolve({
                errCode: 1,
                message: "Missing parameter",
            })

        } catch (error) {
            reject(error)
        }
    });
}

let getDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: "Missing id parameter"
                })
            } else {
                let infoData = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'description']
                        },
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                {
                                    model: db.Allcode,
                                    as: 'priceData',
                                    attributes: ['valueEN', 'valueVI']
                                },
                                {
                                    model: db.Allcode,
                                    as: 'paymentData',
                                    attributes: ['valueEN', 'valueVI']
                                },
                                {
                                    model: db.Allcode,
                                    as: 'provinceData',
                                    attributes: ['valueEN', 'valueVI']
                                }
                            ]
                        },
                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['valueEN', 'valueVI']
                        }

                    ],
                    raw: true,
                    nest: true
                })

                if (infoData && infoData.image) {
                    infoData.image = new Buffer(infoData.image, 'base64').toString('binary');
                }

                if (!infoData) {
                    infoData = {};
                }

                resolve({
                    errCode: 0,
                    data: infoData
                })
            }

        } catch (error) {
            reject(error)
        }
    });
}

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.selectedTime
                && !data.doctorId
                && !data.date) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            } else {
                let schedule = data.selectedTime;
                let finalResult = [];

                if (schedule && schedule.length > 0) {
                    for (let i = 0; i < schedule.length; i++) {
                        finalResult[i] = {
                            doctorId: data.doctorId,
                            date: data.date,
                            timeType: schedule[i].keyMap,
                            maxNumber: MAX_NUMBER_SCHEDULE
                        }
                    }
                }

                let existedData = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.date },
                    attributes: ['doctorId', 'timeType', 'date', 'maxNumber'],
                    raw: true
                })



                let toCreate = _.differenceWith(finalResult, existedData, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                }
                )

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }

                resolve({
                    errCode: 0,
                    message: "Save completed"
                })
            }

        } catch (error) {
            reject(error)
        }
    });
}


let getScheduleByIdAndDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: "Missing paramater"
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEN', 'valueVI'] }
                    ],
                    raw: false,
                    nest: true

                })

                if (!data) {
                    data = [];
                }


                resolve({
                    errCode: 0,
                    data: data
                })
            }


        } catch (error) {
            reject(error)
        }
    });
}

let getExtraInfoById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: "Missing paramater"
                })
            } else {
                let data = await db.Doctor_Infor.findOne({
                    where: { doctorId: inputId },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: 'priceData',
                            attributes: ['valueEN', 'valueVI']
                        },
                        {
                            model: db.Allcode,
                            as: 'paymentData',
                            attributes: ['valueEN', 'valueVI']
                        },
                        {
                            model: db.Allcode,
                            as: 'provinceData',
                            attributes: ['valueEN', 'valueVI']
                        }
                    ],
                    raw: false,
                    nested: true
                })

                resolve({
                    errCode: 1,
                    data: data
                })
            }

        } catch (error) {
            reject(error)
        }
    });
}

let getProfileDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: "Missing paramater"
                })
            } else {
                let infoData = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'description']
                        },
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                {
                                    model: db.Allcode,
                                    as: 'priceData',
                                    attributes: ['valueEN', 'valueVI']
                                },
                                {
                                    model: db.Allcode,
                                    as: 'paymentData',
                                    attributes: ['valueEN', 'valueVI']
                                },
                                {
                                    model: db.Allcode,
                                    as: 'provinceData',
                                    attributes: ['valueEN', 'valueVI']
                                }
                            ]
                        },
                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['valueEN', 'valueVI']
                        }

                    ],
                    raw: false,
                    nest: true
                })

                if (infoData && infoData.image) {
                    infoData.image = new Buffer(infoData.image, 'base64').toString('binary');
                }

                if (!infoData) {
                    infoData = {};
                }

                resolve({
                    errCode: 0,
                    data: infoData
                })
            }

        } catch (error) {
            reject(error)
        }
    });
}


module.exports = {
    getTopDoctorsHome: getTopDoctorsHome,
    getAllDoctors: getAllDoctors,
    saveDoctorInfor: saveDoctorInfor,
    getDoctorById: getDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByIdAndDate: getScheduleByIdAndDate,
    getExtraInfoById: getExtraInfoById,
    getProfileDoctorById: getProfileDoctorById
}