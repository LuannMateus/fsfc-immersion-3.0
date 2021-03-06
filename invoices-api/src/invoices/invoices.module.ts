import { Module } from "@nestjs/common";
import { InvoicesService } from "./invoices.service";
import { InvoicesController } from "./invoices.controller";
import { CreditCardsController } from "./credit-cards.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "./entities/invoice.entity";
import { CreditCard } from "./entities/credit-card.entity";
import { CreditCardsService } from "./credit-cards.service";

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, CreditCard])],
  controllers: [InvoicesController, CreditCardsController],
  providers: [InvoicesService, CreditCardsService],
})
export class InvoicesModule {}
