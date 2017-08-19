package main

import (
	"net/http"
)

func serveFiles(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	if path == "/" {
		http.ServeFile(w, r, "../frontend/index.html")
	} else {
		http.ServeFile(w, r, "../frontend/"+path)
	}
}

func main() {
	http.HandleFunc("/", serveFiles)

	http.ListenAndServe(":8080", nil)
}
