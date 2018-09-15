// // Code generated - DO NOT EDIT.
// // This file is a generated binding and any manual changes will be lost.

// package serve

// import (
// 	"math/big"
// 	"strings"

// 	ethereum "github.com/ethereum/go-ethereum"
// 	"github.com/ethereum/go-ethereum/accounts/abi"
// 	"github.com/ethereum/go-ethereum/accounts/abi/bind"
// 	"github.com/ethereum/go-ethereum/common"
// 	"github.com/ethereum/go-ethereum/core/types"
// 	"github.com/ethereum/go-ethereum/event"
// )

// // LotteryABI is the input ABI used to generate the binding from.
// const LotteryABI = "[{\"constant\":true,\"inputs\":[],\"name\":\"ticketPrice\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"ticketsAvailable\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_ticketsAvailable\",\"type\":\"uint256\"},{\"name\":\"_lotteryTime\",\"type\":\"uint256\"},{\"name\":\"_ticketPrice\",\"type\":\"uint128\"}],\"name\":\"newLottery\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"winningHash\",\"type\":\"uint256\"}],\"name\":\"completeLottery\",\"outputs\":[],\"payable\":true,\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"lotteryTime\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"ticket\",\"type\":\"uint256\"}],\"name\":\"getTicketOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"ticket\",\"type\":\"uint256\"}],\"name\":\"purchaseTicket\",\"outputs\":[],\"payable\":true,\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"lotteryStart\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"admin\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"_lotteryStart\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"_lotteryTime\",\"type\":\"uint256\"}],\"name\":\"LotteryCreated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"winner\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_winnings\",\"type\":\"uint256\"}],\"name\":\"LotteryCompleted\",\"type\":\"event\"}]"

// // Lottery is an auto generated Go binding around an Ethereum contract.
// type Lottery struct {
// 	LotteryCaller     // Read-only binding to the contract
// 	LotteryTransactor // Write-only binding to the contract
// 	LotteryFilterer   // Log filterer for contract events
// }

// // LotteryCaller is an auto generated read-only Go binding around an Ethereum contract.
// type LotteryCaller struct {
// 	contract *bind.BoundContract // Generic contract wrapper for the low level calls
// }

// // LotteryTransactor is an auto generated write-only Go binding around an Ethereum contract.
// type LotteryTransactor struct {
// 	contract *bind.BoundContract // Generic contract wrapper for the low level calls
// }

// // LotteryFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
// type LotteryFilterer struct {
// 	contract *bind.BoundContract // Generic contract wrapper for the low level calls
// }

// // LotterySession is an auto generated Go binding around an Ethereum contract,
// // with pre-set call and transact options.
// type LotterySession struct {
// 	Contract     *Lottery          // Generic contract binding to set the session for
// 	CallOpts     bind.CallOpts     // Call options to use throughout this session
// 	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
// }

// // LotteryCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// // with pre-set call options.
// type LotteryCallerSession struct {
// 	Contract *LotteryCaller // Generic contract caller binding to set the session for
// 	CallOpts bind.CallOpts  // Call options to use throughout this session
// }

// // LotteryTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// // with pre-set transact options.
// type LotteryTransactorSession struct {
// 	Contract     *LotteryTransactor // Generic contract transactor binding to set the session for
// 	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
// }

// // LotteryRaw is an auto generated low-level Go binding around an Ethereum contract.
// type LotteryRaw struct {
// 	Contract *Lottery // Generic contract binding to access the raw methods on
// }

// // LotteryCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
// type LotteryCallerRaw struct {
// 	Contract *LotteryCaller // Generic read-only contract binding to access the raw methods on
// }

// // LotteryTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
// type LotteryTransactorRaw struct {
// 	Contract *LotteryTransactor // Generic write-only contract binding to access the raw methods on
// }

// // NewLottery creates a new instance of Lottery, bound to a specific deployed contract.
// func NewLottery(address common.Address, backend bind.ContractBackend) (*Lottery, error) {
// 	contract, err := bindLottery(address, backend, backend, backend)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &Lottery{LotteryCaller: LotteryCaller{contract: contract}, LotteryTransactor: LotteryTransactor{contract: contract}, LotteryFilterer: LotteryFilterer{contract: contract}}, nil
// }

