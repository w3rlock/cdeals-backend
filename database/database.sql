create TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    pass VARCHAR(255)
);

create TABLE portfolio(
    id SERIAL PRIMARY KEY,
    img VARCHAR(255),
    role VARCHAR(255),
    category VARCHAR(255),
    about VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

create TABLE roles(
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(255)
);

create TABLE category(
    id SERIAL PRIMARY KEY,
    category VARCHAR(255),
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles (id)
);


create TABLE files(
    id SERIAL PRIMARY KEY,
    f_name VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

create TABLE links(
    id SERIAL PRIMARY KEY,
    l_name VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

create TABLE collabs(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    descr VARCHAR(255),
    u_from INTEGER,
    u_to INTEGER,
    c_status VARCHAR(255),
    FOREIGN KEY (u_from) REFERENCES users (id),
    FOREIGN KEY (u_to) REFERENCES users (id)
);