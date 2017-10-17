package main
import (
    "fmt"
    "net/http"
    "io/ioutil"
    "encoding/json"
)

type ETH struct {
	Base     string
	Currency string
	Amount   string
}

type cryptoPayload struct {
	Data ETH
}

func main() {

    client := &http.Client{}

    req, _ := http.NewRequest("GET", "https://api.coinbase.com/v2/prices/ETH-USD/buy", nil)

    req.Header.Add("CB-VERSION", "2016-03-03")

    resp, _ := client.Do(req)

    defer resp.Body.Close()

    body, _ := ioutil.ReadAll(resp.Body)

    cp := &cryptoPayload{}

    json.Unmarshal([]byte(body), &cp)

    fmt.Println(cp.Data)

}
