INSERT INTO department (id, name)
VALUES (001, "Engineering"),
       (002, "Finance"),
       (003, "Legal"),
       (004, "Sales");
       
INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Sales Lead", 100000, 004),
       (002, "Salesperson", 80000, 004)
       (003, "Lead Engineer", 150000, 001),
       (004, "Software Engineer", 120000, 001),
       (005, "Account Manager", 160000, 002),
       (006, "Accountant", 125000, 002),
       (007, "Legal Team Lead", 250000, 003),
       (008, "Lawyer", 190000, 003);

INSERT INTO role (id, first_name, last_name, title, department_id, salary, manager)
VALUES (001, "John", "Doe", ),
       (002, "Mike", "Chan", )
       (003, "Ashley", "Rodriguez", );
       