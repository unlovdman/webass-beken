const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pertemuan extends Model {
    static associate(models) {
      Pertemuan.belongsTo(models.Praktikum, { foreignKey: 'id_praktikum' });
      Pertemuan.hasMany(models.Asistensi, { foreignKey: 'id_pertemuan' });
    }
  }

  Pertemuan.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_praktikum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Praktikums',
        key: 'id'
      }
    },
    nama_pertemuan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    urutan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    materi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('belum_mulai', 'berlangsung', 'selesai'),
      defaultValue: 'belum_mulai'
    }
  }, {
    sequelize,
    modelName: 'Pertemuan',
    indexes: [
      {
        unique: true,
        fields: ['id_praktikum', 'urutan']
      }
    ]
  });

  return Pertemuan;
};