:- include('Knowledge_base.pl').

recommend_based_on_preference(user_department,user_preference):
    department(X,user_department),
    preference(X,user_preference).

recommend_based_on_prerequisite(user_department,user_prerequisites):
    department(X,user_department),
    prerequisite(X,Y),
    member(Y,user_prerequisites).

recommend_based_on_year_of_study(user_department,user_year_of_study):
        department(X,user_department),
        year_of_study(X,user_year_of_study),

recommend_based_on_difficulty(user_department,user_difficulty):
    department(X,user_department),
    difficulty(X,user_difficulty).

