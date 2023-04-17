import doctorService from '../service/DoctorService';

let handleGetTopDoctorsHome = async (request, response) => {

    try {
        let limit = request.query.limit;
        if (!limit) limit = 10;
        let res = await doctorService.getTopDoctorsHome(+limit);

        return response.status(200).json(res);
    } catch (error) {
        console.log(error)
        return response.status(200).json({
            errCode: -1,
            message: "error from doctorController"
        })
    }
}

let handleGetAllDoctors = async (request, response) => {

    try {
        let doctors = await doctorService.getAllDoctors();
        return response.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return response.status(200).json({
            errCode: -1,
            message: "error from doctorController"
        })
    }
}

let handleSaveDoctorInfor = async (request, response) => {

    try {
        let doctors = await doctorService.saveDoctorInfor(request.body);
        console.log(request.body)
        return response.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return response.status(200).json({
            errCode: -1,
            message: "error from doctorController.handleSaveDoctorInfor"
        })
    }
}

let handleGetDetailDoctorById = async (request, response) => {

    try {
        let info = await doctorService.getDoctorById(request.query.id);

        return response.status(200).json(info);
    } catch (error) {
        console.log(error);
        return response.status(200).json({
            errCode: -1,
            message: "error from doctorController.handleSaveDoctorInfor"
        })
    }
}

let handleBulkCreateSchedule = async (request, response) => {
    try {
        let schedule = await doctorService.bulkCreateSchedule(request.body);
        return response.status(200).json(schedule);
    } catch (error) {
        console.log(error);
        return response.status(200).json({
            errCode: -1,
            message: "error from doctorController.handleBulkCreateSchedule"
        })
    }
}


module.exports = {
    handleGetTopDoctorsHome: handleGetTopDoctorsHome,
    handleGetAllDoctors: handleGetAllDoctors,
    handleSaveDoctorInfor: handleSaveDoctorInfor,
    handleGetDetailDoctorById: handleGetDetailDoctorById,
    handleBulkCreateSchedule: handleBulkCreateSchedule
}