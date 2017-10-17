package serve

import (
	"net/http"
	"log"
	"google.golang.org/appengine"
  "google.golang.org/appengine/urlfetch"
	"io/ioutil"
)

const COINBASE_API = "https://api.coinbase.com/v2/prices/ETH-USD/buy"

func init() {

	http.HandleFunc("/", serveFiles)

	http.HandleFunc("/api/price.json", ETHBalanceProxy)
}

func serveFiles(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	log.Println(path)
	if path == "/" {
		http.ServeFile(w, r, "./frontend/index.html")
	} else {
		http.ServeFile(w, r, "./frontend/"+path)
	}
}

func ETHBalanceProxy(w http.ResponseWriter, r *http.Request) {

	req, _ := http.NewRequest("GET", COINBASE_API, nil)

	req.Header.Add("CB-VERSION", "2016-03-03")

	ctx := appengine.NewContext(r)

	client := urlfetch.Client(ctx)

	resp, _ := client.Do(req)

	body, _ := ioutil.ReadAll(resp.Body)

	w.Write(body)
}
