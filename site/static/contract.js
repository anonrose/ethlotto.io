import ETHNetwork from './eth-network'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants'

export default class Contract {
  constructor() {
    this.network = new ETHNetwork()
    this._contract = new this.network.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    this._contractAPI = this._contract.methods
  }

  purchaseTicket(ticket) {
    return new Promise((resolve, reject) => {
      if (!this._tickets[ticket]) {
        reject(new Error('ticket not available'))
      }
    })
  }

  get tickets() {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this._tickets) {
          let ticketCount = await this._contractAPI.ticketsAvailable().call()

          let ownerRequests = [...new Array(parseInt(ticketCount))].map((_, i) => this._ticketOwner(i))
          this._tickets = await Promise.all(ownerRequests)
        }
      } catch (error) {
        reject(error)
      } finally {
        resolve(this._tickets)
      }
    })
  }

  _ticketOwner(ticket) {
    return this._contractAPI.getTicketOwner(ticket).call()
  }
}
