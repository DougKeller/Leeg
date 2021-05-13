package async

import (
  "log"
  "github.com/streadway/amqp"
)

// https://www.rabbitmq.com/tutorials/tutorial-one-go.html

func failOnError(err error, msg string) {
  if err != nil {
    log.Fatalf("%s: %s", msg, err)
  }
}

func publish(queueName string, message string) {
  connection, err := amqp.Dial("amqp://guest:guest@rabbitmq:5672/")
  failOnError(err, "Failed to connect to RabbitMQ")
  defer connection.Close()

  channel, err := connection.Channel()
  failOnError(err, "Failed to open a channel")
  defer channel.Close()

  queue, err := channel.QueueDeclare(
    queueName,
    false,
    false,
    false,
    false,
    nil,
  )
  failOnError(err, "Failed to declare a queue")

  err = channel.Publish(
    "",
    queue.Name,
    false,
    false,
    amqp.Publishing{
      ContentType: "text/plain",
      Body: []byte(message),
    },
  )
  failOnError(err, "Failed to publish a message")
  log.Printf("Message Enqueued: [%s] %s", queueName, message)
}

func PublishSummonerUpdate(summonerId string) {
  publish("leeg.summoner.update", summonerId)
}
