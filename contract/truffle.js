module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      from: '0x80A19EA2379c98a1310FCE1Cb5EdC14720b60391' // possibly have to change this depending on your testrpc
    }
  }
};
