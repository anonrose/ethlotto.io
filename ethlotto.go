package serve

import (
	"encoding/json"
	"net/http"
	"log"
	"google.golang.org/appengine"
  "google.golang.org/appengine/urlfetch"
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

func ETHBalance(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
  client := urlfetch.Client(ctx)
  resp, err := client.Get(coinMarketCapAPI)

  if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
  }

  defer resp.Body.Close()
	json.NewDecoder(resp.Body).Decode(&eth)

	marshaledEth, err := json.Marshal(eth);

	w.Write([]byte(marshaledEth))
}

func init() {
	http.HandleFunc("/", serveFiles)

	http.HandleFunc("/api/price.json", ETHBalance)
}
