import specialtyService from '../service/SpecialtyService'

let handleSaveNewSpecialty = async (request, response) => {
    try {
        let message = await specialtyService.saveNewSpecialty(request.body);
        return response.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}

let handleGetAllSpecialty = async (request, response) => {
    try {
        let message = await specialtyService.getAllSpecialty(request.body);
        return response.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}

let handleGetDetailSpecialtyById = async (request, response) => {
    try {
        let message = await specialtyService.getDetailSpecialtyById(request.query.id, request.query.location);
        return response.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    handleSaveNewSpecialty: handleSaveNewSpecialty,
    handleGetAllSpecialty: handleGetAllSpecialty,
    handleGetDetailSpecialtyById: handleGetDetailSpecialtyById

}