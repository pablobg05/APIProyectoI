module.exports = {
  HOST: "ep-broad-bird-a8zxo7uy-pooler.eastus2.azure.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_txiH7Ubka9TD",
  DB: "neondb",
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};