// // NewLotteryCaller creates a new read-only instance of Lottery, bound to a specific deployed contract.
// func NewLotteryCaller(address common.Address, caller bind.ContractCaller) (*LotteryCaller, error) {
// 	contract, err := bindLottery(address, caller, nil, nil)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &LotteryCaller{contract: contract}, nil
// }

// // NewLotteryTransactor creates a new write-only instance of Lottery, bound to a specific deployed contract.
// func NewLotteryTransactor(address common.Address, transactor bind.ContractTransactor) (*LotteryTransactor, error) {
// 	contract, err := bindLottery(address, nil, transactor, nil)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &LotteryTransactor{contract: contract}, nil
// }

// // NewLotteryFilterer creates a new log filterer instance of Lottery, bound to a specific deployed contract.
// func NewLotteryFilterer(address common.Address, filterer bind.ContractFilterer) (*LotteryFilterer, error) {
// 	contract, err := bindLottery(address, nil, nil, filterer)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &LotteryFilterer{contract: contract}, nil
// }

// // bindLottery binds a generic wrapper to an already deployed contract.
// func bindLottery(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
// 	parsed, err := abi.JSON(strings.NewReader(LotteryABI))
// 	if err != nil {
// 		return nil, err
// 	}
// 	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
// }

// // Call invokes the (constant) contract method with params as input values and
// // sets the output to result. The result type might be a single field for simple
// // returns, a slice of interfaces for anonymous returns and a struct for named
// // returns.
// func (_Lottery *LotteryRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
// 	return _Lottery.Contract.LotteryCaller.contract.Call(opts, result, method, params...)
// }

// // Transfer initiates a plain transaction to move funds to the contract, calling
// // its default method if one is available.
// func (_Lottery *LotteryRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
// 	return _Lottery.Contract.LotteryTransactor.contract.Transfer(opts)
// }

// // Transact invokes the (paid) contract method with params as input values.
// func (_Lottery *LotteryRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
// 	return _Lottery.Contract.LotteryTransactor.contract.Transact(opts, method, params...)
// }

// // Call invokes the (constant) contract method with params as input values and
// // sets the output to result. The result type might be a single field for simple
// // returns, a slice of interfaces for anonymous returns and a struct for named
// // returns.
// func (_Lottery *LotteryCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
// 	return _Lottery.Contract.contract.Call(opts, result, method, params...)
// }

// // Transfer initiates a plain transaction to move funds to the contract, calling
// // its default method if one is available.
// func (_Lottery *LotteryTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
// 	return _Lottery.Contract.contract.Transfer(opts)
// }

// // Transact invokes the (paid) contract method with params as input values.
// func (_Lottery *LotteryTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
// 	return _Lottery.Contract.contract.Transact(opts, method, params...)
// }

// // Admin is a free data retrieval call binding the contract method 0xf851a440.
// //
// // Solidity: function admin() constant returns(address)
// func (_Lottery *LotteryCaller) Admin(opts *bind.CallOpts) (common.Address, error) {
// 	var (
// 		ret0 = new(common.Address)
// 	)
// 	out := ret0
// 	err := _Lottery.contract.Call(opts, out, "admin")
// 	return *ret0, err
// }

// // Admin is a free data retrieval call binding the contract method 0xf851a440.
// //
// // Solidity: function admin() constant returns(address)
// func (_Lottery *LotterySession) Admin() (common.Address, error) {
// 	return _Lottery.Contract.Admin(&_Lottery.CallOpts)
// }

// // Admin is a free data retrieval call binding the contract method 0xf851a440.
// //
// // Solidity: function admin() constant returns(address)
// func (_Lottery *LotteryCallerSession) Admin() (common.Address, error) {
// 	return _Lottery.Contract.Admin(&_Lottery.CallOpts)
// }

