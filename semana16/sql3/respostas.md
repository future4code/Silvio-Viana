### Exercício 1

#### a) É um componente que se baseia em outra tabela

#### b) INSERT INTO Rating VALUES ('002', "Adorei", 10, "003")

#### c) A "Foreign Key" não foi achada, então o comando não pôde ser concluido

#### d) ALTER TABLE Movie DROP COLUMN nota;

#### e) Não posso apagar uma coluna que é referenciada em outra tabela

### Exercício 2

#### a) A tabela vai salvar o id do filme e o id do ator, para representar qual ator participou de qual filme.

#### b) Ex: INSERT INTO MovieCast VALUES ("002", "001");

#### c) Não Achou o id na tabela de referência

#### d) O Ator não pode ser deletado já que ele é uma referência de outra tabela

### Exercício 3

#### a) ON diz a condição para juntar as tabelas

#### b) SELECT Movie.nome, Movie.id, Rating.rate FROM Movie JOIN Rating ON Movie.id = Rating.movie_id;

### Exercício 4

#### a) SELECT Movie.id, Movie.nome, Rating.rate, Rating.comment FROM Movie LEFT JOIN Rating ON Movie.id = Rating.movie_id;

#### b) SELECT Movie.id, Movie.nome, MovieCast.actor_id FROM Movie LEFT JOIN MovieCast ON Movie.id = MovieCast.movie_id;

#### c) SELECT Movie.nome, AVG(Rating.rate) FROM Movie LEFT JOIN Rating ON Movie.id = Rating.movie_id GROUP BY Movie.id;

### Exercício 5

#### a) Para juntar 2 tabelas precisa somente de um JOIN, mas para adicionar uma 3° é necessário mais um JOIN

#### b) SELECT m.id, m.nome, a.id, a.name FROM Movie m JOIN MovieCast mc ON m.id = mc.movie_id JOIN Actor a ON a.id = mc.actor_id;

#### c) "m,title" está escrito com "," em vez de "."

#### d)
    SELECT m.nome as Filme, a.name as Atores , r.rate as Nota , r.comment as Comentário
    FROM Movie m 
    LEFT JOIN MovieCast mc ON m.id = mc.movie_id 
    LEFT JOIN Actor a ON a.id = mc.actor_id
    LEFT JOIN Rating r ON r.movie_id = m.id;

### Exercício 6

#### a) 1:N

#### b)
    CREATE TABLE Oscar (
    id VARCHAR(255) PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    movie_id VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES Movie(id)
    );
#### c) INSERT INTO Oscar VALUES ("001", "Melhor Filme", "2022-05-05", "002"); // INSERT INTO Oscar VALUES ("002", "Melhor Direção", "2021-05-05", "003");

#### d) SELECT Movie.nome, Oscar.tipo FROM Movie JOIN Oscar ON Movie.id = Oscar.movie_id;
