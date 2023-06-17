import { plainToInstance } from 'class-transformer'
import { Unpack } from '.'

export type DtoConstructor<T> = new (...args: any[]) => Unpack<T>

export const plainToDto = <T>(
  plain: unknown,
  dtoConstructor?: DtoConstructor<T>,
) => {
  const canTransform = dtoConstructor != null && plain != null
  return (canTransform ? plainToInstance(dtoConstructor, plain) : plain) as T
}
