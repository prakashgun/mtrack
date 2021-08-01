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
    database.write(async writer => {
        const post = await database.get('accounts').query().fetch()
        // const accounts = flatMap((accountDetail) => makeAccount(db, accountDetail), accountDetails)
        let accounts = []
        let categories = []
        accountDetails.forEach(accountDetail => accounts.push(makeAccount(database, accountDetail)))
        categoryDetails.forEach(categoryDetail => categories.push(makeCategory(database, categoryDetail)))

        const allRecords = [...accounts, ...categories]

        await database.batch(...allRecords)

        return allRecords.length
    })
}