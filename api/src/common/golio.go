package common

import (
  "github.com/KnutZuidema/golio"
  "github.com/KnutZuidema/golio/api"
)

func GetGolioClient() *golio.Client {
  // Since we use kernel, it is not necessary to provide the true api key
  client := golio.NewClient("123",
            golio.WithRegion(api.RegionNorthAmerica))
  return client
}
