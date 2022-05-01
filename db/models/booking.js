/* const { DataTypes, Model } = require("sequelize");
const sequelize = require("./db");

class Booking extends Model {}

Booking.init({
    bookingId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.ENUM("confirmed", "canceled"),
        allowNull: false,
    },
    startDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    grossPriceInCents: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    netPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
}, { sequelize }); */

'use strict';
module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        bookingId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.ENUM("confirmed", "canceled"),
            allowNull: false,
        },
        startDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        grossPriceInCents: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        netPrice: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        }
    }, {});

    Booking.associate = (models) => {
        Booking.belongsTo(models.Room);
        Booking.belongsTo(models.PromoCode);
        Booking.belongsTo(models.Student);
    };
    return Booking;
};