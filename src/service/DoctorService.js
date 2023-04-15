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
            console.log(inputData)
            if (!inputData.doctorId
                || !inputData.contentHTML
                || !inputData.contentMarkdown
                || !inputData.action) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter",
                })
            } else {
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