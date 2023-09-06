module.exports = (sequelize, DataTypes) => {
    
    const Users = sequelize.define("Users", {
        nume: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prenume: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parola: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Users.associate = (models) => {
        Users.hasMany(models.Appointments, { foreignKey: 'email' });
        Users.hasMany(models.SuccessAppointments, { foreignKey: 'email' });
      };

    return Users;
};