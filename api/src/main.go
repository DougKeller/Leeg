package main

import (
  "log"
  "net/http"
  "io/ioutil"
  "github.com/gin-gonic/gin"
  "github.com/gin-contrib/cors"
  "github.com/KnutZuidema/golio"
  "github.com/KnutZuidema/golio/api"
)

func GetGolioClient() *golio.Client {
  // Since we use kernel, it is not necessary to provide the true api key
  client := golio.NewClient("123",
            golio.WithRegion(api.RegionNorthAmerica))
  return client
}

func setupRouter() *gin.Engine {
	router := gin.Default()

  router.Use(cors.New(cors.Config{
    AllowOrigins: []string{"*"},
  }))

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Thanks for hitting this endpoint, fink")
	})

  router.GET("/get", func(c *gin.Context) {
    client := &http.Client{}
    resp, _ := client.Get("https://httpbin.org/get")
    defer resp.Body.Close()
    body, _ := ioutil.ReadAll(resp.Body)
    c.String(http.StatusOK, string(body))
  })

  router.GET("/summoner/:name", func(c *gin.Context) {
    client := GetGolioClient()
    summoner, err := client.Riot.Summoner.GetByName(c.Param("name"))
    if err != nil {
      log.Print(err)
    }
    c.JSON(http.StatusOK, summoner)
  })

	return router
}

func main() {
	router := setupRouter()
	router.Run(":4000")
}
