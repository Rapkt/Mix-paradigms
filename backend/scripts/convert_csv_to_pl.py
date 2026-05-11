import csv
from os import environ

knowledge_base_csv_path = environ.get("KNOWLEDGE_BASE_CSV_PATH")
if knowledge_base_csv_path is None:
    raise ValueError("KNOWLEDGE_BASE_CSV_PATH environment variable is not set.")

knowledge_base_pl_path = environ.get("KNOWLEDGE_BASE_PL_PATH")
if knowledge_base_pl_path is None:
    raise ValueError("KNOWLEDGE_BASE_PL_PATH environment variable is not set.")

courses = []
with open(knowledge_base_csv_path, newline="") as file:
    read = csv.reader(file)
    courses = list(read)

# structure of each course entry in courses:
# ['Introduction to Computer Engineering', 'Easy', 'None', 'Hardware/Software', '4', 'CSE']
with open(knowledge_base_pl_path, "w") as b:
    # pardon my redunduncy tarek, try to concatinate the loops and you will see why :..(
    for c in courses:
        if c[1] == "course_name":
            continue
        b.write(f"course('{c[1]}').\n")
    for c in courses:
        if c[1] == "course_name":
            continue
        b.write(f"course_id('{c[1]}', '{c[0]}').\n")
    for c in courses:
        if c[1] == "course_name":
            continue
        b.write(f"difficulty('{c[1]}', '{c[2]}').\n")
    for c in courses:
        if c[1] == "course_name":
            continue
        b.write(f"prerequisite('{c[1]}', '{c[3]}').\n")
    for c in courses:
        if c[1] == "course_name":
            continue
        b.write(f"preference('{c[1]}', '{c[4]}').\n")
    for c in courses:
        if c[1] == "course_name":
            continue
        b.write(f"year_of_study('{c[1]}', '{c[5]}').\n")
    for c in courses:
        if c[1] == "course_name":
            continue
        b.write(f"department('{c[1]}', '{c[6]}').\n")
