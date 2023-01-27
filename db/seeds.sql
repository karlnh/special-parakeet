-- Departments

INSERT INTO department (dep_name)
VALUES  ("sales"),
        ("engineering"),
        ("finance"),
        ("legal");

-- Roles

INSERT INTO role (title, salary, dep_id)
VALUES  ("director of sales", 500000, 1),
        ("sales representative", 50000, 1),
        ("engineering manager", 70000, 2),
        ("junior engineer", 30000, 2),
        ("chief financial officer", 1000000, 3),
        ("payroll clerk", 50000, 3),
        ("chief compliance officer", 800000, 4),
        ("legal secretary", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("charlotte", "roberts", 1, null),
        ("zarif", "toma", 2, 1),
        ("darcy", "sweet", 3, null),
        ("bianca", "lima", 4, 3),
        ("bilqiz", "masaev", 5, null),
        ("tena", "varga", 6, 5),
        ("aman", "asmara", 7, null),
        ("anna", "kawai", 8, 7);