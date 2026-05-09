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
    based_on_prefenrence=  set(map(lambda e:e["X"],set(Prolog.query(f"recommend_based_on_preference({department},{preferences},X)",))))
    based_on_prerequisites = set(map(lambda e:e["X"],set(Prolog.query(f"recommend_based_on_prerequisite({department},{studiedCourses},X)",))))
    based_on_year_of_study = set(map(lambda e:e["X"],set(Prolog.query(f"recommend_based_on_year_of_study({department},{currentYear},X)",))))
    based_on_prerequisites = set(map(lambda e:e["X"],set(Prolog.query(f"recommend_based_on_difficulty({department},{difficulty},X)",))))
    return None



""" 
saied
getByPref (deprt, pref[])
getByPrereq (deprt, pref[])
getByYear (deprt, pref[])
getByDiff (deprt, pref[])
"""