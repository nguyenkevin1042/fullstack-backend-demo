"use strict";

var _express = _interopRequireDefault(require("express"));
var _homeController = _interopRequireDefault(require("../controller/homeController"));
var _userController = _interopRequireDefault(require("../controller/userController"));
var _doctorController = _interopRequireDefault(require("../controller/doctorController"));
var _patientController = _interopRequireDefault(require("../controller/patientController"));
var _specialtyController = _interopRequireDefault(require("../controller/specialtyController"));
var _clinicController = _interopRequireDefault(require("../controller/clinicController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import { UniqueConstraintError } from "sequelize/types";

var router = _express["default"].Router();
var initWebRoutes = function initWebRoutes(app) {
  router.get("/", _homeController["default"].displayCRUD);

  //show all user
  // router.get("/", homeController.displayCRUD);
  //redirect to create new user page
  router.get("/crud", _homeController["default"].getCRUD);

  //create new user
  router.post("/post-crud", _homeController["default"].postCRUD);
  //edit user
  router.get("/edit-crud", _homeController["default"].editCRUD);
  router.post("/put-crud", _homeController["default"].putCRUD);
  //delete user
  router.get("/delete-crud", _homeController["default"].deleteCRUD);

  //API
  router.post("/api/login", _userController["default"].handleLogin);
  router.get("/api/get-all-users", _userController["default"].handleGetAllUsers);
  router.post("/api/create-new-user", _userController["default"].handleCreateNewUser);
  router["delete"]("/api/delete-user", _userController["default"].handleDeleteUser);
  router.put("/api/edit-user", _userController["default"].handleEditUser);
  router.get("/api/get-all-codes", _userController["default"].handleGetAllCodes);
  router.get("/api/top-doctors-home", _doctorController["default"].handleGetTopDoctorsHome);
  router.get("/api/get-all-doctors", _doctorController["default"].handleGetAllDoctors);
  router.post("/api/save-doctor-information", _doctorController["default"].handleSaveDoctorInfor);
  router.get("/api/get-detail-doctor-by-id", _doctorController["default"].handleGetDetailDoctorById);
  router.post("/api/bulk-create-schedule", _doctorController["default"].handleBulkCreateSchedule);
  router.get("/api/get-doctor-schedule-by-id-and-date", _doctorController["default"].handleGetScheduleByIdAndDate);
  router.get("/api/get-extra-info-by-id", _doctorController["default"].handleGetExtraInfoById);
  router.get("/api/get-list-patient", _doctorController["default"].handleGetListPatient);
  router.get("/api/get-profile-doctor-by-id", _doctorController["default"].handleGetProfileDoctorById);
  router.post("/api/patient-book-schedule", _patientController["default"].handleSavePatientBookSchedule);
  router.post("/api/verify-booking", _patientController["default"].handleVerifyBooking);
  router.post("/api/create-new-specialty", _specialtyController["default"].handleSaveNewSpecialty);
  router.get("/api/get-all-specialty", _specialtyController["default"].handleGetAllSpecialty);
  router.get("/api/get-detail-specialty-by-id", _specialtyController["default"].handleGetDetailSpecialtyById);
  router.post("/api/create-new-clinic", _clinicController["default"].handleSaveNewClinic);
  router.get("/api/get-all-clinic", _clinicController["default"].handleGetAllClinic);
  router.get("/api/get-detail-clinic-by-id", _clinicController["default"].handleGetDetailClinicById);
  router.post("/api/send-remedy", _doctorController["default"].handleSendRemedy);
  return app.use("/", router); //use routers that we declared
};

module.exports = initWebRoutes;