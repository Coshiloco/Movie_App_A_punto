import {
  responsiveAttachment,
  ResponsiveAttachmentContract,
} from '@ioc:Adonis/Addons/ResponsiveAttachment'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Content from './Content'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contentimageid: number

  @belongsTo(() => Content, {
    localKey: 'contentimageid',
  })
  public image: BelongsTo<typeof Content>

  @responsiveAttachment({ preComputeUrls: true })
  public imageXlMd: ResponsiveAttachmentContract | null

  @responsiveAttachment({ preComputeUrls: true })
  public imageLgSm: ResponsiveAttachmentContract | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
