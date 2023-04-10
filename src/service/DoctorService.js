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

module.exports = {
    getTopDoctorsHome: getTopDoctorsHome
}