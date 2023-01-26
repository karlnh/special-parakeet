-- Departments

INSERT INTO department (dep_name)
VALUES  ("sales"),
        ("engineering"),
        ("finance"),
        ("legal");

-- Roles

INSERT INTO role (title, salary, dep_id)
VALUES  ("sales manager", 20.5, 1),
        ("salesperson", 2.0, 1),
        ("lead engineer", 40.5, 2),
        ("measly engineer", 20.0, 2),
        ("big shot account manager", 100.0, 3),
        ("accountant", 15.0, 3),
        ("lawyer", 500.0, 4),
        ("professor of law", 3.0, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("test", "subject", 4, 1),
        ("tom", "hanks", 1, 1);