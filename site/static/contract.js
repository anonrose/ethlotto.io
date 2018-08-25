import ETHNetwork from './eth-network'
import { CONTRACT_ABI, CONTRACT_ADDRESS, ADDRESS_0 } from './constants'

const NETWORK = new ETHNetwork()
const LOTTO_CONTRACT = new NETWORK.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
const CONTRACT_API = this._contractAPI = LOTTO_CONTRACT.methods

const TICKETS = []

function _ticketOwner(ticket) {
  return CONTRACT_API.getTicketOwner(ticket).call()
}

export default class Contract {
  static purchaseTicket(ticketIdx) {
    return new Promise(async (resolve, reject) => {
      const ticketAdress = TICKETS[ticketIdx]
      const from = (await NETWORK.eth.getAccounts())[0]

      var errMsg
      if (ticketAdress !== ADDRESS_0) errMsg = `you can't purchase a ticket that is already sold.`
      if (!from) errMsg = `you need to sign in to meta mask in order to purchase a ticket.`

      if (errMsg) {
        reject(new Error(`Sorry, ${errMsg}`))
      } else {
        CONTRACT_API.purchaseTicket(ticketIdx).send({ from, gas: 200000 })
          .on('transactionHash', transactionHash => {
            console.log(transactionHash)
          })
          .on('confirmation', (confirmationNumber, recipt) => {
            console.log(confirmationNumber, recipt)
            resolve()
          }).on('receipt', (recipt) => {
            console.log('recipt', recipt)
          })
      }
    })
  }

  static getTickets() {
    return new Promise(async (resolve, reject) => {
      try {
        if (!TICKETS.length) {
          let ticketCount = await CONTRACT_API.ticketsAvailable().call()

          let ownerRequests = [...new Array(parseInt(ticketCount))].map((_, i) => _ticketOwner(i))

          let owners = await Promise.all(ownerRequests)

          owners.forEach(owner => TICKETS.push(owner))
        }
      } catch (error) {
        reject(error)
      } finally {
        resolve(TICKETS)
      }
    })
  }
}
