package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func verifyCaptcha(token string) {

}

func sendMail(sender string, subject string, content string) {

}

func mailHandler(r *http.Request) {

}

func testRoute(w http.ResponseWriter, r *http.Request) {
	available := os.Getenv("ENV_CHECK")

	response := map[string]any{
		"status": 200,
		"body":   fmt.Sprintf("Server live on Azure Functions; Env: %s", available),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(response)
}

func main() {
	r := mux.NewRouter()
	r.Methods("GET", "POST")
	r.HandleFunc("/verify", testRoute)
	r.HandleFunc("/send-email", mailHandler)

}
