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


Prolog.assertz("""recommend_based_on_preference(User_department,User_preferences,Course) :-
    department(Course,User_department),
    preference(Course,Preference),
    member(Preference,User_preferences)""")
Prolog.asserta("""recommend_based_on_prerequisite(User_department,User_prerequisites,Course):-
    department(Course,User_department),
    (
        User_prerequisites \\= [] -> 
        (
            prerequisite(Course,'None') ;
            ( prerequisite(Course,Y), member(Y,User_prerequisites) )
        )
        ; prerequisite(Course,'None')
    ) 
    """)


Prolog.asserta("""recommend_based_on_year_of_study(User_department,User_year_of_study,Course):-
        department(Course,User_department),
        year_of_study(Course,User_year_of_study)""")

Prolog.asserta("""recommend_based_on_difficulty(User_department,User_difficulty,Course):-
    department(Course,User_department),
    difficulty(Course,User_difficulty)""")

Prolog.asserta("""course_data(Id,Name,Dept,Difficulty,Year, Pre):-
    department(Name,Dept),
    difficulty(Name,Difficulty),
    course_id(Name, Id),
    prerequisite(Name, Pre),
    year_of_study(Name, Year)""")

# print(list(Prolog.query(f"course_data(Id,{"'Principles of Acoustics'"},Dept,Difficulty,Year, Pre)")))


""" dep + prereq
1. pref     (same year then other)
2. easy     (same year then other)
3. medium   (same year then other)
4. hard     (same year then other)
"""


def recomendCourses(department: str, studiedCourses: list[str], currentYear: int, preferences: list[str], difficulty):
    based_on_prefenrence=  list(map(lambda e:e["X"],list(Prolog.query(f"recommend_based_on_preference({department},{preferences},X)"))))
    based_on_prefenrence = set(based_on_prefenrence)
    based_on_prerequisites = list(map(lambda e:e["X"],Prolog.query(f"recommend_based_on_prerequisite({department},{studiedCourses},X)")))
    based_on_prerequisites = set(based_on_prerequisites)
    
    based_on_year_of_study = list(map(lambda e:e["X"],Prolog.query(f"recommend_based_on_year_of_study({department},'{currentYear}',X)")))
    based_on_year_of_study = set(based_on_year_of_study)
    based_on_prerequisites = set(based_on_prerequisites)
    
    easy = list(map(lambda e:e["X"],Prolog.query(f"recommend_based_on_difficulty({department},'Easy',X)")))
    easy = set(easy)
    med = list(map(lambda e:e["X"],Prolog.query(f"recommend_based_on_difficulty({department},'Medium',X)")))
    med = set(med)
    hard = list(map(lambda e:e["X"],Prolog.query(f"recommend_based_on_difficulty({department},'Hard',X)")))
    hard = set(hard)
    
    prefered = based_on_prerequisites & based_on_prefenrence
    
    not_prefered_but_easy = (based_on_prerequisites & easy) - prefered
    not_prefered_but_med = (based_on_prerequisites & med) - prefered
    not_prefered_but_hard = (based_on_prerequisites & med) - prefered
    print(prefered)
    print("-------------")
    return {
        "prefered": list(map(lambda c: list(Prolog.query(f"course_data(Id,'{c}',Dept,Difficulty,Year, Pre)")),prefered))
    }
    
    # print(based_on_prefenrence)
    # print(len(based_on_prerequisites))
    print(based_on_prefenrence & easy & based_on_prerequisites & based_on_year_of_study)
    return None

print(recomendCourses("CSE", [], 1, ["Software"], "Easy"))


""" 
saied
getByPref (deprt, pref[])
getByPrereq (deprt, pref[])
getByYear (deprt, pref[])
getByDiff (deprt, pref[])
"""