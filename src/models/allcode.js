'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {

        static associate(models) {
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' });
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' });
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'priceId', as: 'priceData' });
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'provinceId', as: 'provinceData' });
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'paymentId', as: 'paymentData' });

            Allcode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'timeTypeDataBooking' });
        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEN: DataTypes.STRING,
        valueVI: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};