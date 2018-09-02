import Web3 from 'web3'
import { INFURA_HOST } from './constants'

export default class Network {
  constructor() {
    var web3
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider)
    } else {
      web3 = new Web3(INFURA_HOST)
    }
    return web3
  }
}
