from pyswip import Prolog

Prolog.consult("knowledge_base.pl", relative_to=__file__) # must be at top level before to avoid redefinitions

# get a list of size 10 of courses
print(list(map(lambda e: e["X"],list(Prolog.query("course(X)", maxresult=10)))))