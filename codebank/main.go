package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/LuannMateus/codebank/infrastructure/grpc/server"
	"github.com/LuannMateus/codebank/infrastructure/kafka"
	"github.com/LuannMateus/codebank/infrastructure/repository"
	"github.com/LuannMateus/codebank/usecase"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	db := setupDb()

	defer db.Close()

	producer := setupkafkaProducer()

	processTransactionUseCase := setupTransactionUseCase(db, producer)

	serveGrpc(processTransactionUseCase)

}

func setupTransactionUseCase(db *sql.DB, producer kafka.KafkaProducer) usecase.UseCaseTransaction {
	transactionRepository := repository.NewTransactionRepositoryDb(db)

	useCase := usecase.NewUseCaseTransaction(transactionRepository)

	useCase.KafkaProducer = producer

	return useCase
}

func setupkafkaProducer() kafka.KafkaProducer {
	producer := kafka.NewKafkaProducer()

	producer.SetupProducer(os.Getenv("KafkaBootstrapServers"))

	return producer
}

func setupDb() *sql.DB {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("host"),
		os.Getenv("port"),
		os.Getenv("user"),
		os.Getenv("password"),
		os.Getenv("dbname"),
	)

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		log.Fatal("Error connection to database")
	}

	return db
}

func serveGrpc(processTransactionUseCase usecase.UseCaseTransaction) {
	grpcServer := server.NewGRPCServer()

	grpcServer.ProcessTransactionUseCase = processTransactionUseCase

	grpcServer.Server()
}

// cc := domain.NewCreditCard()
// cc.Number = "1234"
// cc.Name = "John"
// cc.ExpirationMonth = 7
// cc.ExpirationYear = 2021
// cc.CVV = 432
// cc.Limit = 1000
// cc.Balance = 0

// repo := repository.NewTransactionRepositoryDb(db)
// repo.CreateCreditCard(*cc)
