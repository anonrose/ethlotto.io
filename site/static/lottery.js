import Contract from './contract'
import { CONTRACT_ABI, CONTRACT_ADDRESS, ADDRESS_0, TICKET_PRICE_IN_WEI } from './constants'

export default class Lottery extends Contract {
  constructor() {
    super(CONTRACT_ABI, CONTRACT_ADDRESS)
  }

  get lotteryEnd() {
    if (this.lotteryStart) {
      let startTime = new Date(1000 * this.lotteryStart)
      let endingTime = new Date(startTime.setDate(startTime.getDate() + 7)) // 7 days from starting time;
      return endingTime
    }
  }

  get prizePool() {
    return this.balance
  }

  async syncWithDeployedContract() {
    const [tickets, balance, lotteryStart] = await Promise.all([this.getTickets(), this.getBalance(), this.getLotteryStart()])
    Object.assign(this, { tickets, balance, lotteryStart })
  }

  async purchaseTicket(idx) {
    const ticketAdress = this.tickets[idx]
    const from = (await this.accounts())[0]
    const err = new Error()

    if (ticketAdress !== ADDRESS_0) err.message = `You can't purchase a ticket that is already sold.`
    if (!from) err.message = `You need to sign in to meta mask in order to purchase a ticket.`

    if (err.message.length) throw err

    return this.post('purchaseTicket', idx, { from, gas: 200000, value: TICKET_PRICE_IN_WEI })
  }

  async getTickets() {
    let ticketCount = await this.get('ticketsAvailable')

    let ownerRequests = [...new Array(parseInt(ticketCount))].map((_, i) => this.findOwnerOfTicket(i))

    let tickets = await Promise.all(ownerRequests)

    return tickets
  }

  async getBalance() {
    const balance = await this.balance()
    return balance
  }

  async getlotteryStart() {
    const start = await this.get('lotteryStart');
    return start
  }

  async findOwnerOfTicket(idx) {
    this._tickets[idx] = this._tickets[idx] || await this.get('getTicketOwner', idx)
    return this._tickets[idx]
  }
}
