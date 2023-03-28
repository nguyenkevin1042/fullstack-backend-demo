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

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}