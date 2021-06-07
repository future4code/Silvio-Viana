### Exercício 1

    a) Acredito que seja mais seguro por ter mais combinações possíveis, sim
    ----------------------------------------------------------------------------------
    b) import { v4 } from 'uuid'

    export function generateId () : string {

        return v4()
    }

### Exercício 2

    a) A primeira função liga o banco de dados ao código, a segunda insere um novo usuário no banco de dados
    ----------------------------------------------------------------------------------
    b)
        CREATE TABLE IF NOT EXISTS to_do_list_users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(64) NOT NULL,
        nickname VARCHAR(64) NOT NULL,
        email VARCHAR(64) NOT NULL);
    ----------------------------------------------------------------------------------
    c) Já existe, estou usando o template

### Exercício 3