// // LotteryStart is a free data retrieval call binding the contract method 0xcd8cc844.
// //
// // Solidity: function lotteryStart() constant returns(uint256)
// func (_Lottery *LotteryCaller) LotteryStart(opts *bind.CallOpts) (*big.Int, error) {
// 	var (
// 		ret0 = new(*big.Int)
// 	)
// 	out := ret0
// 	err := _Lottery.contract.Call(opts, out, "lotteryStart")
// 	return *ret0, err
// }

// // LotteryStart is a free data retrieval call binding the contract method 0xcd8cc844.
// //
// // Solidity: function lotteryStart() constant returns(uint256)
// func (_Lottery *LotterySession) LotteryStart() (*big.Int, error) {
// 	return _Lottery.Contract.LotteryStart(&_Lottery.CallOpts)
// }

// // LotteryStart is a free data retrieval call binding the contract method 0xcd8cc844.
// //
// // Solidity: function lotteryStart() constant returns(uint256)
// func (_Lottery *LotteryCallerSession) LotteryStart() (*big.Int, error) {
// 	return _Lottery.Contract.LotteryStart(&_Lottery.CallOpts)
// }

// // LotteryTime is a free data retrieval call binding the contract method 0x5f5a7ab9.
// //
// // Solidity: function lotteryTime() constant returns(uint256)
// func (_Lottery *LotteryCaller) LotteryTime(opts *bind.CallOpts) (*big.Int, error) {
// 	var (
// 		ret0 = new(*big.Int)
// 	)
// 	out := ret0
// 	err := _Lottery.contract.Call(opts, out, "lotteryTime")
// 	return *ret0, err
// }

// // LotteryTime is a free data retrieval call binding the contract method 0x5f5a7ab9.
// //
// // Solidity: function lotteryTime() constant returns(uint256)
// func (_Lottery *LotterySession) LotteryTime() (*big.Int, error) {
// 	return _Lottery.Contract.LotteryTime(&_Lottery.CallOpts)
// }

// // LotteryTime is a free data retrieval call binding the contract method 0x5f5a7ab9.
// //
// // Solidity: function lotteryTime() constant returns(uint256)
// func (_Lottery *LotteryCallerSession) LotteryTime() (*big.Int, error) {
// 	return _Lottery.Contract.LotteryTime(&_Lottery.CallOpts)
// }

// // Owner is a free data retrieval call binding the contract method 0xa123c33e.
// //
// // Solidity: function owner( uint256) constant returns(address)
// func (_Lottery *LotteryCaller) Owner(opts *bind.CallOpts, arg0 *big.Int) (common.Address, error) {
// 	var (
// 		ret0 = new(common.Address)
// 	)
// 	out := ret0
// 	err := _Lottery.contract.Call(opts, out, "owner", arg0)
// 	return *ret0, err
// }

// // Owner is a free data retrieval call binding the contract method 0xa123c33e.
// //
// // Solidity: function owner( uint256) constant returns(address)
// func (_Lottery *LotterySession) Owner(arg0 *big.Int) (common.Address, error) {
// 	return _Lottery.Contract.Owner(&_Lottery.CallOpts, arg0)
// }

// // Owner is a free data retrieval call binding the contract method 0xa123c33e.
// //
// // Solidity: function owner( uint256) constant returns(address)
// func (_Lottery *LotteryCallerSession) Owner(arg0 *big.Int) (common.Address, error) {
// 	return _Lottery.Contract.Owner(&_Lottery.CallOpts, arg0)
// }

// // TicketPrice is a free data retrieval call binding the contract method 0x1209b1f6.
// //
// // Solidity: function ticketPrice() constant returns(uint256)
// func (_Lottery *LotteryCaller) TicketPrice(opts *bind.CallOpts) (*big.Int, error) {
// 	var (
// 		ret0 = new(*big.Int)
// 	)
// 	out := ret0
// 	err := _Lottery.contract.Call(opts, out, "ticketPrice")
// 	return *ret0, err
// }

// // TicketPrice is a free data retrieval call binding the contract method 0x1209b1f6.
// //
// // Solidity: function ticketPrice() constant returns(uint256)
// func (_Lottery *LotterySession) TicketPrice() (*big.Int, error) {
// 	return _Lottery.Contract.TicketPrice(&_Lottery.CallOpts)
// }

