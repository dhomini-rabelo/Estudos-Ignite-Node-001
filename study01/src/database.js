export class Database {
    #database = {}

    select(tableName) {
        const table = this.#database[tableName]
        if (table) {
            return table
        } else {
            throw new Error('Table not found')
        }  
    }
    
    insert(tableName, data) {
        const table = this.select(tableName)
        if(Array.isArray(table)) {
            const databaseData = {
                ...data,
                id: table.length + 1,
            }
            table.push(databaseData)
            return databaseData
        } else {
            throw new Error('Invalid table structure')
        }
    }
    
    migrate(migrationType, migrationArgs={}) {
        switch (migrationType) {
            case 'createTable': {
                const tableName = migrationArgs.name
                if (tableName) {
                    this.#database[tableName] = []
                } else {
                    throw new Error('Invalid table name')
                }
                break
            }
            default: {
                throw new Error('Invalid migrationType')
            }
        }
    }
}


