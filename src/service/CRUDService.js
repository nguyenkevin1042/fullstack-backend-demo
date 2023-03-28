import db from '../models/index';
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashPasswordFromInput(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '0' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber
            });

            resolve("Create a new user success");
        } catch (error) {
            reject(error);
        }
    });
}

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll();
            resolve(users);
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

let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                resolve(user);
            } else {
                resolve({});
            }

        } catch (error) {
            reject(error);
        }
    });
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve();
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
}

let deleteCRUD = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                user.destroy();
            }

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteCRUD: deleteCRUD
}