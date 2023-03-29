import userService from '../service/UserService';

let handleLogin = async (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    if (!email || !password) {
        return response.status(500).json({
            errCode: 1,
            message: 'Email/password can not be left empty'
        });
    }

    let userData = await userService.handleUserLogin(email, password);

    return response.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    });
}

let handleGetAllUsers = async (request, response) => {
    // let id = request.body.id;
    let userData = await userService.getAllUsers();
    return response.status(200).json({
        errCode: 0,
        message: 'OK',
        users: userData
    })
}

let handleCreateNewUser = async (request, response) => {
    try {
        let message = await userService.createNewUser(request.body);
        console.log(message);
        return response.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}

let handleDeleteUser = async (request, response) => {
    try {
        let idParam = request.body.id;
        let result = {
            errCode: 0,
            message: ''
        };
        if (idParam === undefined) {
            result.errCode = 2;
            result.message = 'Missing ID';
        }
        result.message = await userService.deleteUser(idParam).message;
        return response.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

let handleEditUser = async (request, response) => {
    try {
        // let idParam = request.body.id;
        let result = {
            errCode: 0,
            message: ''
        };
        // if (idParam === undefined) {
        //     result.errCode = 2;
        //     result.message = 'Missing ID';
        // }
        result.message = await userService.editUser(request.body);
        return response.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser
}