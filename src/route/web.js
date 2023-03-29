import express from "express";
// import { UniqueConstraintError } from "sequelize/types";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.displayCRUD);

    //show all user
    // router.get("/", homeController.displayCRUD);
    //redirect to create new user page
    router.get("/crud", homeController.getCRUD);

    //create new user
    router.post("/post-crud", homeController.postCRUD);
    //edit user
    router.get("/edit-crud", homeController.editCRUD);
    router.post("/put-crud", homeController.putCRUD);
    //delete user
    router.get("/delete-crud", homeController.deleteCRUD);


    //API
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.get("/api/delete-user", userController.handleDeleteUser);
    router.get("/api/edit-user", userController.handleEditUser);

    return app.use("/", router); //use routers that we declared
}

module.exports = initWebRoutes;