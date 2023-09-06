module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define("Posts", {
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        nume: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        specie: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rasa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        varsta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriere: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        boli: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        disponibil: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Appointments, { foreignKey: 'postId' });
        Posts.hasMany(models.SuccessAppointments, { foreignKey: 'postId' });
      };

    return Posts;
};