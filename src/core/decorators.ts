import { BaseController } from '../controllers';

export function catchErrors<A extends unknown[], R>(
  _target: object,
  _propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<
    (this: BaseController, ...args: A) => Promise<R>
  >,
): void {
  const original = descriptor.value!;
  descriptor.value = async function (
    this: BaseController,
    ...args: A
  ): Promise<R> {
    try {
      return await original.apply(this, args);
    } catch (err) {
      this.handleError(err);
      throw err;
    }
  } as (this: BaseController, ...args: A) => Promise<R>;
}
