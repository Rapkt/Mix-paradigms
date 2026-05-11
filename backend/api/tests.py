# from django.test import TestCase

# Create your tests here.

from os import environ

from pyswip import Prolog
from os import environ
from dotenv import load_dotenv

load_dotenv()
knowledge_base_pl_path = environ.get("KNOWLEDGE_BASE_PL_PATH")
if knowledge_base_pl_path is None:
    raise ValueError("KNOWLEDGE_BASE_PL_PATH environment variable is not set.")

Prolog.consult(
    knowledge_base_pl_path
)  # must be at top level before to avoid redefinitions


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
    ),\\+member(Course,User_courses) 
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


print(list(Prolog.query("recommend_based_on_preference('CSE', ['Hardware'], [], C)")))