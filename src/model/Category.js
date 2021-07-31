import { Model } from '@nozbe/watermelondb'
import { children, date, text } from '@nozbe/watermelondb/decorators'

export default class Category extends Model {
  static table = 'categories'

  static associations = {
    expenses: { type: 'has_many', foreignKey: 'category_id' },
  }

  @text('name') name
  @text('icon_name') iconName
  @text('icon_type') iconType

  @date('created_at') createdAt
  @date('updated_at') updatedAt

  @children('expenses') expenses
}