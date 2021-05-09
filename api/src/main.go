package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
  "io/ioutil"
)

func setupRouter() *gin.Engine {
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Thanks for hitting this endpoint, fink")
	})

  router.GET("/get", func(c *gin.Context){
    client := &http.Client{}
    resp, _ := client.Get("https://httpbin.org/get")
    defer resp.Body.Close()
    body, _ := ioutil.ReadAll(resp.Body)
    c.String(http.StatusOK, string(body))
  })

	return router
}

func main() {
	router := setupRouter()
	router.Run(":4000")
}
