from pyswip import Prolog

Prolog.consult("tests.pl", relative_to=__file__) # must be at top level before to avoid redefinitions
omar = "omar"
Prolog.dynamic("student/1")
Prolog.assertz(f"student({omar})")
Prolog.assertz("student(ahmed)")
# Prolog.retractall("student(_)") # retract all previous definitions (clauses) of the predicate
                                # retract -> remove a certain clause
                                
Prolog.assertz(f"student(mohamed)")
Prolog.assertz(f"student(abdallah)")
for x in list(Prolog.query("student(X)")):
    print(f"X: {x["X"]}")
nullables = ["none"]
def nullable(name: str):
    return name in nullables

Prolog.register_foreign(nullable, arity=1)
""" for x in list(Prolog.query("nullable(X)")):
    print(f"X: {x["X"]}")
 """
import csv
courses = []
with open("knowledge_base_400.csv", mode='r', newline='') as file:
    read = csv.reader(file)
    for c in read: courses.append(c)

# structure of each course entry in courses:
# ['Introduction to Computer Engineering', 'Easy', 'None', 'Hardware/Software', '4', 'CSE']
with open("knowledge_base.pl", "w") as b:
    # pardon my redunduncy tarek, try to concatinate the loops and you will see why :..(
    for c in courses:
        if(c[0] == "course_name"): continue
        b.write(f"course('{c[0]}').\n")
    for c in courses:
        if(c[0] == "course_name"): continue
        b.write(f"difficulty('{c[0]}', '{c[1]}').\n")
    for c in courses:
        if(c[0] == "course_name"): continue
        b.write(f"prerequisite('{c[0]}', '{c[2]}').\n")
    for c in courses:
        if(c[0] == "course_name"): continue
        b.write(f"preference('{c[0]}', '{c[3]}').\n")
    for c in courses:
        if(c[0] == "course_name"): continue
        b.write(f"year_of_study('{c[0]}', '{c[4]}').\n")
    for c in courses:
        if(c[0] == "course_name"): continue
        b.write(f"department('{c[0]}', '{c[5]}').\n")
        

    