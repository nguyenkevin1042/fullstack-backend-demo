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

let createNewUser = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(dataInput.email);
            if (check == true) {
                resolve({
                    errCode: 1,
                    message: 'Email is already existed'
                });
            } else {
                let hashPassword = await hashPasswordFromInput(dataInput.password);
                await db.User.create({
                    email: dataInput.email,
                    password: hashPassword,
                    firstName: dataInput.firstName,
                    lastName: dataInput.lastName,
                    address: dataInput.address,
                    gender: dataInput.gender === '0' ? true : false,
                    roleId: dataInput.roleId,
                    phoneNumber: dataInput.phoneNumber
                });

                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }


        } catch (error) {
            reject(error);
        }
    });
}

let hashPasswordFromInput = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    });
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (!user) {
                resolve({
                    errCode: 1,
                    message: 'User does not existed'
                });
            }
            if (user) {
                await db.User.destroy({
                    where: { id: userId }
                });
            }


            resolve({
                errCode: 0,
                message: 'Success'
            });

        } catch (error) {
            reject(error);
        }
    });
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address
                // }, {
                //     where: { id: data.id }
                // });
                resolve({
                    errCode: 0,
                    message: 'Success'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'User does not existed'
                });
            }

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser
}