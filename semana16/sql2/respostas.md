### Exercício 1

#### a) Remove o campo salary

#### b) muda o nome 'gender' para 'sex'

#### c) Aumenta o limite de gender para 255 caracteres

#### d) ALTER TABLE Actor CHANGE gender gender VARCHAR(100);

### Exercício 2

#### a) UPDATE Actor SET birth_date = '1929-10-16' WHERE id = '003';

#### b) UPDATE Actor SET name = UPPER(name) WHERE name = "Juliana Paes"; // UPDATE Actor SET name = "Juliana Paes" WHERE name = "JULIANA PAES";

#### c) UPDATE Actor SET name = "Teste", salary = 1000, birth_date = '2000-02-02', gender = 'non-binary' WHERE id = '005';

#### d) Ele executou o código, mas não alterou nada já que o id não existe.

### Exercício 3

#### a) DELETE FROM Actor WHERE name = "Fernanda Montenegro";

#### b) DELETE FROM Actor WHERE gender = 'male' AND salary > 1000000;

### Exercício 4

#### a) SELECT MAX(salary) FROM Actor;

#### b) SELECT MIN(salary) FROM Actor WHERE gender = 'female';

#### c) SELECT COUNT(*) FROM Actor WHERE gender = 'female';

#### d) SELECT SUM(salary) FROM Actor;

### Exercício 5

#### a) Ele diz a quantidade de pessoas de cada genero

#### b) SELECT id, name from Actor ORDER BY name DESC;

#### c) SELECT * from Actor ORDER BY salary;

#### d) SELECT * from Actor ORDER BY salary DESC LIMIT 3;

#### e) SELECT gender, AVG(salary) from Actor GROUP BY gender;

### Exercício 6

#### a) ALTER TABLE Movie ADD playing_limit_date DATE;

#### b) ALTER TABLE Movie CHANGE nota nota FLOAT NOT NULL;

#### c) UPDATE Movie SET playing_limit_date = "2022-02-05" WHERE id = '003'; // UPDATE Movie SET playing_limit_date = "2018-02-05" WHERE id = '002';

#### d) O código não acha o id então ele não altera nada

### Exercício 7

#### a) SELECT COUNT(*) FROM Movie WHERE nota > 7.5 AND playing_limit_date < CURDATE();

#### b) SELECT AVG(nota) FROM Movie;

#### c) SELECT COUNT(*) FROM Movie WHERE playing_limit_date > CURDATE();

#### d) SELECT COUNT(*) FROM Movie WHERE lancamento > CURDATE();

#### e) SELECT MAX(nota) FROM Movie;

#### f) SELECT MAX(nota) FROM Movie;

### Exercício 8

#### a) SELECT * FROM Movie ORDER BY nome ASC;

#### b) SELECT * FROM Movie ORDER BY nome DESC LIMIT 5;

#### c) SELECT * FROM Movie WHERE playing_limit_date > CURDATE() ORDER BY lancamento DESC LIMIT 3;

#### d) SELECT * FROM Movie ORDER BY nota DESC LIMIT 3;