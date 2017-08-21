module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      from : '0x89249d29a3008fa7b8788b7dbace3267770e37d0' // Match any network id
    }
  }
};
