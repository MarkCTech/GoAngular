package main

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"

	"github.com/gorilla/mux"
)

//go:embed static/*
var static embed.FS

func main() {
	server()
}

func server() {
	router := mux.NewRouter()

	webapp, err := fs.Sub(static, "static")
	if err != nil {
		fmt.Println(err)
	}
	router.PathPrefix("/").Handler(http.FileServer(http.FS(webapp)))

	http.ListenAndServe(":5000", router)
}
