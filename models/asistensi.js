const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asistensi extends Model {
    static associate(models) {
      Asistensi.belongsTo(models.User, { foreignKey: 'id_user' });
      Asistensi.belongsTo(models.Praktikum, { foreignKey: 'id_praktikum' });
      Asistensi.belongsTo(models.Pertemuan, { foreignKey: 'id_pertemuan' });
    }
  }

  Asistensi.init({
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
    id_pertemuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Pertemuans',
        key: 'id'
      }
    },
    kehadiran: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    nilai_asistensi: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },
    catatan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    waktu_mulai: {
      type: DataTypes.DATE,
      allowNull: true
    },
    waktu_selesai: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Asistensi',
    indexes: [
      {
        unique: true,
        fields: ['id_user', 'id_pertemuan']
      }
    ]
  });

  return Asistensi;
}; 