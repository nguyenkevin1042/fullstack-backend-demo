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

module.exports = {
    handleGetTopDoctorsHome: handleGetTopDoctorsHome
}