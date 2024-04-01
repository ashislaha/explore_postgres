Completed this course - https://www.udemy.com/course/sql-and-postgresql/?couponCode=KEEPLEARNING

Just awesome!!

(1) Now add the environment variable to use it in command line:

How to update? 

$ cd ~
$ ls -a

Update a new path for psql and restart the terminal to get the new changes

You need to update the bash_profile  (.bash_profile)
$vi .bash_profile 
and update below:
export PATH=/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH


(2). Create a database:

CREATE DATABASE test;

Use \l to list all the databases available in the computer.

\d <table_name> <— to describe a table.


Or simply $ \d <— to see the list of tables and their releationships 

$ \dt <— to see the list of tables.



(3). Connect a database

You can take help from terminal $ psal - -test

$ psql -h localhost -p 5432 test

OR

$psql

Inside psql.        \c test

(4). DROP a database:

DROP DATABASE test;

(5) create a table:

 CREATE TABLE user (id bigserial NOT NULL PRIMARY KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, gender VARCHAR(15) NOT NULL, dob DATE NOT NULL, email VARCHAR(50) NULL);

CREATE TABLE table_name (colum_name column_type constraints )


Now we must put some constraints as we want to make sure its value should follow some rules.
NOT NULL, PRIMARY KEY, 

Serial <— auto incremental number and it will increate the count value by 1
bigserial <— it is used 

CREATE TABLE person ( 
id bigserial NOT NULL PRIMARY KEY,
first_name VARCHAR(50) NOT NULL, 
last_name VARCHAR(50) NOT NULL, 
gender VARCHAR(50) NOT NULL,
data_of_birth DATE NOT NULL,
email VARCHAR(50) NULL
);


(6). DROP a table:

DROP table person;


(7) insert into a table:

Insert into table_name (column) values (…)

INSERT INTO person (first_name, last_name, gender, data_of_birth) VALUES (“Ashis”, “Laha”, “Male”,  “15-03-1989”), (“Barnali”, “Laha”, “female”, “13-12-1989”);

(8.1) Update a record in a table:

UPDATE <table_name> SET <column_name> = <value_name> WHERE <condition>;

(8.2) Delete a record in a table:

DELETE FROM <TABLE_NAME> WHERE <CONDITION>;


(8)  Data types in Postgres: https://www.postgresql.org/docs/9.5/datatype.html 


If we want to add 1000 of data into a table, we can use a website https://www.mockaroo.com/ 

(9) change the column name in a table:

ALTER TABLE "table_name" RENAME COLUMN "column 1" TO "column 2";


(10). Select <column_name>  from <table_name>.

(11) order by: (Ascending by / descending by) ASC/ DESC;

Select * from person order by country_name ASC; 

(12) distinct:

SELECT DISTINCT country_of_birth FROM person ORDER BY country_of_birth;


(13). Where clause:

Filter out the results.

test=# SELECT first_name FROM person WHERE gender = 'Male' AND country_of_birth = 'Sri Lanka';

(14). Comparison operator: ( =, >, <, !=, >=, <= )

test=# select 1 = 2;
 ?column? 
----------
 f
(1 row)

test=# select 1 < 3;
 ?column? 
----------
 t
(1 row)


(15). Limit and offset:

LIMIT THE RESULT.
test=# SELECT * FROM person LIMIT 10;


OFFSET <— GIVE SOME SPACE TO SKIP THE OFFSET RECORDS.

test=# SELECT * FROM person OFFSET 10 LIMIT 5;


LIMIT is not an sql query, we can use FETCH to fetch the limited rows.
test=# SELECT * FROM person FETCH FIRST 10 ROW ONLY;


(16). IN

— let’s say we can select everything from china, Brazil and France.

one way to achieve the same using where clause and OR condition.

test=# SELECT * FROM person WHERE country_of_birth = 'China' OR country_of_birth = 'Brazil' OR country_of_birth = 'France' ORDER BY country_of_birth DESC;
But it is duplicating country_of_birth multiple time and similar repeating condition over the time.


We can improve this using IN() keyword.
test=# SELECT * FROM person where country_of_birth IN('China', 'Brazil', 'France') ORDER BY country_of_birth;


(16). BETWEEN:

SELECT RECORDS BETWEEN A RANGE.

example — select every person whose birth day between 2015 to 2022

test=# SELECT * FROM person WHERE date_of_birth BETWEEN DATE '2015-01-01' AND DATE '2022-01-01';


