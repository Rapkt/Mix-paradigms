import random

import pandas as pd

OUTPUT_COURSES_COUNT = 400

# Initial Core Courses from the Curriculum
core_courses = [
    # Basic Sciences
    {
        "course_name": "Mathematics 1 (Calculus)",
        "difficulty": "Hard",
        "department": "Basic and Applied Sciences",
        "preference": "Math",
    },
    {
        "course_name": "Mathematics 2 (Integration)",
        "difficulty": "Hard",
        "department": "Basic and Applied Sciences",
        "preference": "Math",
    },
    {
        "course_name": "Mathematics 3 (Differential Equations)",
        "difficulty": "Hard",
        "department": "Basic and Applied Sciences",
        "preference": "Math",
    },
    {
        "course_name": "Physics 1 (Mechanics)",
        "difficulty": "Medium",
        "department": "Basic and Applied Sciences",
        "preference": "Physics",
    },
    {
        "course_name": "Physics 2 (Electricity)",
        "difficulty": "Hard",
        "department": "Basic and Applied Sciences",
        "preference": "Physics",
    },
    {
        "course_name": "Engineering Chemistry",
        "difficulty": "Medium",
        "department": "Basic and Applied Sciences",
        "preference": "Chemistry",
    },
    {
        "course_name": "Engineering Mechanics 1",
        "difficulty": "Medium",
        "department": "Basic and Applied Sciences",
        "preference": "Physics",
    },
    {
        "course_name": "Engineering Mechanics 2",
        "difficulty": "Hard",
        "department": "Basic and Applied Sciences",
        "preference": "Physics",
    },
    # CSE
    {
        "course_name": "Introduction to Computer Engineering",
        "difficulty": "Easy",
        "department": "CSE",
        "preference": "Hardware/Software",
    },
    {
        "course_name": "Computer Programming (C/C++)",
        "difficulty": "Medium",
        "department": "CSE",
        "preference": "Programming",
    },
    {
        "course_name": "Object-Oriented Programming",
        "difficulty": "Medium",
        "department": "CSE",
        "preference": "Programming",
    },
    {
        "course_name": "Data Structures and Algorithms",
        "difficulty": "Hard",
        "department": "CSE",
        "preference": "Programming",
    },
    {
        "course_name": "Artificial Intelligence",
        "difficulty": "Hard",
        "department": "CSE",
        "preference": "AI",
    },
    # EE
    {
        "course_name": "Electrical Circuits 1",
        "difficulty": "Medium",
        "department": "EE",
        "preference": "Circuits",
    },
    {
        "course_name": "Electrical Circuits 2",
        "difficulty": "Hard",
        "department": "EE",
        "preference": "Circuits",
    },
    {
        "course_name": "Digital Electronics",
        "difficulty": "Medium",
        "department": "EE",
        "preference": "Electronics",
    },
    # ME
    {
        "course_name": "Engineering Thermodynamics",
        "difficulty": "Hard",
        "department": "ME",
        "preference": "Thermal",
    },
    {
        "course_name": "Fluid Mechanics",
        "difficulty": "Hard",
        "department": "ME",
        "preference": "Fluids",
    },
    {
        "course_name": "Machine Design 1",
        "difficulty": "Medium",
        "department": "ME",
        "preference": "Design",
    },
    # CE
    {
        "course_name": "Structural Analysis 1",
        "difficulty": "Medium",
        "department": "CE",
        "preference": "Structures",
    },
    {
        "course_name": "Surveying",
        "difficulty": "Medium",
        "department": "CE",
        "preference": "Field Work",
    },
    # PE
    {
        "course_name": "Production Engineering",
        "difficulty": "Medium",
        "department": "PE",
        "preference": "Manufacturing",
    },
    {
        "course_name": "Operations Research",
        "difficulty": "Hard",
        "department": "PE",
        "preference": "Optimization",
    },
    # Architecture
    {
        "course_name": "Architectural Design 1",
        "difficulty": "Hard",
        "department": "Architecture",
        "preference": "Design",
    },
    {
        "course_name": "History of Architecture",
        "difficulty": "Medium",
        "department": "Architecture",
        "preference": "History",
    },
    # Humanities
    {
        "course_name": "Technical Report Writing",
        "difficulty": "Easy",
        "department": "Humanities",
        "preference": "Soft Skills",
    },
    {
        "course_name": "Engineering Economy",
        "difficulty": "Medium",
        "department": "Humanities",
        "preference": "Management",
    },
]

