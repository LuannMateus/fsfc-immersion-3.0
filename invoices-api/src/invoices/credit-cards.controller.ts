import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { CreditCardsService } from "./credit-cards.service";
import { CreateCreditCardDto } from "./dto/create-credit-card.dto";

@Controller("credit-cards")
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Post()
  create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.creditCardsService.create(createCreditCardDto);
  }

  @Get()
  findAll() {
    return this.creditCardsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.creditCardsService.findOne(id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
  //   return this.invoicesService.update(+id, updateInvoiceDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.creditCardsService.remove(id);
  }
}
