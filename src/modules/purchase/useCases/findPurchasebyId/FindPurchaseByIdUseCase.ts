import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/middlewares/ErrorMiddleware";
import { FindPurchaseByIdValidations } from "../../../../utils/Validations/purchase/FindPurchaseByIdValidations";
import { Purchase } from "../../entities/Purchase";
import { IPurchasesRepository } from "../../repositories/IPurchasesRepository";

@injectable()
export class FindPurchaseByIdUseCase {
  constructor(
    @inject("PurchasesRepositoryInPrisma")
    private purchasesRepositoryInPrisma: IPurchasesRepository,
  ) {}
  async execute(id_compra: number): Promise<Purchase> {
    const validations = await FindPurchaseByIdValidations(id_compra);

    if (!validations.status) {
      throw new AppError(validations.message, validations.statusCode);
    }

    const purchase = await this.purchasesRepositoryInPrisma.findPurchaseById(
      id_compra,
    );

    return purchase;
  }
}
