import type { Typeorm } from "@zachary_masson/modular-core";
import Config from "@modular(logger)/config.json";

export async function Pagination<Type>(
  entity: Typeorm.Repository<Type>,
  page: number,
): Promise<Type[]> {
  const base = page === 1 ? 0 : Config.list.amount * (page - 1) + (page - 1);

  return await entity.find({
    skip: base,
    take: Config.list.amount,
  });
}