# Rich topic dictionary for organic combinations
topics_by_dept = {
    "CSE": [
        "Software Engineering",
        "Machine Learning",
        "Data Mining",
        "Cloud Computing",
        "Cybersecurity",
        "Computer Networks",
        "Database Systems",
        "Operating Systems",
        "Human-Computer Interaction",
        "Computer Vision",
        "Natural Language Processing",
        "Robotics",
        "Cryptography",
        "Web Development",
        "Mobile App Development",
        "Compiler Design",
        "Quantum Computing",
        "Bioinformatics",
        "Internet of Things",
        "Game Development",
        "Virtual Reality",
        "Parallel Processing",
        "Big Data Analytics",
        "Software Testing",
        "Embedded Systems",
        "Information Retrieval",
        "Blockchain Technology",
        "Digital Logic",
        "Microprocessors",
        "Computer Architecture",
        "Algorithms",
        "Formal Languages",
        "Distributed Systems",
        "Network Security",
    ],
    "EE": [
        "Electronic Devices",
        "Signals and Systems",
        "Automatic Control",
        "Communication Theory",
        "Digital Signal Processing",
        "Electrical Power",
        "Electrical Machines",
        "Electromagnetic Fields",
        "Power Systems Protection",
        "High Voltage Engineering",
        "VLSI Design",
        "Antenna Theory",
        "Optical Communications",
        "Microwave Engineering",
        "Renewable Energy",
        "Smart Grids",
        "Biomedical Instrumentation",
        "Industrial Automation",
        "Power Electronics",
        "Radar Systems",
        "Satellite Communications",
        "Microelectronics",
        "Control Systems",
    ],
    "ME": [
        "Heat and Mass Transfer",
        "Theory of Machines",
        "Internal Combustion Engines",
        "Refrigeration and Air Conditioning",
        "Mechatronics",
        "Computational Fluid Dynamics",
        "Finite Element Analysis",
        "HVAC Systems",
        "Robotics and Automation",
        "Aerospace Engineering",
        "Automotive Engineering",
        "Acoustics",
        "Tribology",
        "Fracture Mechanics",
        "Nanotechnology",
        "Energy Conversion",
        "Turbomachinery",
        "Advanced Manufacturing",
        "Composite Materials",
        "Solid Mechanics",
        "Kinematics",
        "Dynamics",
        "CAD/CAM",
    ],
    "PE": [
        "Material Science",
        "Manufacturing Processes",
        "Quality Control",
        "Industrial Management",
        "Supply Chain Management",
        "Ergonomics",
        "Lean Manufacturing",
        "Computer Integrated Manufacturing",
        "Six Sigma",
        "Facilities Planning",
        "Reliability Engineering",
        "Industrial Robotics",
        "Systems Engineering",
        "Operations Management",
        "Project Management",
    ],
    "CE": [
        "Properties of Materials",
        "Soil Mechanics",
        "Foundation Engineering",
        "Reinforced Concrete Design",
        "Steel Structures",
        "Transportation Engineering",
        "Advanced Steel Design",
        "Highway Engineering",
        "Wastewater Management",
        "Earthquake Engineering",
        "Bridge Engineering",
        "Traffic Engineering",
        "Construction Management",
        "Hydrology",
        "Coastal Engineering",
        "Pavement Design",
        "Railway Engineering",
        "Environmental Impact",
        "GIS",
        "Tunnel Engineering",
        "Geotechnical Engineering",
    ],
    "Architecture": [
        "Building Construction",
        "Urban Planning",
        "Environmental Control",
        "Landscape Architecture",
        "Interior Design",
        "Sustainable Architecture",
        "Parametric Design",
        "Urban Sociology",
        "Architectural Acoustics",
        "Lighting Design",
        "Housing Development",
        "Historic Preservation",
        "Digital Fabrication",
        "Urban Design",
        "Building Information Modeling",
        "City Planning",
    ],
    "Basic and Applied Sciences": [
        "Numerical Analysis",
        "Probability",
        "Statistics",
        "Modern Physics",
        "Linear Algebra",
        "Discrete Mathematics",
        "Organic Chemistry",
        "Quantum Mechanics",
        "Biophysics",
        "Calculus of Variations",
        "Tensor Analysis",
        "Optics",
        "Abstract Algebra",
        "Topology",
        "Astrophysics",
        "Inorganic Chemistry",
        "Thermodynamics of Materials",
    ],
    "Humanities": [
        "Professional Ethics",
        "Human Rights",
        "Fundamentals of Management",
        "Organizational Behavior",
        "Macroeconomics",
        "Microeconomics",
        "Business Communication",
        "Entrepreneurship",
        "Industrial Psychology",
        "Engineering Law",
        "Public Speaking",
        "Sociology",
        "Philosophy of Science",
        "Technical Communication",
    ],
}

