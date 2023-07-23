import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'




export class Database {
    #path = new URL('../database.json', import.meta.url)
    #database = {}

    constructor() {
        this.#loadData()
    }

    async #loadData() {
        return await fs.readFile(this.#path, 'utf8').then((data) => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(this.#path, JSON.stringify(this.#database))
    }

    select(tableName) {
        const table = this.#database[tableName]
        if (table) {
            if (Array.isArray(table)) {
                return table
            } else {
                throw new Error('Invalid table structure')
            }
        } else {
            throw new Error('Table not found')
        }  
    }
    
    insert(tableName, data) {
        const table = this.select(tableName)
        const databaseData = {
            ...data,
            id: randomUUID(),
        }
        table.push(databaseData)
        this.#persist()
        return databaseData

    }

    delete(tableName, id) {
        const table = this.select(tableName)
        const rowIndex = table.findIndex(item => item.id === id)
        if (rowIndex !== -1) {
            this.#database[tableName] = table.splice(rowIndex, 1)
            this.#persist()
        } else {
            throw new Error('Item not found')
        }
    }
    
    async migrate(migrationType, migrationArgs={}) {
        await this.#loadData()
        switch (migrationType) {
            case 'createTable': {
                const tableName = migrationArgs.name
                if (tableName && (this.#database[tableName] === undefined)) {
                    this.#database[tableName] = []
                } else if(!tableName) {
                    throw new Error('Invalid table name')
                }
                break
            }
            default: {
                throw new Error('Invalid migrationType')
            }
        }
        this.#persist()
    }
}


