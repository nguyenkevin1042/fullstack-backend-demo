import clinicService from '../service/ClinicService';

let handleSaveNewClinic = async (request, response) => {
    try {
        let message = await clinicService.saveNewClinic(request.body);
        return response.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}

let handleGetAllClinic = async (request, response) => {
    try {
        let message = await clinicService.getAllClinic(request.body);
        return response.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}

let handleGetDetailClinicById = async (request, response) => {
    try {
        let message = await clinicService.getDetailClinicById(request.query.id);
        return response.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    handleSaveNewClinic: handleSaveNewClinic,
    handleGetAllClinic: handleGetAllClinic,
    handleGetDetailClinicById: handleGetDetailClinicById
}