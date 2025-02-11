const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Praktikum extends Model {
    static associate(models) {
      // Associations will be defined here
      Praktikum.hasMany(models.Kelompok, { foreignKey: 'id_praktikum' });
      Praktikum.hasMany(models.Asistensi, { foreignKey: 'id_praktikum' });
      Praktikum.hasMany(models.Laporan, { foreignKey: 'id_praktikum' });
      Praktikum.hasMany(models.Nilai, { foreignKey: 'id_praktikum' });
      Praktikum.hasMany(models.Pertemuan, { foreignKey: 'id_praktikum' });
    }
  }

  Praktikum.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama_praktikum: {
      type: DataTypes.STRING,
      allowNull: false
    },
    periode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    tanggal_mulai: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tanggal_selesai: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link_form: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    status: {
      type: DataTypes.ENUM('aktif', 'selesai'),
      defaultValue: 'aktif'
    }
  }, {
    sequelize,
    modelName: 'Praktikum'
  });

  return Praktikum;
}; 