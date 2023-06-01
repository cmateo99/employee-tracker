use company_db;

INSERT INTO department
    (name)
    VALUES
        ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO role (title, salary, department_id)
    VALUES
        ('Senior Sales Executive', 120000, 1),
        ('Sales Representative', 75000, 1),
        ('Lead Software Engineer', 180000, 2),
        ('Junior Software Engineer', 90000, 2),
        ('Senior Account Manager', 175000, 3),
        ('Financial Analyst', 110000, 3),
        ('Legal Manager', 240000, 4),
        ('Legal Counsel', 170000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ('Emily', 'Johnson', 1, NULL),
        ('Daniel', 'Smith', 2, 1),
        ('Olivia', 'Williams', 3, NULL),
        ('Ethan', 'Brown', 4, 3),
        ('Sophia', 'Davis', 5, NULL),
        ('Jacob', 'Anderson', 6, 5),
        ('Ava', 'Thompson', 7, NULL),
        ('William', 'Wilson', 8, 7);