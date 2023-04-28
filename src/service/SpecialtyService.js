import db from '../models/index';

let saveNewSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 ||
                !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {

                await db.Specialty.create({
                    descriptionMarkdown: data.contentMarkdown,
                    descriptionHTML: data.contentHTML,
                    image: data.imageBase64,
                    name: data.name
                });

                resolve({
                    errCode: 0,
                    errMessage: "Create new specialty successful"
                })
            }

        } catch (error) {
            reject(error);
        }
    });
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }

            resolve({
                errCode: 0,
                message: "getAllSpecialty OK",
                data: data
            })
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    saveNewSpecialty: saveNewSpecialty,
    getAllSpecialty: getAllSpecialty
}