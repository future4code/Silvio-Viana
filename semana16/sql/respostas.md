### Exercício 1

#### a)
* id : String de até 255 caracteres usado como Primary Key
* name : String de até 255 caracteres, não pode ser vazio "NOT NULL"
* birth_date : data não vazia
* gender : string de até 6 caracters, não pode ser vazio

#### b)
* SHOW DATABASES: Mostra cada Banco de Dados
* SHOW TABLES: Mostra cada tabela

#### c)

* DESCRIBE: Descreve os tipos de cada campo da tabela

### Exercício 2

#### a) INSERT INTO Actor (id, name, salary, birth_date, gender) VALUES ("002", "Glória Pires", 1200000, "1963-08-23", "female");

#### b) Porque já existe o id '002' na tabela, e já que o id é uma Primary Key, não pode existir dois ids iguais

#### c) Está sendo passado mais valores, que campos.

#### d) O nome não foi informado

#### e) A data não está entre aspas

### Exercício 3

#### a) SELECT * FROM Actor WHERE gender = "female";

#### b) SELECT salary FROM Actor WHERE name = "Tony Ramos";

#### c) SELECT * FROM Actor WHERE gender = "invalid"; // Não tem nenhuma pessoa com esse genero na tabela

#### d) SELECT id, name, salary FROM Actor WHERE salary <= 500000;

#### e) O nome do campo é 'name' não 'nome' // SELECT id, name from Actor WHERE id = "002"

### Exercício 4

#### a) Selecione todas as informações, das pessoas que começam com a Letra A ou J se elas tiverem salário acima de R$300.000

#### b) SELECT * FROM Actor WHERE name NOT LIKE "A%" AND salary > 350000;

#### c) SELECT * FROM Actor WHERE name LIKE "%g%";

#### d) SELECT * FROM Actor WHERE (name LIKE "%g%" OR name LIKE "%a%") AND salary BETWEEN 350000 AND 900000;

### Exercício 5

#### a) 
CREATE TABLE Filmes (
	id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    sinopse TEXT NOT NULL,
    lancamento DATE NOT NULL,
    nota INT NOT NULL
);

#### b) 
INSERT INTO Filmes (id, nome, sinopse, lancamento, nota) VALUES ( '001', 'Se Eu Fosse Você', 
'Cláudio e Helena são casados há muitos anos e enfrentam a rotina do casamento. Um dia eles são atingidos por um fenômeno inexplicável e trocam de corpos',
"2006-01-06",
7);

#### c) 
INSERT INTO Filmes (id, nome, sinopse, lancamento, nota) VALUES ( '002', 'Doce de mãe', 
'Dona Picucha, uma animada senhora de 85 anos, sempre causa grandes confusões. A vida dela e dos seus quatro filhos sofre uma reviravolta depois que Zaida, empregada e amiga de Dona Picucha, anuncia que vai se casar e não poderá mais morar com ela',
"2012-12-27",
10);

#### d) 
INSERT INTO Filmes (id, nome, sinopse, lancamento, nota) VALUES ( '003', 'Dona Flor e Seus Dois Maridos', 
'Dona Flor é uma sedutora professora de culinária casada com Vadinho, que só quer saber de farras e jogatina nas boates. A vida de abusos acaba por acarretar sua morte precoce.',
"2017-11-02",
8);

#### e)
INSERT INTO Movie (id, title, synopsis, release_date, rating) 
VALUES(
	"004",
    "Deus é Brasileiro",
    "Cansado da humanidade, Deus resolve tirar férias para descansar e procura alguém no Brasil capaz de substituí-lo. O borracheiro e pescador Taoca e a solitária Madá deverão guiá-lo até Quincas das Mulas, candidato de Deus a santo.",
    "2003-01-31",
    9
)

### Exercício 6

#### a) SELECT id, nome, nota FROM Filmes WHERE id = '003';

#### b) SELECT * FROM Filmes WHERE nome = 'Doce de mãe';

#### c) SELECT id, nome, sinopse FROM Filmes WHERE nota >= 7;

### Exercício 7

#### a) SELECT * FROM Filmes WHERE nome LIKE "%vida%";

#### b) SELECT * FROM Filmes WHERE nome LIKE "%TERMO DE BUSCA%" OR sinopse LIKE "%TERMO DE BUSCA%";

#### c) SELECT * FROM Filmes WHERE lancamento < "2021-05-24";

#### d) SELECT * FROM Filmes WHERE lancamento < "2021-05-24"AND (nome LIKE "%TERMO DE BUSCA%" OR sinopse LIKE "%TERMO DE BUSCA%") AND nota > 7;