# Modifiers to create unique, realistic names without huge indexes
prefixes = [
    "",
    "Introduction to ",
    "Advanced ",
    "Applied ",
    "Principles of ",
    "Fundamentals of ",
    "Contemporary ",
    "Computational ",
    "Theoretical ",
    "Experimental ",
]
suffixes = ["", " 1", " 2", " 3"]

prefs = [
    "Theory",
    "Practical",
    "Programming",
    "Math",
    "Hardware",
    "Design",
    "Management",
    "Field Work",
    "Software",
    "Research",
]
difficulties = ["Easy", "Medium", "Hard"]
i = 0
generated_courses = []
used_names = set()

# Process core courses
for c in core_courses:
    c_name = c["course_name"]
    used_names.add(c_name)
    generated_courses.append(
        {
            "id": i,
            "course_name": c_name,
            "difficulty": c["difficulty"],
            "prerequisite": "None"
            if random.random() > 0.5  # noqa: PLR2004
            else f"Intro to {c['department']}",
            "preference": c["preference"],
            "year_of_study": random.randint(1, 2)
            if "1" in c_name
            else random.randint(2, 4),
            "department": c["department"],
        }
    )
    i += 1

# Procedurally generate the rest up to 400
while len(generated_courses) < OUTPUT_COURSES_COUNT:
    for dept, topics in topics_by_dept.items():
        if len(generated_courses) >= OUTPUT_COURSES_COUNT:
            break

        topic = random.choice(topics)
        prefix = random.choice(prefixes)
        suffix = random.choice(suffixes)

        # Avoid weird combinations like "Introduction to Machine Learning 3"
        if "Introduction" in prefix and suffix in [" 2", " 3"]:
            suffix = ""
        if "Advanced" in prefix and suffix == " 1":
            suffix = ""

        course_name = f"{prefix}{topic}{suffix}".strip()

        # Ensure exact uniqueness
        if course_name not in used_names:
            used_names.add(course_name)
            generated_courses.append(
                {
                    "id": i,
                    "course_name": course_name,
                    "difficulty": random.choice(difficulties),
                    "prerequisite": random.choice(
                        [
                            "None",
                            f"Intro to {dept}",
                            "Calculus",
                            "Physics",
                            "Programming 1",
                        ]
                    ),
                    "preference": random.choice(prefs),
                    "year_of_study": random.randint(1, 5),
                    "department": dept,
                }
            )
            i += 1

df_400 = pd.DataFrame(generated_courses)

# Save to CSV and Excel
df_400.to_csv("knowledge_base_400.csv", index=False)
try:
    df_400.to_excel("knowledge_base_400.xlsx", index=False)
except Exception:
    pass

print(f"Total unique rows generated: {len(df_400)}")
print("Sample names:")
print(df_400["course_name"].tail(15).tolist())