(16). LIKE / ILike:

Matching keyword like wildcard ( regular expression)

example — find out all the persons having mail id with .com
test=# SELECT * FROM person where email LIKE '%.com'  ;

Example — having email with google —> test=# SELECT * FROM person where email LIKE '%@google.%';

% <— wildcat char
_ <— single char

ILIKE <— used for case-incentive 

Example — select all the country started with p
test=# SELECT * FROM person WHERE country_of_birth ILIKE 'p%';


(16). GROUP BY:

How many people we have country wise?

test=# SELECT country_of_birth, COUNT(*) FROM person GROUP BY country_of_birth;


(16). Having:

Having is used along with group by and allows us to do extra filtering on the results.

Example — we want to show the country whose have at least 10 people.

HAVING keyword must be after group by and before order by (if present).
test=# SELECT country_of_birth, COUNT(*) FROM person GROUP BY country_of_birth HAVING COUNT(*) >= 10 ORDER BY country_of_birth;


(16). AGGREGATE FUNC:

Count
Sum
Max
Min

— find out the most expensive car —> test=# SELECT MAX(price) FROM car;
— find out the min expensive car —> test=# SELECT MIN(price) FROM car;



Minimum price of each model —> 
test=# SELECT make, min(price) FROM car GROUP BY make;


— sum total sum of all cars
SELECT SUM(price) FROM car;

— show the total sum from each brand:
SELECT make, SUM(price) FROM car GROUP BY make;


(16). Arithmetic operations:

test=# select 12+4;
 ?column? 
----------
       16
(1 row)

OFFERING a 15% discount on actual price.

$ SELECT id, make, model, price, round(price * .10, 2) FROM car


How to assign a column for aggregate function: 
Using AS key word.

$ SELECT id, make, model, price, round(price * .10, 2) AS discounted_price FROM car


(16). COALESCE keyword: put default value to a nullable column. 

test=# select coalesce(null, null, null, 1, 2, 3, null);
 coalesce 
----------
        1
(1 row)

It returns the first valid output.

Requirement — in users table, provide some default email who does not have a valid email ( empty space):

test=# SELECT COALESCE(email, 'email not provided') FROM person; // add the default value to those users who does not have any email.


(16). NULLIF:

—————— Set up ——————————————————————————————————————

1. Download Postgres app (https://www.postgresql.org/ ) — currently I am using posture 14.2

Download (database password - 12345 and port 5432)

Installation Directory: /Library/PostgreSQL/16
Server Installation Directory: /Library/PostgreSQL/16
Data Directory: /Library/PostgreSQL/16/data
Database Port: 5432
Database Superuser: postgres
Operating System Account: postgres
Database Service: postgresql-16
Command Line Tools Installation Directory: /Library/PostgreSQL/16
pgAdmin4 Installation Directory: /Library/PostgreSQL/16/pgAdmin 4
Stack Builder Installation Directory: /Library/PostgreSQL/16
Installation Log: /tmp/install-postgresql.log


Installation Directory: /Library/PostgreSQL/16
Server Installation Directory: /Library/PostgreSQL/16
Data Directory: /Library/PostgreSQL/16/data
Database Port: 5432
Database Superuser: postgres
Operating System Account: postgres
Database Service: postgresql-16
Command Line Tools Installation Directory: /Library/PostgreSQL/16
pgAdmin4 Installation Directory: /Library/PostgreSQL/16/pgAdmin 4
Stack Builder Installation Directory: /Library/PostgreSQL/16
Installation Log: /tmp/install-postgresql.log


1. Start and stop the database

— do we have GUI for postgre? 
	We should use command line but few GUI is available like DataGrip (with licensing) and postico (Mac) / pgAdmin(windows)


Click on “postgre elephant” —> click on any database (test):
ashiss-macbook-pro:dev ashislaha$ /Applications/Postgres.app/Contents/Versions/14/bin/psql -p5432 "test"
psql (14.1)
Type "help" for help.
test=# 

pg_hba.conf <— this file contains the authentication scheme for client to connect the database.
https://stackoverflow.com/questions/15008204/how-to-check-postgres-user-and-password


ASHISs-Personal-MacBook-Pro:~ ashislaha$ psql -U postgres
psql (15.5 (Homebrew))
Type "help" for help.


CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	username VARCHAR(50) NOT NULL,
	bio VARCHAR(400),
	avatar VARCHAR(200),
	phone VARCHAR(20),
	email VARCHAR(40),
	password VARCHAR(50),
	status VARCHAR(15),
	CHECK(COALESCE(phone, email) IS NOT NULL)
);


