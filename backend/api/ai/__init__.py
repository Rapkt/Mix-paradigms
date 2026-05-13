import logging
from os import environ

import pandas as pd

from ..schemas import (
    Course,
    RecommendCoursesRequest,
)
from .agent import initialize_agent
from .schemas import (
    AIRecommendCoursesContext,
    AIRecommendCoursesResponse,
)
from .tools import get_available_courses

logger = logging.getLogger(__name__)

knowledge_base_csv_path = environ.get("KNOWLEDGE_BASE_CSV_PATH")
if knowledge_base_csv_path is None:
    raise ValueError("KNOWLEDGE_BASE_CSV_PATH environment variable is not set.")

courses_df = pd.read_csv(knowledge_base_csv_path)
courses_lookup = courses_df.set_index("course_name").to_dict(orient="index")


def map_course_name_to_course(course_name: str) -> Course:
    course_info = courses_lookup.get(course_name)

    try:
        if course_info:
            return Course(
                course_name=course_name,
                department=course_info["department"],
                preference=course_info["preference"],
                year=str(course_info["year_of_study"]),
                difficulty=course_info["difficulty"],
                id=str(course_info["id"]),
            )
    except Exception as e:
        logger.exception(
            "Error mapping course name '%s' to Course object: %s", course_name, e
        )

    return Course(
        course_name=course_name,
        department="",
        preference="",
        year="",
        difficulty="",
        id="",
    )


def map_course_names_to_courses(course_names: list[str]) -> list[Course]:
    return [map_course_name_to_course(course_name) for course_name in course_names]


def recommend_courses(request: RecommendCoursesRequest) -> AIRecommendCoursesResponse:
    context = AIRecommendCoursesContext(
        department=request.department,
        academic_year=request.academic_year,
        completed_courses=request.completed_courses,
    )

    agent = initialize_agent(tools=[get_available_courses])

    internal_response = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": f"Recommend courses I should take based on my following goals: {request.preferences}",
                }
            ]
        },
        context=context,
    )

    logger.debug("Agent internal response: %s", internal_response)

    response = AIRecommendCoursesResponse(
        reasoning=internal_response["structured_response"].reasoning,
        recommened_courses=map_course_names_to_courses(
            internal_response["structured_response"].recommened_courses
        ),
    )

    logger.debug("Agent response: %s", response)

    return response
