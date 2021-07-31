import { Model } from '@nozbe/watermelondb'

export default class Category extends Model {
  static table = 'categories'

  static associations = {
    expenses: { type: 'has_many', foreignKey: 'category_id' },
  }

  @text('name') name
  @field('amount') amount
}