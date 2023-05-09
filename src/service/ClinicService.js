import db from '../models/index';

let saveNewClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imageBase64 ||
                !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {

                await db.Clinic.create({
                    descriptionMarkdown: data.contentMarkdown,
                    descriptionHTML: data.contentHTML,
                    image: data.imageBase64,
                    name: data.name,
                    address: data.address
                });

                resolve({
                    errCode: 0,
                    errMessage: "Create new clinic successful"
                })
            }

        } catch (error) {
            reject(error);
        }
    });
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }

            resolve({
                errCode: 0,
                message: "getAllClinic OK",
                data: data
            })
        } catch (error) {
            reject(error)
        }
    });
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: "Missing parameter",
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'name', 'address']

                });
                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId']
                    });

                    data.doctorClinic = doctorClinic
                } else {
                    data = {}
                }
                resolve({
                    errCode: 0,
                    data
                })
            }




        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    saveNewClinic: saveNewClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}