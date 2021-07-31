/**
 * @format
 */

import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import App from './App'
import { name as appName } from './app.json'
import migrations from './src/model/migrations'
import schema from './src/model/schema'
import Account from './src/model/Account'
import Category from './src/model/Category'
import Expense from './src/model/Expense'


// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
    // (You might want to comment it out for development purposes -- see Migrations documentation)
    migrations,
    // (optional database name or file system path)
    dbName: 'mtrack',
    // (recommended option, should work flawlessly out of the box on iOS. On Android,
    // additional installation steps have to be taken - disable if you run into issues...)
    jsi: true, /* Platform.OS === 'ios' */
    // (optional, but you should implement this method)
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
    }
})

// Then, make a Watermelon database from it!
export const database = new Database({
    adapter,
    modelClasses: [
        Account, Category, Expense
    ],
})

AppRegistry.registerComponent(appName, () => App)
