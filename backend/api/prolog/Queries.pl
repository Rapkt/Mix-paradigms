:- include('Knowledge_base.pl').

recommend_based_on_preference(User_department,User_preferences,Course):-
    department(Course,User_department),
    preference(Course,Preference),
    member(Preference,User_preferences).

recommend_based_on_prerequisite(User_department,User_prerequisites,Course):-
    department(Course,User_department),
    prerequisite(Course,Y),
    member(Y,User_prerequisites).

recommend_based_on_year_of_study(User_department,User_year_of_study,Course):-
        department(Course,User_department),
        year_of_study(Course,User_year_of_study),

recommend_based_on_difficulty(User_department,User_difficulty,Course):-
    department(Course,User_department),
    difficulty(Course,User_difficulty).

