const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Nilai extends Model {
    static associate(models) {
      // Associations will be defined here
      Nilai.belongsTo(models.User, { foreignKey: 'id_user' });
      Nilai.belongsTo(models.Praktikum, { foreignKey: 'id_praktikum' });
    }
  }

  Nilai.init({
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
    nilai_praktikum: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },
    nilai_asistensi: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },
    nilai_laporan: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },
    nilai_akhir: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    }
  }, {
    sequelize,
    modelName: 'Nilai',
    hooks: {
      beforeSave: async (nilai) => {
        // Calculate nilai_akhir based on weighted components
        if (nilai.nilai_praktikum && nilai.nilai_asistensi && nilai.nilai_laporan) {
          nilai.nilai_akhir = (
            (nilai.nilai_praktikum * 0.4) +
            (nilai.nilai_asistensi * 0.3) +
            (nilai.nilai_laporan * 0.3)
          );
        }
      }
    }
  });

  return Nilai;
};