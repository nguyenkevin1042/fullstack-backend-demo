import db from '../models/index';
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);

let handleUserLogin = (emailInput, passwordInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExisted = await checkEmail(emailInput);

            if (isExisted) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: emailInput },
                    raw: true
                });

                if (user) {
                    let checkPassword = await bcrypt.compareSync(passwordInput, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = "Email or password is not correct";
                    }
                } else {
                    userData.errCode = 3;
                    userData.message = "Email or password is not correct";
                }

            } else {
                userData.errCode = 2;
                userData.message = "Email is not existed in database";
            }

            resolve(userData)
        } catch (error) {
            reject(error);
        }
    });
}

let checkEmail = (emailInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: emailInput }
            })

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (error) {
            reject(error);
        }
    });
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = {};
            users = await db.User.findAll({
                attributes: {
                    exclude: ['password'],
                    raw: true
                }
            })

            // if (userId === 'ALL') {
            //     users = await db.User.findAll({
            //         attributes: {
            //             exclude: ['password']
            //         }
            //     })
            // }
            // if (userId && userId !== 'ALL') {
            // users = await db.User.findOne({
            //     where: { id: userId }
            // attributes: {
            //     exclude: ['password']
            // }
            // })
            // }

            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers
}