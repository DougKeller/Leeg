package main

import (
  "os"
  "log"
  "net/http"
  "io/ioutil"
  "github.com/gin-gonic/gin"
  "github.com/KnutZuidema/golio"
  "github.com/KnutZuidema/golio/api"
)

func GetGolioClient() *golio.Client {
  client := golio.NewClient(os.Getenv("RIOT_API_KEY"),
            golio.WithRegion(api.RegionNorthAmerica))
  return client
}

func setupRouter() *gin.Engine {
	router := gin.Default()

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
