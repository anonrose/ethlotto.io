import ETHNetwork from './eth-network'
import { CONTRACT_ABI, CONTRACT_ADDRESS, ADDRESS_0, TICKET_PRICE_IN_WEI } from './constants'

const NETWORK = new ETHNetwork()
const LOTTO_CONTRACT = new NETWORK.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
const CONTRACT_API = LOTTO_CONTRACT.methods

const TICKETS = []

function _ticketOwner(ticket) {
  return CONTRACT_API.getTicketOwner(ticket).call()
}

export default class Contract {
  static purchaseTicket(ticketIdx) {
    return new Promise(async (resolve, reject) => {
      const ticketAdress = TICKETS[ticketIdx]
      const from = (await NETWORK.eth.getAccounts())[0]
      const err = new Error()

      if (ticketAdress !== ADDRESS_0) err.message = `You can't purchase a ticket that is already sold.`
      if (!from) err.message = `You need to sign in to meta mask in order to purchase a ticket.`

      if (err.message.length) reject(err)

      CONTRACT_API.purchaseTicket(ticketIdx).send({ from, gas: 200000, value: TICKET_PRICE_IN_WEI })
        .on('confirmation', (_, recipt) => {
          resolve({ message: `Purchasing Ticket: ${ticketIdx}\n\tTransaction: ${recipt.transactionHash}` })
        })
    })
  }

  static getTickets() {
    return new Promise(async (resolve, reject) => {
      try {
        if (!TICKETS.length) {
          let ticketCount = await CONTRACT_API.ticketsAvailable().call()

          let ownerRequests = [...new Array(parseInt(ticketCount))].map((_, i) => _ticketOwner(i))

          let tickets = await Promise.all(ownerRequests)
          TICKETS.push(...tickets)
        }
      } catch (error) {
        reject(error)
      } finally {
        resolve(TICKETS)
      }
    })
  }

  static lotteryEnd() {
    return new Promise(async resolve => {
      let startTime = new Date(1000 * (await CONTRACT_API.lotteryStart().call()))
      let endingTime = new Date(startTime.setDate(startTime.getDate() + 7)) // 7 days from starting time;
      resolve(endingTime)
    })
  }

  static balance() {
    return NETWORK.eth.getBalance(CONTRACT_ADDRESS)
  }
}
