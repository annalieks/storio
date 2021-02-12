

CREATE TABLE assignment
(
    id        uuid      NOT NULL,
    course_id uuid      NOT NULL,
    deadline  timestamp,
    max_grade integer  ,
    PRIMARY KEY (id)
);

CREATE TABLE certificate
(
    id        uuid    NOT NULL,
    user_id   uuid    NOT NULL,
    course_id uuid    NOT NULL,
    grade     integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE comments
(
    id         uuid      NOT NULL,
    user_id    uuid      NOT NULL,
    post_id    uuid      NOT NULL,
    text       varchar  ,
    created_at timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE course
(
    id          uuid      NOT NULL,
    name        varchar   NOT NULL,
    description varchar  ,
    is_ended    boolean  ,
    created_at  timestamp,
    creator_id  uuid      NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE material
(
    id        uuid    NOT NULL,
    course_id uuid    NOT NULL,
    url       varchar,
    PRIMARY KEY (id)
);

CREATE TABLE post
(
    id         uuid      NOT NULL,
    user_id    uuid     ,
    course_id  uuid     ,
    text       varchar  ,
    created_at timestamp NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE sponsor
(
    id        uuid    NOT NULL,
    course_id uuid   ,
    name      varchar,
    PRIMARY KEY (id)
);

CREATE TABLE submission
(
    id            uuid      NOT NULL,
    user_id       uuid      NOT NULL,
    course_id     uuid      NOT NULL,
    time          timestamp NOT NULL,
    grade         integer  ,
    is_submitted  boolean  ,
    assignment_id uuid     ,
    text          varchar  ,
    PRIMARY KEY (id)
);

CREATE TABLE tag
(
    id        uuid    NOT NULL,
    course_id uuid   ,
    name      varchar,
    PRIMARY KEY (id)
);

CREATE TABLE todo
(
    id      uuid    NOT NULL,
    user_id uuid    NOT NULL,
    text    varchar NOT NULL,
    is_done boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE user_course
(
    id        uuid NOT NULL,
    user_id   uuid,
    course_id uuid,
    PRIMARY KEY (id)
);

CREATE TABLE user_data
(
    id         uuid    NOT NULL,
    email      varchar,
    password   varchar,
    name       varchar,
    avatar_url varchar,
    PRIMARY KEY (id)
);

ALTER TABLE user_course
    ADD CONSTRAINT FK_user_data_TO_user_course
        FOREIGN KEY (user_id)
            REFERENCES user_data (id);

ALTER TABLE user_course
    ADD CONSTRAINT FK_course_TO_user_course
        FOREIGN KEY (course_id)
            REFERENCES course (id);

ALTER TABLE post
    ADD CONSTRAINT FK_user_data_TO_post
        FOREIGN KEY (user_id)
            REFERENCES user_data (id);

ALTER TABLE post
    ADD CONSTRAINT FK_course_TO_post
        FOREIGN KEY (course_id)
            REFERENCES course (id);

ALTER TABLE submission
    ADD CONSTRAINT FK_user_data_TO_submission
        FOREIGN KEY (user_id)
            REFERENCES user_data (id);

ALTER TABLE submission
    ADD CONSTRAINT FK_course_TO_submission
        FOREIGN KEY (course_id)
            REFERENCES course (id);

ALTER TABLE material
    ADD CONSTRAINT FK_course_TO_material
        FOREIGN KEY (course_id)
            REFERENCES course (id);

ALTER TABLE todo
    ADD CONSTRAINT FK_user_data_TO_todo
        FOREIGN KEY (user_id)
            REFERENCES user_data (id);

ALTER TABLE tag
    ADD CONSTRAINT FK_course_TO_tag
        FOREIGN KEY (course_id)
            REFERENCES course (id);

ALTER TABLE assignment
    ADD CONSTRAINT FK_user_data_TO_assignment
        FOREIGN KEY (course_id)
            REFERENCES user_data (id);

ALTER TABLE sponsor
    ADD CONSTRAINT FK_course_TO_sponsor
        FOREIGN KEY (course_id)
            REFERENCES course (id);

ALTER TABLE comments
    ADD CONSTRAINT FK_post_TO_comments
        FOREIGN KEY (user_id)
            REFERENCES post (id);

ALTER TABLE comments
    ADD CONSTRAINT FK_user_data_TO_comments
        FOREIGN KEY (post_id)
            REFERENCES user_data (id);

ALTER TABLE certificate
    ADD CONSTRAINT FK_user_data_TO_certificate
        FOREIGN KEY (user_id)
            REFERENCES user_data (id);

ALTER TABLE certificate
    ADD CONSTRAINT FK_course_TO_certificate
        FOREIGN KEY (course_id)
            REFERENCES course (id);

ALTER TABLE submission
    ADD CONSTRAINT FK_assignment_TO_submission
        FOREIGN KEY (assignment_id)
            REFERENCES assignment (id);

ALTER TABLE course
    ADD CONSTRAINT FK_user_data_TO_course
        FOREIGN KEY (creator_id)
            REFERENCES user_data (id);


      