// // TicketPrice is a free data retrieval call binding the contract method 0x1209b1f6.
// //
// // Solidity: function ticketPrice() constant returns(uint256)
// func (_Lottery *LotteryCallerSession) TicketPrice() (*big.Int, error) {
// 	return _Lottery.Contract.TicketPrice(&_Lottery.CallOpts)
// }

// // TicketsAvailable is a free data retrieval call binding the contract method 0x18253234.
// //
// // Solidity: function ticketsAvailable() constant returns(uint256)
// func (_Lottery *LotteryCaller) TicketsAvailable(opts *bind.CallOpts) (*big.Int, error) {
// 	var (
// 		ret0 = new(*big.Int)
// 	)
// 	out := ret0
// 	err := _Lottery.contract.Call(opts, out, "ticketsAvailable")
// 	return *ret0, err
// }

// // TicketsAvailable is a free data retrieval call binding the contract method 0x18253234.
// //
// // Solidity: function ticketsAvailable() constant returns(uint256)
// func (_Lottery *LotterySession) TicketsAvailable() (*big.Int, error) {
// 	return _Lottery.Contract.TicketsAvailable(&_Lottery.CallOpts)
// }

// // TicketsAvailable is a free data retrieval call binding the contract method 0x18253234.
// //
// // Solidity: function ticketsAvailable() constant returns(uint256)
// func (_Lottery *LotteryCallerSession) TicketsAvailable() (*big.Int, error) {
// 	return _Lottery.Contract.TicketsAvailable(&_Lottery.CallOpts)
// }

// // CompleteLottery is a paid mutator transaction binding the contract method 0x59ed7d76.
// //
// // Solidity: function completeLottery(winningHash uint256) returns()
// func (_Lottery *LotteryTransactor) CompleteLottery(opts *bind.TransactOpts, winningHash *big.Int) (*types.Transaction, error) {
// 	return _Lottery.contract.Transact(opts, "completeLottery", winningHash)
// }

// // CompleteLottery is a paid mutator transaction binding the contract method 0x59ed7d76.
// //
// // Solidity: function completeLottery(winningHash uint256) returns()
// func (_Lottery *LotterySession) CompleteLottery(winningHash *big.Int) (*types.Transaction, error) {
// 	return _Lottery.Contract.CompleteLottery(&_Lottery.TransactOpts, winningHash)
// }

// // CompleteLottery is a paid mutator transaction binding the contract method 0x59ed7d76.
// //
// // Solidity: function completeLottery(winningHash uint256) returns()
// func (_Lottery *LotteryTransactorSession) CompleteLottery(winningHash *big.Int) (*types.Transaction, error) {
// 	return _Lottery.Contract.CompleteLottery(&_Lottery.TransactOpts, winningHash)
// }

// // GetTicketOwner is a paid mutator transaction binding the contract method 0xad093409.
// //
// // Solidity: function getTicketOwner(ticket uint256) returns(address)
// func (_Lottery *LotteryTransactor) GetTicketOwner(opts *bind.TransactOpts, ticket *big.Int) (*types.Transaction, error) {
// 	return _Lottery.contract.Transact(opts, "getTicketOwner", ticket)
// }

// // GetTicketOwner is a paid mutator transaction binding the contract method 0xad093409.
// //
// // Solidity: function getTicketOwner(ticket uint256) returns(address)
// func (_Lottery *LotterySession) GetTicketOwner(ticket *big.Int) (*types.Transaction, error) {
// 	return _Lottery.Contract.GetTicketOwner(&_Lottery.TransactOpts, ticket)
// }

// // GetTicketOwner is a paid mutator transaction binding the contract method 0xad093409.
// //
// // Solidity: function getTicketOwner(ticket uint256) returns(address)
// func (_Lottery *LotteryTransactorSession) GetTicketOwner(ticket *big.Int) (*types.Transaction, error) {
// 	return _Lottery.Contract.GetTicketOwner(&_Lottery.TransactOpts, ticket)
// }

