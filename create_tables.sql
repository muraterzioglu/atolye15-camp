CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS author (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    mail TEXT NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS contents (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    type text NOT NULL,
    author UUID NOT NULL,
    relation UUID,
    title text NOT NULL,
    context text NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_author
        FOREIGN KEY(author) 
	    REFERENCES author(id),
    CONSTRAINT fk_relation
        FOREIGN KEY(relation) 
	    REFERENCES contents(id)
);

CREATE TABLE IF NOT EXISTS reactions (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    content UUID NOT NULL,
    author UUID NOT NULL,
    reaction TEXT NOT NULL UNIQUE,
    PRIMARY KEY (id),
    CONSTRAINT fk_author
        FOREIGN KEY(author) 
	    REFERENCES author(id),
    CONSTRAINT fk_content
        FOREIGN KEY(content) 
	    REFERENCES contents(id)
);