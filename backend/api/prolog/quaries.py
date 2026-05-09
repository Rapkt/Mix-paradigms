from pyswip import Prolog

Prolog.consult("knowledge_base.pl", relative_to=__file__) # must be at top level before to avoid redefinitions

# get a list of size 10 of courses
# print(list(map(lambda e: e["X"],list(Prolog.query("course(X)", maxresult=10)))))

# given department
# given studied courses
# given current year
# given preferences[]

""" 
return

"""
Prolog.asserta("""recomendCourseByPreference(Dep, Studied, Curryear, Prefs) :-
               department(C, Dep). """)

def recomendCourses(department: str, studiedCourses: list[str], currentYear: int, preferences: list[str]):
    
    
    return None



""" 
saied
getByPref (deprt, pref[])
getByPrereq (deprt, pref[])
getByYear (deprt, pref[])
getByDiff (deprt, pref[])
"""