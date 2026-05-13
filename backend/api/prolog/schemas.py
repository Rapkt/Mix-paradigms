from pydantic import BaseModel, Field

from ..schemas import Course


class PrologRecommendCoursesResponse(BaseModel):
    prefered: list[Course] = Field(
        description="Courses that are recommended based on the student's preferences"
    )
    not_prefered_easy: list[Course] = Field(
        description="Courses that are not preferred but are easy."
    )
    not_prefered_med: list[Course] = Field(
        description="Courses that are not preferred but are of medium difficulty."
    )
    not_prefered_hard: list[Course] = Field(
        description="Courses that are not preferred but are hard."
    )