// // NewLottery is a paid mutator transaction binding the contract method 0x26c6a9dd.
// //
// // Solidity: function newLottery(_ticketsAvailable uint256, _lotteryTime uint256, _ticketPrice uint128) returns()
// func (_Lottery *LotteryTransactor) NewLottery(opts *bind.TransactOpts, _ticketsAvailable *big.Int, _lotteryTime *big.Int, _ticketPrice *big.Int) (*types.Transaction, error) {
// 	return _Lottery.contract.Transact(opts, "newLottery", _ticketsAvailable, _lotteryTime, _ticketPrice)
// }

// // NewLottery is a paid mutator transaction binding the contract method 0x26c6a9dd.
// //
// // Solidity: function newLottery(_ticketsAvailable uint256, _lotteryTime uint256, _ticketPrice uint128) returns()
// func (_Lottery *LotterySession) NewLottery(_ticketsAvailable *big.Int, _lotteryTime *big.Int, _ticketPrice *big.Int) (*types.Transaction, error) {
// 	return _Lottery.Contract.NewLottery(&_Lottery.TransactOpts, _ticketsAvailable, _lotteryTime, _ticketPrice)
// }

// // NewLottery is a paid mutator transaction binding the contract method 0x26c6a9dd.
// //
// // Solidity: function newLottery(_ticketsAvailable uint256, _lotteryTime uint256, _ticketPrice uint128) returns()
// func (_Lottery *LotteryTransactorSession) NewLottery(_ticketsAvailable *big.Int, _lotteryTime *big.Int, _ticketPrice *big.Int) (*types.Transaction, error) {
// 	return _Lottery.Contract.NewLottery(&_Lottery.TransactOpts, _ticketsAvailable, _lotteryTime, _ticketPrice)
// }

// // PurchaseTicket is a paid mutator transaction binding the contract method 0xb948348c.
// //
// // Solidity: function purchaseTicket(ticket uint256) returns()
// func (_Lottery *LotteryTransactor) PurchaseTicket(opts *bind.TransactOpts, ticket *big.Int) (*types.Transaction, error) {
// 	return _Lottery.contract.Transact(opts, "purchaseTicket", ticket)
// }

// // PurchaseTicket is a paid mutator transaction binding the contract method 0xb948348c.
// //
// // Solidity: function purchaseTicket(ticket uint256) returns()
// func (_Lottery *LotterySession) PurchaseTicket(ticket *big.Int) (*types.Transaction, error) {
// 	return _Lottery.Contract.PurchaseTicket(&_Lottery.TransactOpts, ticket)
// }

// // PurchaseTicket is a paid mutator transaction binding the contract method 0xb948348c.
// //
// // Solidity: function purchaseTicket(ticket uint256) returns()
// func (_Lottery *LotteryTransactorSession) PurchaseTicket(ticket *big.Int) (*types.Transaction, error) {
// 	return _Lottery.Contract.PurchaseTicket(&_Lottery.TransactOpts, ticket)
// }

// // LotteryLotteryCompletedIterator is returned from FilterLotteryCompleted and is used to iterate over the raw logs and unpacked data for LotteryCompleted events raised by the Lottery contract.
// type LotteryLotteryCompletedIterator struct {
// 	Event *LotteryLotteryCompleted // Event containing the contract specifics and raw log

// 	contract *bind.BoundContract // Generic contract to use for unpacking event data
// 	event    string              // Event name to use for unpacking event data

// 	logs chan types.Log        // Log channel receiving the found contract events
// 	sub  ethereum.Subscription // Subscription for errors, completion and termination
// 	done bool                  // Whether the subscription completed delivering logs
// 	fail error                 // Occurred error to stop iteration
// }

