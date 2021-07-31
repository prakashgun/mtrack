import { Model } from '@nozbe/watermelondb'
import { date, field, relation, text } from '@nozbe/watermelondb/decorators'

export default class Expense extends Model {
  static table = 'expenses'

  static associations = {
    accounts: { type: 'belongs_to', key: 'account_id' },
    categories: { type: 'belongs_to', key: 'category_id' },
  }

  @text('name') name
  @field('amount') amount

  @date('created_at') createdAt
  @date('updated_at') updatedAt

  @relation('accounts', 'account_id') account
  @relation('categories', 'category_id') category
}