CREATE TABLE posts(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	url VARCHAR(200) NOT NULL,
	caption VARCHAR(240),
	lat REAL CHECK(lat IS NULL OR (lat >= -90 AND lat <= 90)),
	lng REAL CHECK(lng IS NULL OR (lng >= -180 AND lng <= 180)),
	user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	contents VARCHAR(240) NOT NULL,
	user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE
);


CREATE TABLE likes(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
	comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
	CHECK(
		COALESCE((post_id)::BOOL::INTEGER, 0)
		+
		COALESCE((comment_id)::BOOL::INTEGER, 0)
		= 1
		),
	UNIQUE(user_id, post_id, comment_id)
);


CREATE TABLE photo_tags(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
	x INTEGER NOT NULL,
	Y INTEGER NOT NULL,
	UNIQUE(user_id, post_id)
);

CREATE TABLE caption_tags(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
	UNIQUE(user_id, post_id)
);

CREATE TABLE hashtags(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	title VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE hashtags_posts(
	id SERIAL PRIMARY KEY,
	hashtag_id INTEGER NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
	post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
	UNIQUE(hashtag_id, post_id)
);

CREATE TABLE followers(
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	leader_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	UNIQUE(leader_id, follower_id)
);


QQ. List down top 3 users having max ID from users:

SELECT *
FROM users
ORDER BY id DESC
LIMIT 3;

QQ. Find out the username and caption from posts where user id is 200

SELECT username, caption
FROM users
JOIN posts ON users.id = posts.user_id
WHERE users.id = 200;

QQ. Show username and the number of likes that they have created.

SELECT username, total_likes
FROM users
JOIN (
	SELECT user_id, COUNT(*) AS total_likes
	FROM likes
	GROUP BY user_id
) AS likes_db ON users.id = likes_db.user_id;


SELECT username, COUNT(*)
FROM users
JOIN likes ON users.id = likes.user_id
GROUP BY username;


Show directory path where data has been saved:
SHOW data_directory;

/Users/ashislaha/Library/Application Support/Postgres/var-16


SELECT oid, datname
FROM pg_database;

"oid"	"datname"
"5"	"postgres"
"16385"	"ashislaha"
"1"	"template1"
"4"	"template0"
"16390"	"usqa4_27_12"
"53866"	"instagram"

SELECT *
FROM pg_class;

It shows all the table, seq, index files.

Heap file ——> file that contains all the data.

Block or Page —> heap file is divided into multiple blocks or pages. Each page stores some number of rows (tuple).

Tuple / Item —> represents an individual row

Each block is 8 KB large.

Indexing:
CREATE INDEX ON users(username);

Each index represents the item/tuple. It creates a tree structure to keep the (block, index) information. While loading the table into RAM, we can only load the respective Block instead of loading the entire table to scan it.


EXPLAIN ANALYZE 
SELECT * FROM users WHERE username = ‘xxxx’;
Check the execution time.

Space used by Postgres on a table:
SELECT pg_size_pretty(pg_relation_size('users'));


Get the page details from B Tree after creating an index:
(Note - Postgres creates a default index for primary key and a column which is UNIQUE, so we don’t need any indexing for those columns).

SELECT *
FROM bt_page_items(‘index_name’, 1);


Parser —> Rewrite —> Planner (based on query, it comes up with series of plan to optimize the performance) —> Execute

EXPLAIN —> shows up the query plan about the query but don’t execute it.

EXPLAIN ANALYZE —> build a query plan, run it and show it.

Details statics:

SELECT *
FROM pg_stats
WEHRE tablename = ‘users’;

Common table expression: 
CTE can refer to an expression immediately.

View:
Similar to CTE, but we can create it and use it multiple times.

View does not create any new table. 

CREATE VIEW tags AS (
	SELECT id, created_at, user_id, post_id, ‘photo_tag’ AS type FROM photo_tags
	UNION ALL
	SELECT id, created_at, user_id, post_id, ‘caption_tag’ AS type FROM caption_tags
);

SELECT * FROM tags;

Materialized view:
View which has been stored for future references. It helps to optimize the performance for long running queries.

Q — Find out the number of likes per week per post/comment in the database:


SELECT date_trunc(‘week’, COALESCE(posts.created_at, comments.created_at)) AS week, 
		COUNT(posts.id) AS likes_per_post,
		COUNT(comments.id) AS likes_per_comments
FROM likes
LEFT JOIN posts ON posts.id = likes.post_id
LEFT JOIN comments ON comments.id = likes.comment_id
GROUP BY week
ORDER BY WEEK;

USING materialized view, we can optimize the above query:

CREATE MATERIALIZED VIEW weekly_likes AS (
	QUERY
) WITH DATA;

If the data has been changed and we need to refresh the materialized view.

REFRESH MATERIALIZED VIEW 	weakly_likes; // it re-run the query again.


Transactions:

Transfer $50 from A to B person:

(1). Begin:

There are multiple connections are connected to Postgres and all are seeing the same data.

Begin keyword is used to start a transaction. It just creates “workspace for connection 1” which is copied for main data pool (logically you can think but in actual it’s not happening)

BEGIN;

UPDATE accounts
SET balance = balance - 50
WHERE name = ‘A’;

—> if you search the amount from connection number 1, you will see the value is changed but from another connection it has still old value until transaction is not completed.

UPDATE accounts
SET balance = balance + 50
WHERE name = ‘B’;

COMMIT;

(2). Commit :

Save the changes 

(3). Rollback:

Don’t save any changes.
You must rollback if there is an error (aborted)

Schema migration and Data Migration:

— add a new column — (schema migration)
— copy old column(s) value into new column (like lat, long into point column for post table) — data migration
— drop those old columns (schema migration )

Always do schema migration and data migration using transaction. As API service is running, you will loose some data as transaction does not consider those new data. We should not do schema migration and data migration at the same time.

We can divide it into multiple tasks:
(1). Add a column Location <— schema change
(2). Deploy new API where we are updating (lat, long) and location both
(3). Copy database (lat, long) into location — simple code
(4). Deploy new API which are only updating location, no (lat, long)
(5). Drop lat, long as it’s not used anymore.


(1). create a folder 
(2). npm init -y
It will create package.json for adding dependency.

(3). npm install node-pg-migrate pg

Add node-pg migration and Postgres into the dependency.

(4). Update script inside package.json

"scripts": {
    "migrate":"node-pg-migrate"
  },

(5). Write down first migration up/down:

$ npm run migrate create add posts table

Now it will create those migration file, update Up and down:

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE posts(
            id SERIAL PRIMARY KEY,
            url VARCHAR(300),
            lat NUMERIC,
            lng NUMERIC,
        )
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE posts;
    `);
};


(6). Update DATABASE_URL before running migration file:

Depending on OS system, we can run the migration file:

DATABASE_URL=postgres://ashislaha@localhost:5432/socialmedia npm run migrate up

$ DATABASE_URL = postgres://ashislaha@localhost:5432/<data_base_name> npm run migrate up/down;

(7). Add express dependency:

$ npm install express pg

Add necessary code to create a post and fetch the data from Postgres using a Postgres connection.

(8). Add a new column ‘loc’:

$ npm run migrate create add loc to posts

Then Update code for up and down migration.

Then Run the UP migration:

(9). Update our server API to update loc:

(10). Copy and paste existing lat, log to Loc:

Our JS server can load batch-wise records of post (as there could be millions of records). 

While using transaction as it locked until it is committed or rolled back, no other transaction Cann’t update this record and will wait until previous transaction is finished.

(11). Update code in API service where we are inserting into ‘location’ only, not lat and long

(12). Drop lat and long column from the table by running migration file (down).

npm run migrate create drop lat lng


Node[ SQL —> PG ] —> Postgres

PG module will help us to create a client which interacts with Postgres db to process a query.
As a client can only process a single request, to overcome this, we used something called poll where a list of clients are present.

But for a transaction, we can use a single ‘client’. 

User repository:

Find - an array of object where each object represents a User.
findById - find a user with user id
Insert - insert a new user
Update - update a user information 
Delete - delete a particular user
Count - to get number of users
Valid - check a property is valid

$npm run start 

Nodemon will start 

(You can use Postman or rest client for testing)

SQL injection exploit:

Never execute any user input directly in SQL
(1). Sanitize user provided value
(2). Rely on Postgres to sanitize value for us.


Create a prepared statement 
Execute prepared statement

Statements and values:
`SELECT * FROM users WHERE id = $1 AND username = $2”, [121, “ashislaha”] 