// // Next advances the iterator to the subsequent event, returning whether there
// // are any more events found. In case of a retrieval or parsing error, false is
// // returned and Error() can be queried for the exact failure.
// func (it *LotteryLotteryCompletedIterator) Next() bool {
// 	// If the iterator failed, stop iterating
// 	if it.fail != nil {
// 		return false
// 	}
// 	// If the iterator completed, deliver directly whatever's available
// 	if it.done {
// 		select {
// 		case log := <-it.logs:
// 			it.Event = new(LotteryLotteryCompleted)
// 			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
// 				it.fail = err
// 				return false
// 			}
// 			it.Event.Raw = log
// 			return true

// 		default:
// 			return false
// 		}
// 	}
// 	// Iterator still in progress, wait for either a data or an error event
// 	select {
// 	case log := <-it.logs:
// 		it.Event = new(LotteryLotteryCompleted)
// 		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
// 			it.fail = err
// 			return false
// 		}
// 		it.Event.Raw = log
// 		return true

// 	case err := <-it.sub.Err():
// 		it.done = true
// 		it.fail = err
// 		return it.Next()
// 	}
// }

// // Error returns any retrieval or parsing error occurred during filtering.
// func (it *LotteryLotteryCompletedIterator) Error() error {
// 	return it.fail
// }

// // Close terminates the iteration process, releasing any pending underlying
// // resources.
// func (it *LotteryLotteryCompletedIterator) Close() error {
// 	it.sub.Unsubscribe()
// 	return nil
// }

// // LotteryLotteryCompleted represents a LotteryCompleted event raised by the Lottery contract.
// type LotteryLotteryCompleted struct {
// 	Winner   common.Address
// 	Winnings *big.Int
// 	Raw      types.Log // Blockchain specific contextual infos
// }

// // FilterLotteryCompleted is a free log retrieval operation binding the contract event 0x0762a264a8b5522afe15b1c367edc923b878359af55b1a742d3bdde1dfdf8727.
// //
// // Solidity: e LotteryCompleted(winner address, _winnings uint256)
// func (_Lottery *LotteryFilterer) FilterLotteryCompleted(opts *bind.FilterOpts) (*LotteryLotteryCompletedIterator, error) {

// 	logs, sub, err := _Lottery.contract.FilterLogs(opts, "LotteryCompleted")
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &LotteryLotteryCompletedIterator{contract: _Lottery.contract, event: "LotteryCompleted", logs: logs, sub: sub}, nil
// }

// // WatchLotteryCompleted is a free log subscription operation binding the contract event 0x0762a264a8b5522afe15b1c367edc923b878359af55b1a742d3bdde1dfdf8727.
// //
// // Solidity: e LotteryCompleted(winner address, _winnings uint256)
// func (_Lottery *LotteryFilterer) WatchLotteryCompleted(opts *bind.WatchOpts, sink chan<- *LotteryLotteryCompleted) (event.Subscription, error) {

// 	logs, sub, err := _Lottery.contract.WatchLogs(opts, "LotteryCompleted")
// 	if err != nil {
// 		return nil, err
// 	}
// 	return event.NewSubscription(func(quit <-chan struct{}) error {
// 		defer sub.Unsubscribe()
// 		for {
// 			select {
// 			case log := <-logs:
// 				// New log arrived, parse the event and forward to the user
// 				event := new(LotteryLotteryCompleted)
// 				if err := _Lottery.contract.UnpackLog(event, "LotteryCompleted", log); err != nil {
// 					return err
// 				}
// 				event.Raw = log

// 				select {
// 				case sink <- event:
// 				case err := <-sub.Err():
// 					return err
// 				case <-quit:
// 					return nil
// 				}
// 			case err := <-sub.Err():
// 				return err
// 			case <-quit:
// 				return nil
// 			}
// 		}
// 	}), nil
// }

// // LotteryLotteryCreatedIterator is returned from FilterLotteryCreated and is used to iterate over the raw logs and unpacked data for LotteryCreated events raised by the Lottery contract.
// type LotteryLotteryCreatedIterator struct {
// 	Event *LotteryLotteryCreated // Event containing the contract specifics and raw log

// 	contract *bind.BoundContract // Generic contract to use for unpacking event data
// 	event    string              // Event name to use for unpacking event data

