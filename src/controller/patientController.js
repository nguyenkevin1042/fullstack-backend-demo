import patientService from '../service/PatientService';

let handleSavePatientBookSchedule = async (request, response) => {
    try {
        let message = await patientService.saveNewPatientBookingSchedule(request.body);
        return response.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}

let handleVerifyBooking = async (request, response) => {
    try {
        let message = await patientService.verifyBooking(request.body);
        return response.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    handleSavePatientBookSchedule: handleSavePatientBookSchedule,
    handleVerifyBooking: handleVerifyBooking
}