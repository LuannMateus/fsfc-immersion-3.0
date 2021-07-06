package server

import (
	"fmt"
	"log"
	"net"

	"github.com/LuannMateus/codebank/infrastructure/grpc/pb"
	"github.com/LuannMateus/codebank/infrastructure/grpc/service"
	"github.com/LuannMateus/codebank/usecase"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type GRPCServer struct {
	ProcessTransactionUseCase usecase.UseCaseTransaction
}

func NewGRPCServer() GRPCServer {
	return GRPCServer{}
}

func (g GRPCServer) Server() {
	lis, err := net.Listen("tcp", "0.0.0.0:50052")

	if err != nil {
		log.Fatal("Could not listen tcp port")
	}

	transactionService := service.NewTransactionService()
	transactionService.ProcessTransactionUseCase = g.ProcessTransactionUseCase

	grpcServer := grpc.NewServer()

	reflection.Register(grpcServer)

	pb.RegisterPaymentServiceServer(grpcServer, transactionService)

	fmt.Println("GRPC SERVER IS RUNNING...")

	grpcServer.Serve(lis)
}