// 	logs chan types.Log        // Log channel receiving the found contract events
// 	sub  ethereum.Subscription // Subscription for errors, completion and termination
// 	done bool                  // Whether the subscription completed delivering logs
// 	fail error                 // Occurred error to stop iteration
// }

// // Next advances the iterator to the subsequent event, returning whether there
// // are any more events found. In case of a retrieval or parsing error, false is
// // returned and Error() can be queried for the exact failure.
// func (it *LotteryLotteryCreatedIterator) Next() bool {
// 	// If the iterator failed, stop iterating
// 	if it.fail != nil {
// 		return false
// 	}
// 	// If the iterator completed, deliver directly whatever's available
// 	if it.done {
// 		select {
// 		case log := <-it.logs:
// 			it.Event = new(LotteryLotteryCreated)
// 			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
// 				it.fail = err
// 				return false
// 			}
// 			it.Event.Raw = log
// 			return true

// 		default:
// 			return false
// 		}
// 	}
// 	// Iterator still in progress, wait for either a data or an error event
// 	select {
// 	case log := <-it.logs:
// 		it.Event = new(LotteryLotteryCreated)
// 		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
// 			it.fail = err
// 			return false
// 		}
// 		it.Event.Raw = log
// 		return true

// 	case err := <-it.sub.Err():
// 		it.done = true
// 		it.fail = err
// 		return it.Next()
// 	}
// }

// // Error returns any retrieval or parsing error occurred during filtering.
// func (it *LotteryLotteryCreatedIterator) Error() error {
// 	return it.fail
// }

// // Close terminates the iteration process, releasing any pending underlying
// // resources.
// func (it *LotteryLotteryCreatedIterator) Close() error {
// 	it.sub.Unsubscribe()
// 	return nil
// }

// // LotteryLotteryCreated represents a LotteryCreated event raised by the Lottery contract.
// type LotteryLotteryCreated struct {
// 	LotteryStart *big.Int
// 	LotteryTime  *big.Int
// 	Raw          types.Log // Blockchain specific contextual infos
// }

// // FilterLotteryCreated is a free log retrieval operation binding the contract event 0x47fd7f728dd62fa82686e732a84ce6c7b0ea5222a999c539c4594d7d57966e70.
// //
// // Solidity: e LotteryCreated(_lotteryStart uint256, _lotteryTime uint256)
// func (_Lottery *LotteryFilterer) FilterLotteryCreated(opts *bind.FilterOpts) (*LotteryLotteryCreatedIterator, error) {

// 	logs, sub, err := _Lottery.contract.FilterLogs(opts, "LotteryCreated")
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &LotteryLotteryCreatedIterator{contract: _Lottery.contract, event: "LotteryCreated", logs: logs, sub: sub}, nil
// }

// // WatchLotteryCreated is a free log subscription operation binding the contract event 0x47fd7f728dd62fa82686e732a84ce6c7b0ea5222a999c539c4594d7d57966e70.
// //
// // Solidity: e LotteryCreated(_lotteryStart uint256, _lotteryTime uint256)
// func (_Lottery *LotteryFilterer) WatchLotteryCreated(opts *bind.WatchOpts, sink chan<- *LotteryLotteryCreated) (event.Subscription, error) {

// 	logs, sub, err := _Lottery.contract.WatchLogs(opts, "LotteryCreated")
// 	if err != nil {
// 		return nil, err
// 	}
// 	return event.NewSubscription(func(quit <-chan struct{}) error {
// 		defer sub.Unsubscribe()
// 		for {
// 			select {
// 			case log := <-logs:
// 				// New log arrived, parse the event and forward to the user
// 				event := new(LotteryLotteryCreated)
// 				if err := _Lottery.contract.UnpackLog(event, "LotteryCreated", log); err != nil {
// 					return err
// 				}
// 				event.Raw = log

// 				select {
// 				case sink <- event:
// 				case err := <-sub.Err():
// 					return err
// 				case <-quit:
// 					return nil
// 				}
// 			case err := <-sub.Err():
// 				return err
// 			case <-quit:
// 				return nil
// 			}
// 		}
// 	}), nil
// }
