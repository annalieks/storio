create table assignment
(
    id          uuid not null,
    deadline    timestamp,
    description varchar(255),
    max_grade   int4,
    title       varchar(255),
    grade       int4,
    course_id   uuid,
    user_id     uuid,
    primary key (id)
);
create table comment
(
    id         uuid not null,
    created_at timestamp,
    text       varchar(255),
    user_id    uuid,
    post_id    uuid,
    primary key (id)
);
create table course
(
    id          uuid not null,
    created_at  timestamp,
    description varchar(255),
    finished_at timestamp,
    name        varchar(255),
    user_id     uuid,
    primary key (id)
);
create table course_sponsors
(
    course_id   uuid not null,
    sponsors_id uuid not null
);
create table course_students
(
    student_courses_id uuid not null,
    students_id        uuid not null
);
create table course_tags
(
    course_id uuid not null,
    tags_id   uuid not null
);
create table material
(
    id        uuid not null,
    content   varchar(255),
    course_id uuid,
    primary key (id)
);
create table post
(
    id         uuid not null,
    created_at timestamp,
    text       varchar(255),
    user_id    uuid,
    course_id  uuid,
    primary key (id)
);
create table sponsor
(
    id          uuid not null,
    description varchar(255),
    name        varchar(255),
    primary key (id)
);
create table submission
(
    id            uuid not null,
    grade         int4,
    submitted     boolean,
    submitted_at  timestamp,
    text          varchar(255),
    assignment_id uuid,
    author_id     uuid,
    primary key (id)
);
create table tag
(
    id   uuid not null,
    name varchar(255),
    primary key (id)
);
create table to_do
(
    id         uuid not null,
    created_at timestamp,
    done       boolean,
    text       varchar(255),
    author_id  uuid,
    primary key (id)
);
create table user_data
(
    id         uuid not null,
    avatar     varchar(255),
    email      varchar(255),
    first_name varchar(255),
    last_name  varchar(255),
    password   varchar(255),
    primary key (id)
);
alter table if exists course_sponsors
    drop constraint if exists UK_4xtpob5xs0l5anvppl870dpcq;

alter table if exists course_sponsors
    add constraint UK_4xtpob5xs0l5anvppl870dpcq unique (sponsors_id);
alter table if exists course_tags
    drop constraint if exists UK_ekpr3lu8hby1b6uyjymon5cl9;

alter table if exists course_tags
    add constraint UK_ekpr3lu8hby1b6uyjymon5cl9 unique (tags_id);
alter table if exists assignment
    add constraint FKrop26uwnbkstbtfha3ormxp85
        foreign key (course_id)
            references course;
alter table if exists assignment
    add constraint FKhdb8hnmnw3g2kixd03pfmnosx
        foreign key (user_id)
            references user_data;
alter table if exists comment
    add constraint FKabstdhod9m73h4umby2n9euh1
        foreign key (user_id)
            references user_data;
alter table if exists comment
    add constraint FKs1slvnkuemjsq2kj4h3vhx7i1
        foreign key (post_id)
            references post;
alter table if exists course
    add constraint FKspopjlbe8aq8ydq61k8gofshi
        foreign key (user_id)
            references user_data;
alter table if exists course_sponsors
    add constraint FKf2r0bkkk8kpjuvu0ixva72fdr
        foreign key (sponsors_id)
            references sponsor;
alter table if exists course_sponsors
    add constraint FK3s2yub3rdtcipuj31u2q3sagh
        foreign key (course_id)
            references course;
alter table if exists course_students
    add constraint FKbtg9c1f3qa2ow7l52nnfn2r1s
        foreign key (students_id)
            references user_data;
alter table if exists course_students
    add constraint FKnu6xlbry29g8xwjy5ljfx79xp
        foreign key (student_courses_id)
            references course;
alter table if exists course_tags
    add constraint FKm0pitkcwp10i5wq9ylikvjimi
        foreign key (tags_id)
            references tag;
alter table if exists course_tags
    add constraint FK63ixc2ni7oipjtimftl4q5o01
        foreign key (course_id)
            references course;
alter table if exists material
    add constraint FKgwu2j6q988nwuqpo6p32uflmv
        foreign key (course_id)
            references course;

alter table if exists post
    add constraint FK6ljfcy74hilk7u5yf0hp4rlci
        foreign key (user_id)
            references user_data;
alter table if exists post
    add constraint FKe7p5x3rqf74eb00ynw9x85l5r
        foreign key (course_id)
            references course;
alter table if exists submission
    add constraint FK3q8643roa73llngo64dvpvtxt
        foreign key (assignment_id)
            references assignment;
alter table if exists submission
    add constraint FKj5tu5alb8wcy9042nkkq8fws2
        foreign key (author_id)
            references user_data;
alter table if exists to_do
    add constraint FKbq1bdbi6ly30himntf4ophuc5
        foreign key (author_id)
            references user_data