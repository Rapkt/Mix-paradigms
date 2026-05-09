from pyswip import Prolog


import csv
courses = []
with open("/home/omar/study/Mix-paradigms/backend/data/knowledge_base_400.csv", mode='r', newline='') as file:
    read = csv.reader(file)
    for c in read: courses.append(c)

# structure of each course entry in courses:
# ['Introduction to Computer Engineering', 'Easy', 'None', 'Hardware/Software', '4', 'CSE']
with open("knowledge_base.pl", "w") as b:
    # pardon my redunduncy tarek, try to concatinate the loops and you will see why :..(
    for c in courses:
        if(c[1] == "course_name"): continue
        b.write(f"course('{c[1]}').\n")
    for c in courses:
        if(c[1] == "course_name"): continue
        b.write(f"course_id('{c[1]}', '{c[0]}').\n")
    for c in courses:
        if(c[1] == "course_name"): continue
        b.write(f"difficulty('{c[1]}', '{c[2]}').\n")
    for c in courses:
        if(c[1] == "course_name"): continue
        b.write(f"prerequisite('{c[1]}', '{c[3]}').\n")
    for c in courses:
        if(c[1] == "course_name"): continue
        b.write(f"preference('{c[1]}', '{c[4]}').\n")
    for c in courses:
        if(c[1] == "course_name"): continue
        b.write(f"year_of_study('{c[1]}', '{c[5]}').\n")
    for c in courses:
        if(c[1] == "course_name"): continue
        b.write(f"department('{c[1]}', '{c[6]}').\n")
        

    