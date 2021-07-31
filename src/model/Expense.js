import { Model } from '@nozbe/watermelondb'

export default class Expense extends Model {
  static table = 'expenses'

  static associations = {
    accounts: { type: 'belongs_to', key: 'account_id' },
    categories: { type: 'belongs_to', key: 'category_id' },
  }
}