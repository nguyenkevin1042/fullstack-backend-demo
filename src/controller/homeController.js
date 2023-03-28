import db from '../models/index';
import CRUDService from '../service/CRUDService';

let getHomepage = async (request, response) => {
    try {
        let data = await db.User.findAll();

        return response.render("index.ejs", {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error)
    }
}

let getAboutpage = (request, response) => {
    return response.render("about.ejs");
}

let getCRUD = (request, response) => {
    return response.render("crud.ejs");
}

let postCRUD = async (request, response) => {
    let data = await request.body;
    CRUDService.createNewUser(data);
    return response.redirect("/");

}

let displayCRUD = async (request, response) => {
    let data = await CRUDService.getAllUser();
    return response.render("displayCRUD.ejs", {
        data: data
    });
}

let editCRUD = async (request, response) => {
    let userId = request.query.id;
    if (userId != {}) {
        let userData = await CRUDService.getUserById(userId);
        return response.render("editCRUD.ejs", {
            userData: userData
        });
    } else {
        return response.send("No ID found");
    }

}

let putCRUD = async (request, response) => {
    let data = await request.body;
    await CRUDService.updateUser(data);

    let allUsers = await CRUDService.getAllUser();
    // return response.render("displayCRUD.ejs", {
    //     data: allUsers
    // });
    return displayCRUD(request, response);
}

let deleteCRUD = async (request, response) => {
    let id = request.query.id;
    if (id) {
        await CRUDService.deleteCRUD(id);
        return response.send("Deleted");
    } else {
        return response.send("User not found");
    }
}

module.exports = {
    getHomepage: getHomepage,
    getAboutpage: getAboutpage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}