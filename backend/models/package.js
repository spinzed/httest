module.exports = (sequelize, DataTypes) => {
    const Package = sequelize.define("Package", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        trackingCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        initiatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /(in warehouse|in transit|delivered)/
            }
        },
        buyerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        carrierName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deliveryAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        initialAutoIncrement: 1000
    });
    return Package;
};