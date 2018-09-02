import Web3 from 'web3'
import { INFURA_HOST } from './constants'

export default class Network {
  constructor() {
    if (typeof web3 !== 'undefined') {
      this.web3 = new Web3(web3.currentProvider)
    } else {
      this.web3 = new Web3(INFURA_HOST)
    }
    return this.web3
  }
}
