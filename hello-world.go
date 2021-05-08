package main

import (
"fmt"
"log"
"net/http"
"io/ioutil"
)

func handleHelloWorld(writer http.ResponseWriter, req *http.Request){
  fmt.Fprintf(writer, "Thanks for hitting this endpoint, fink")
}

func handleGet(writer http.ResponseWriter, req *http.Request){
  client := &http.Client{}
  resp, _ := client.Get("https://httpbin.org/get")
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Fprintf(writer, string(body))
}

func main(){
  http.HandleFunc("/", handleHelloWorld)
  http.HandleFunc("/get", handleGet)
  log.Fatal(http.ListenAndServe(":8080", nil))
}
