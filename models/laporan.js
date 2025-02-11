const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
    static associate(models) {
      // Associations will be defined here
      Laporan.belongsTo(models.User, { foreignKey: 'id_user' });
      Laporan.belongsTo(models.Praktikum, { foreignKey: 'id_praktikum' });
    }
  }

  Laporan.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    id_praktikum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Praktikums',
        key: 'id'
      }
    },
    file_laporan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nilai_laporan: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    }
  }, {
    sequelize,
    modelName: 'Laporan'
  });

  return Laporan;
}; 