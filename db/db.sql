CREATE DATABASE taller_persistencia;
USE taller_persistencia;

CREATE TABLE info (
    id        INT PRIMARY KEY NOT NULL,
    nombres   VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL
);

INSERT INTO taller_persistencia.info (id, nombres, apellidos) VALUES
    (100, "Mikle", "Gonza"),
    (101, "John", "Doe"),
    (102, "Alice", "Harrison"),
    (103, "Rob", "Williams"),
    (104, "Steve", "Collins"),
    (105, "Leonard", "Hoffman");
