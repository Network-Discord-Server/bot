import { Typeorm } from "@zachary_masson/modular-core";

export async function Count<Type>(
  entity: Typeorm.Repository<Type>,
): Promise<number> {
  return await entity.count();
}
