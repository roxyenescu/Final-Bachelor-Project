module.exports = (sequelize, DataTypes) => {

    const Donations = sequelize.define("Donations", {
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        obiect: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cantitate: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    });


    return Donations;
};