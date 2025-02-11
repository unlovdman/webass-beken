const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Kelompok extends Model {
    static associate(models) {
      // Associations will be defined here
      Kelompok.belongsTo(models.Praktikum, { foreignKey: 'id_praktikum' });
      Kelompok.belongsToMany(models.User, {
        through: 'KelompokPraktikan',
        foreignKey: 'id_kelompok',
        otherKey: 'id_user'
      });
    }
  }

  Kelompok.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_kelompok: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_praktikum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Praktikums',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Kelompok'
  });

  return Kelompok;
}; 