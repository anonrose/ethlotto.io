package main

import (
	"io/ioutil"
	"log"
	"net/http"

	"google.golang.org/appengine"
	"google.golang.org/appengine/urlfetch"
)

const COINBASE_API = "https://api.coinbase.com/v2/prices/ETH-USD/buy"

func init() {

	http.HandleFunc("/", serveFiles)


}

func main() {
	http.HandleFunc("/", serveFiles)
	http.HandleFunc("/api/price.json", ETHBalanceProxy)
}

func serveFiles(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	log.Println(path)
	if path == "/" {
		http.ServeFile(w, r, "./dist/index.html")
	} else {
		http.ServeFile(w, r, "./dist/"+path)
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
