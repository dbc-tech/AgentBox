import { Type } from 'class-transformer'
import { plainToDto } from './plain-to-dto'

class Hit {
  id: number

  @Type(() => Date)
  timestamp: Date
}

class Dto {
  id: number
  name: string

  @Type(() => Date)
  createdAt: Date

  @Type(() => Date)
  updatedAt: Date

  @Type(() => Hit)
  hits: Hit[]
}

const buildPlain = () => ({
  id: 1,
  name: 'test',
  createdAt: '2022-12-12T12:12:12.000Z',
  updatedAt: '2022-12-12T12:12:12.000Z',
  hits: [
    { id: 1, timestamp: '2022-12-12T12:12:15.000Z' },
    { id: 2, timestamp: '2022-12-12T12:12:16.000Z' },
  ],
})

const buildDto = (plain): Dto => ({
  ...plain,
  createdAt: new Date(plain.createdAt),
  updatedAt: new Date(plain.updatedAt),
  hits: plain.hits.map((h) => ({ ...h, timestamp: new Date(h.timestamp) })),
})

describe('plainToDto', () => {
  it('should convert plain object to the provided dto instance', () => {
    const plain = buildPlain()
    const expectedDto = buildDto(plain)

    const dto = plainToDto(plain, Dto)

    expect(dto).toEqual(expectedDto)
  })

  it('should work with arrays', () => {
    const plain = new Array(5).fill(buildPlain())
    const expectedDto = plain.map(buildDto)

    const dto = plainToDto(plain, Dto)

    expect(dto).toEqual(expectedDto)
  })

  it('should return the plain if dto constructor not provided', () => {
    const plain = buildPlain()

    const dto = plainToDto(plain)

    expect(dto).toEqual(plain)
  })
})
