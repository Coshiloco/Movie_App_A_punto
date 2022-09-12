import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Image from './Image'

export default class Content extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public title: string

  @column()
  public description: string

  @column()
  public year: number

  @column()
  public category: string

  @column()
  public rating: number

  @hasMany(() => Image, {
    foreignKey: 'contentimageid',
  })
  public images: HasMany<typeof Image>

  @column()
  public isRecent: boolean

  @column()
  public isTrending: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
