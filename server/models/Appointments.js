module.exports = (sequelize, DataTypes) => {

    const Appointments = sequelize.define("Appointments", {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Posts",
                key: "id",
            },
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        judet: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipLocuinta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_4: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_5: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_6: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_7: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_8: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_9: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_10: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_11: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_12: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_13: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_14: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_15: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_16: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_17: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        intrebare_18: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });

    Appointments.associate = (models) => {
        Appointments.belongsTo(models.Posts, { foreignKey: 'postId' });
        Appointments.belongsTo(models.Users, { foreignKey: 'email' });
      };

    return Appointments;
};