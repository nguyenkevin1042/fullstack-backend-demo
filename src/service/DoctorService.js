import db from '../models/index';

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
            if (!inputData.doctorId
                || !inputData.contentHTML
                || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter",

                })
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId
                    // specialtyId: null,
                    // clinicId: DataTypes.INTEGER
                })

                resolve({
                    errCode: 0,
                    message: "saveDoctorInfor OK"
                })
            }

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


module.exports = {
    getTopDoctorsHome: getTopDoctorsHome,
    getAllDoctors: getAllDoctors,
    saveDoctorInfor: saveDoctorInfor,
    getDoctorById: getDoctorById
}