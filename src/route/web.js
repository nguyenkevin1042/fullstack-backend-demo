import express from "express";
// import { UniqueConstraintError } from "sequelize/types";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
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
    router.delete("/api/delete-user", userController.handleDeleteUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.get("/api/get-all-codes", userController.handleGetAllCodes);

    router.get("/api/top-doctors-home", doctorController.handleGetTopDoctorsHome);
    router.get("/api/get-all-doctors", doctorController.handleGetAllDoctors);
    router.post("/api/save-doctor-information", doctorController.handleSaveDoctorInfor);

    router.get("/api/get-detail-doctor-by-id", doctorController.handleGetDetailDoctorById);

    router.post("/api/bulk-create-schedule", doctorController.handleBulkCreateSchedule);


    return app.use("/", router); //use routers that we declared
}

module.exports = initWebRoutes;