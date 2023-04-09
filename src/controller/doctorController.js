import doctorService from '../service/DoctorService';

handleGetTopDoctorsHome = async (request, response) => {
    let limit = request.query.limit;
    if (!limit) limit = 10;
    let doctors = await doctorService.getTopDoctorsHome(limit)
    try {
        return response.status(200).json({
            errCode: -1,
            message: "error from doctorController"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    handleGetTopDoctorsHome: handleGetTopDoctorsHome
}