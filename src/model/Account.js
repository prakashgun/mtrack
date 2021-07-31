import { Model } from '@nozbe/watermelondb'
import { children, date, field, text } from '@nozbe/watermelondb/decorators'

export default class Account extends Model {
    static table = 'accounts'

    static associations = {
        expenses: { type: 'has_many', foreignKey: 'account_id' },
    }

    @text('name') name
    @field('amount') amount

    @date('created_at') createdAt
    @date('updated_at') updatedAt

    @children('expenses') expenses
}

