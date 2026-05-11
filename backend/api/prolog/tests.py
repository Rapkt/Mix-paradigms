from pyswip import Prolog

omar = "omar"
Prolog.dynamic("student/1")
Prolog.assertz(f"student({omar})")
Prolog.assertz("student(ahmed)")
# Prolog.retractall("student(_)") # retract all previous definitions (clauses) of the predicate
# retract -> remove a certain clause

Prolog.assertz("student(mohamed)")
Prolog.assertz("student(abdallah)")
for x in list(Prolog.query("student(X)")):
    print(f"X: {x['X']}")
nullables = ["none"]


def nullable(name: str):
    return name in nullables


Prolog.register_foreign(nullable, arity=1)
""" for x in list(Prolog.query("nullable(X)")):
    print(f"X: {x["X"]}")
 """
