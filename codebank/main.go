package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/LuannMateus/codebank/domain"
	"github.com/LuannMateus/codebank/infrastructure/repository"
	"github.com/LuannMateus/codebank/usecase"
	_ "github.com/lib/pq"
)

func main() {
	db := setupDb()

	defer db.Close()

	cc := domain.NewCreditCard()
	cc.Number = "1234"
	cc.Name = "John"
	cc.ExpirationMonth = 7
	cc.ExpirationYear = 2021
	cc.CVV = 432
	cc.Limit = 1000
	cc.Balance = 0

	repo := repository.NewTransactionRepositoryDb(db)
	repo.CreateCreditCard(*cc)

}

func setupTransactionUseCase(db *sql.DB) usecase.UseCaseTransaction {
	transactionRepository := repository.NewTransactionRepositoryDb(db)

	usecase := usecase.NewUseCaseTransaction(transactionRepository)

	return usecase
}

func setupDb() *sql.DB {
	psqlInfo := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		"db",
		"5432",
		"postgres",
		"root",
		"codebank",
	)

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		log.Fatal("Error connection to database")
	}

	return db
}
