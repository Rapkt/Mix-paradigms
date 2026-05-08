from dotenv import load_dotenv
from langchain.tools import tool
import pandas as pd
import os

load_dotenv()
dataframe = pd.read_csv(os.getenv("PATH_CSV"))


@tool
def lookp_course_logic(student_gpa: float, interests: list[str], year: int) -> str:
    """Look up suitable courses for the student based of GPA YEAR AND Interests"""
