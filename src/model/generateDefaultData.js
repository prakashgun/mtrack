import { accountDetails, categoryDetails } from "./defaultData"

const makeAccount = (db, accountDetail) => db.collections.get('accounts').prepareCreate((account) => {
    account.name = accountDetail['name']
    account.amount = accountDetail['amount']
})


const makeCategory = (db, categoryDetail) => db.collections.get('categories').prepareCreate((category) => {
    category.name = categoryDetail['name']
    category.icon_name = categoryDetail['icon_name']
    category.icon_type = categoryDetail['icon_type']
})


export async function generateDefaultData(database) {
    database.action(async (action) => {
        await action.subAction(() => db.unsafeResetDatabase())
        const accounts = flatMap((accountDetail) => makeAccount(database, accountDetail), accountDetails)
        const categories = flatMap((categoryDetail) => makeCategory(database, categoryDetail), categoryDetails)
    })
}