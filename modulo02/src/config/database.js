module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, //para saber quando o registro foi criado e editado
    underscored: true,
    underscoredAll: true,
  },
};
