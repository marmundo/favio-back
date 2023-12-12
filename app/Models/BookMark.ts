import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BookMark extends BaseModel {
  @column({ isPrimary: true })
  @column()
  public nome: string

  @column()
  public url: string

  @column()
  public importante: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
