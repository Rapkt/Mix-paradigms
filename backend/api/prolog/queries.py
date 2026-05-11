from os import environ

from pyswip import Prolog
from os import environ
from dotenv import load_dotenv


from api.schemas import RecommendCoursesRequest, Course

load_dotenv()
knowledge_base_pl_path = environ.get("KNOWLEDGE_BASE_PL_PATH")
if knowledge_base_pl_path is None:
    raise ValueError("KNOWLEDGE_BASE_PL_PATH environment variable is not set.")

Prolog.consult(
    knowledge_base_pl_path
)  # must be at top level before to avoid redefinitions

# get a list of size 10 of courses
# print(list(map(lambda e: e["X"],list(Prolog.query("course(X)", maxresult=10)))))

# given department
# given studied courses
# given current year
# given preferences[]

""" 
return

"""


Prolog.assertz("""recommend_based_on_preference(User_department,User_preferences,User_courses,Course) :-
    department(Course,User_department),
    preference(Course,Preference),
    member(Preference,User_preferences),
    \\+member(Course,User_courses)""")
Prolog.asserta("""recommend_based_on_prerequisite(User_department,User_prerequisites,Course):-
    department(Course,User_department),
    (
        User_prerequisites \\= [] -> 
        (
            prerequisite(Course,'None') ;
            ( prerequisite(Course,Y), member(Y,User_prerequisites) )
        )
        ; prerequisite(Course,'None')
    ),\\+member(Course, User_prerequisites) 
    """)


Prolog.asserta("""recommend_based_on_year_of_study(User_department,User_year_of_study,User_courses,Course):-
        department(Course,User_department),
        year_of_study(Course,User_year_of_study),
        \\+member(Course,User_courses)""")

Prolog.asserta("""recommend_based_on_difficulty(User_department,User_difficulty,User_courses,Course):-
    department(Course,User_department),
    difficulty(Course,User_difficulty),
    \\+member(Course,User_courses)""")

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


def recommend_courses(
    request: RecommendCoursesRequest,
) -> dict[str, list[Course]]:
    department: str = request.department
    studiedCourses: list[str] = request.completed_courses
    currentYear: int = request.academic_year
    preferences: list[str] = request.preferences
    # difficulty: str = "_"
    based_on_prefenrence = list(
        map(
            lambda e: e["X"],
            list(
                Prolog.query(
                    f"recommend_based_on_preference('{department}',{preferences},{studiedCourses},X)"
                )
            ),
        )
    )
    based_on_prefenrence = set(based_on_prefenrence)
    print(based_on_prefenrence)
    print(studiedCourses)
    based_on_prerequisites = list(
        map(
            lambda e: e["X"],
            Prolog.query(
                f"recommend_based_on_prerequisite('{department}',{studiedCourses},X)"
            ),
        )
    )
    based_on_prerequisites = set(based_on_prerequisites)
    print(based_on_prerequisites)

    based_on_year_of_study = list(
        map(
            lambda e: e["X"],
            Prolog.query(
                f"recommend_based_on_year_of_study('{department}','{currentYear}',{studiedCourses},X)"
            ),
        )
    )
    based_on_year_of_study = set(based_on_year_of_study)
    print(based_on_year_of_study)

    easy = list(
        map(
            lambda e: e["X"],
            Prolog.query(f"recommend_based_on_difficulty('{department}','Easy',{studiedCourses},X)"),
        )
    )
    easy = set(easy)
    med = list(
        map(
            lambda e: e["X"],
            Prolog.query(f"recommend_based_on_difficulty('{department}','Medium',{studiedCourses},X)"),
        )
    )
    med = set(med)
    hard = list(
        map(
            lambda e: e["X"],
            Prolog.query(f"recommend_based_on_difficulty('{department}','Hard',{studiedCourses},X)"),
        )
    )
    hard = set(hard)

    prefered = based_on_prerequisites & based_on_prefenrence

    not_prefered_but_easy = (based_on_prerequisites & easy) - prefered
    not_prefered_but_med = (based_on_prerequisites & med) - prefered
    not_prefered_but_hard = (based_on_prerequisites & hard) - prefered

    def get_details(c: str):
        object = next(
            iter(Prolog.query(f"course_data(Id,'{c}',Dept,Difficulty,Year, Pre)"))
        )
        object["course_name"] = c
        object.update({"Id": object["Dept"] + "-" + object["Id"]})
        # print(object)
        course = Course(
            department=object["Dept"],
            course_name=object["course_name"],
            preference=object["Pre"],
            year=object["Year"],
            difficulty=object["Difficulty"],
            id=object["Id"],
        )
        return course

    prefered_courses = list(map(get_details, prefered))
    not_prefered_but_easy_courses = list(map(get_details, not_prefered_but_easy))
    not_prefered_but_med_courses = list(map(get_details, not_prefered_but_med))
    not_prefered_but_hard_courses = list(map(get_details, not_prefered_but_hard))
    # print(prefered_courses,not_prefered_but_easy_courses,not_prefered_but_med_courses,not_prefered_but_hard_courses)
    return {
        "prefered": prefered_courses,
        "not_prefered_easy": not_prefered_but_easy_courses,
        "not_prefered_med": not_prefered_but_med_courses,
        "not_prefered_hard": not_prefered_but_hard_courses,
    }


print(recommend_courses(RecommendCoursesRequest(department="CSE", academic_year=2, completed_courses=["Advanced Programming", "Data Structures"], preferences=["Programming", "Math"])))


""" 
saied
getByPref (deprt, pref[])
getByPrereq (deprt, pref[])
getByYear (deprt, pref[])
getByDiff (deprt, pref[])
"""
