import specialtyService from '../service/SpecialtyService'

let handleSaveNewSpecialty = async (request, response) => {
    try {
        let message = await specialtyService.saveNewSpecialty(request.body);
        return response.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    handleSaveNewSpecialty: handleSaveNewSpecialty
}