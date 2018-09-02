import Network from './network'

export default class Contract {
  constructor(contractABI, contractAddress) {
    Object.assign(this, {
      contractABI, contractAddress
    })
    this._network = new Network()
    this._contract = new this._network.eth.Contract(contractABI, contractAddress)
    this._api = this._contract.methods
  }

  get(method, ...args) {
    return this._api[method](...args).call()
  }

  post(method, ...args) {
    let transaction = args.pop() || {}
    return this._api[method](...args).send(transaction)
  }

  balance() {
    return this._network.eth.getBalance(this.contractAddress)
  }

  accounts() {
    return this._network.eth.getAccounts()
  }
}
