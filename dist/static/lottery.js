import Contract from 'eth-contract-wrapper'
import { CONTRACT_ABI, CONTRACT_ADDRESS, ADDRESS_0, TICKET_PRICE_IN_WEI, WEB_3_HOST } from './constants'

export default class Lottery extends Contract {
  constructor() {
    super(CONTRACT_ABI, CONTRACT_ADDRESS, WEB_3_HOST)
  }

  get lotteryEnd() {
    if (this.lotteryStart) {
      let startTime = new Date(1000 * this.lotteryStart)
      let endingTime = new Date(startTime.setDate(startTime.getDate() + 7)) // 7 days from starting time;
      return endingTime
    }
  }

  get timeRemaining() {
    if (this.lotteryEnd) {
      var distance = new Date(this.lotteryEnd).getTime() - new Date().getTime()

      var days = Math.floor(distance / (1000 * 60 * 60 * 24))
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = Math.floor((distance % (1000 * 60)) / 1000)

      return { days, hours, minutes, seconds }
    }
  }

  get isLotteryComplete() {
    let { days, hours, minutes, seconds } = this.timeRemaining
    return days < 0 || hours < 0 || minutes < 0 || seconds < 0
  }

  async syncWithDeployedContract() {
    await Promise.all([this.getTickets(), this.getBalance(), this.getStart()])
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

    this.tickets = await Promise.all(ownerRequests)

    return this.tickets
  }

  async getBalance() {
    const balance = await this.balance()
    return balance
  }

  async getStart() {
    this.lotteryStart = await this.get('lotteryStart')
    return this.lotteryStart
  }

  async findOwnerOfTicket(idx) {
    const owner = await this.get('getTicketOwner', idx)
    return owner
  }

  async complete() {
    const from = (await this.accounts())[0]
    await this.post('completeLottery', { from, gas: 200000 })
    await this.post('newLottery', { from, gas: 200000 })
  }
}
