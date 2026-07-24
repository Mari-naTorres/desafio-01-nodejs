import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

console.log(databasePath)

export class Database {
    #database = {} 

constructor(){
    fs.readFile(databasePath, 'utf8').then(data => {
        this.#database = JSON.parse(data)

    })
    .catch(() => {
        this.#persist()
    })
}

    #persist( ) {
        fs.writeFile('db.json', JSON.stringify(this.#database))
    }
    
    select(table, search){
        //1. Pega o caderno inteiro da tabela (ou uma lista vazia se não existir)
        let data = this.#database[table] ?? []

        //2. Se a recepcionista mandou um filtro de busca...
        if (search) {
            //3. Vmos fitrar a lista!
            data = data.filter(row => {
             //Object.entries transforma a busca numa listinha.
             // O .some() é como dizer: "O nome OU email tem essa palavra?"
                return Object.entries(search).some(([key, value]) => {
                   
                    // A nossa armadura contra o fantasma do "nome"! 🛡️
                    if (!row[key]) {
                        return false
                    }
                 //O toLowerCase() deixa tudo minúsculo para a busca não ser "chata" com letras maiúsculas
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
         //4. Devolve a lista (filtrada ou inteira)
        return data 
    }

    insert(table, data){
        if (Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist();

        return data;
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
             this.#persist()
        }
       
    }

    update(table, id, data){
        //1.Procura em qual "linha" o clientes está, igual ao delete
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        //2.Se encontrou a linha...
        if (rowIndex > -1) {
        //3. Substitui os dados antigos pelos dados novos, mas mantém o ID original
        this.#database[table][rowIndex] = { id, ...data }

        //4. Salva o caderno atualizado
        this.#persist()
        }
    }

}





//{} significa um objeto.[] é uma array



//Toda vez que a nossa aplicação reinicia, nós perdemos todos os dados. Uma das formas de evitar isso é salvando esses dados  de usuário dentro de um arquivo físico na nossa aplicação e qdo a aplicação iniciar, ela lê e popula o banco de dados com os dados que já existiam anteriormente.









