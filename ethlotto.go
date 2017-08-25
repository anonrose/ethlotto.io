package serve

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"log"
)

const coinMarketCapAPI = "https://coinmarketcap-nexuist.rhcloud.com/api/eth"


type Eth struct {
	Symbol     string
	Position   string
	Name       string
	MarketCap  map[string]float32 `json:"market_cap"`
	Price      map[string]float32
	Supply     string
	Change     string
	Timestamp  string
}

var eth Eth

func serveFiles(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	log.Println(path)
	if path == "/" {
		http.ServeFile(w, r, "./frontend/index.html")
	} else {
		http.ServeFile(w, r, "./frontend/"+path)
	}
}

func fetchBalnce() {
	resp, err := http.Get(coinMarketCapAPI)

	if err != nil {
		return
	}

	defer resp.Body.Close()

	json.NewDecoder(resp.Body).Decode(&eth)
}

func ETHBalanceThread() {

	go func() {
		t := time.NewTicker(60 * time.Second)
		for {
			select {
			case <-t.C:
				fetchBalnce()
			}
		}
	}()
	fetchBalnce()

}

func servePrice(w http.ResponseWriter, r *http.Request) {
	marshaledEth, err := json.Marshal(eth)
	if err != nil {
		fmt.Println("error:", err)
	}

	w.Write([]byte(marshaledEth))
}

func init() {
	ETHBalanceThread()

	http.HandleFunc("/", serveFiles)

	http.HandleFunc("/api/price.json", servePrice)
}
