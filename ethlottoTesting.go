package main

import (
	"fmt"
	"log"
  "context"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
  "github.com/ethereum/go-ethereum/accounts/abi/bind"
  "ethlotto/lottery"
)

func main() {
	// Create an IPC based RPC connection to a remote node
	conn, err := ethclient.Dial("https://mainnet.infura.io/unUocZxzv4r4nTIdNwBP")

	if err != nil {
		log.Fatalf("Failed to connect to the Ethereum client: %v", err)
	}

	// Instantiate the contract and display its name
	lottery, err := lottery.NewLottery(common.HexToAddress("0x042C0Bd56B3c377363aB1603672e7f07445F184d"), conn)

	if err != nil {
		log.Fatalf("", err)
	}

  ticketsAvailable, err := lottery.TicketsAvailable(nil)

  if err != nil {
		log.Fatalf("", err)
	}

	fmt.Println("tickets available:", ticketsAvailable)
}
