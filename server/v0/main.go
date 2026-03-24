package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/gorilla/mux"
	"gopkg.in/mail.v2"
)

type SendMailRequest struct {
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Content string `json:"content"`
	Token   string `json:"token"`
}

func verifyCaptcha(token string) bool {
	if token == "" {
		return false
	}

	recaptchaSecret := os.Getenv("RECAPTCHA_SECRET")
	if recaptchaSecret == "" {
		return false
	}
	const verifyURL = "https://www.google.com/recaptcha/api/siteverify"

	res, err := http.PostForm(verifyURL, url.Values{
		"secret":   {recaptchaSecret},
		"response": {token},
	})
	if err != nil {
		return false
	}
	defer res.Body.Close()

	var response struct {
		Success bool `json:"success"`
	}

	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
		return false
	}

	return response.Success
}

func sendMail(sender string, subject string, content string) bool {
	m := mail.NewMessage()
	mailSender := os.Getenv("SENDER_MAIL")
	mailSenderPass := os.Getenv("SENDER_APP_PASSWORD")
	mailReceiver := os.Getenv("MAIL_RECEIVER")

	m.SetHeader("From", m.FormatAddress(mailSender, sender))
	m.SetHeader("Reply-To", sender)
	m.SetHeader("To", mailReceiver)
	m.SetHeader("Subject", "Via Portfolio, Subject: "+subject)

	m.SetBody("text/plain", content)

	d := mail.NewDialer(
		"smtp.gmail.com",
		465,
		mailSender,
		mailSenderPass,
	)

	// TLS (secure: true)
	d.SSL = true

	// Send mail
	if err := d.DialAndSend(m); err != nil {
		fmt.Println(err)
		return false
	}

	return true
}

func mailHandler(w http.ResponseWriter, r *http.Request) {
	var body SendMailRequest
	w.Header().Set("Content-Type", "application/json")

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(map[string]any{
			"status": 400,
			"body":   "Invalid request body",
		})
		return
	}
	defer r.Body.Close()

	if strings.TrimSpace(body.Email) == "" ||
		strings.TrimSpace(body.Subject) == "" ||
		strings.TrimSpace(body.Content) == "" ||
		strings.TrimSpace(body.Token) == "" {
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(map[string]any{
			"status": 400,
			"body":   "Please fill all fields",
		})
		return
	}

	verified := verifyCaptcha(body.Token)
	if !verified {
		w.WriteHeader(http.StatusUnauthorized)
		_ = json.NewEncoder(w).Encode(map[string]any{
			"status": 401,
			"body":   "either you are not a human.....🤨, or just redo the CAPTCHA",
		})
		return
	}

	sent := sendMail(body.Email, body.Subject, body.Content)
	if !sent {
		w.WriteHeader(http.StatusUnauthorized)
		_ = json.NewEncoder(w).Encode(map[string]any{
			"status": 401,
			"body":   "Sorry for the inconvinience, some error occured, you may try again or reach out via LinkedIn @linkedin.com/in/-aryan-rana",
		})
		return
	}

	var resp string = fmt.Sprintf("Email successfully sent to the Aryan Rana 🎉🎉 from: %s", body.Email)

	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(map[string]any{
		"status": 200,
		"body":   resp,
	})
}

func testRoute(w http.ResponseWriter, r *http.Request) {
	available := os.Getenv("ENV_CHECK")

	response := map[string]any{
		"status": "live",
		"body":   fmt.Sprintf("Server live on Azure Functions; Env: %s", available),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(response)
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api/v0/verify", testRoute).Methods("GET")
	r.HandleFunc("/api/v0/send-email", mailHandler).Methods("POST")

	notFound := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		_ = json.NewEncoder(w).Encode(map[string]any{
			"status": 404,
			"body":   "request method does not exist",
		})
	})

	r.NotFoundHandler = notFound
	r.MethodNotAllowedHandler = notFound

	port := os.Getenv("FUNCTIONS_CUSTOMHANDLER_PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Custom handler listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
