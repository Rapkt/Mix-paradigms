from langchain.tools import ToolRuntime, tool
import pandas as pd
from os import environ

from api.ai.models import RecommendCoursesContext

courses_csv_path = environ.get("COURSES_CSV_PATH")
if courses_csv_path is None:
    raise ValueError("COURSES_CSV_PATH environment variable is not set.")

course_df = pd.read_csv(courses_csv_path)


@tool
def get_available_courses(runtime: ToolRuntime[RecommendCoursesContext]) -> list[str]:
    """
    This tool is used to get the available courses for a specific department and academic year.
    The tool will return a list of courses that are available for the user to take based on their department, and completed courses.
    """

    department = runtime.context.department  # noqa: F841
    completed_courses = runtime.context.completed_courses  # noqa: F841

    raise NotImplementedError("Getting available courses is not implemented yet.")
