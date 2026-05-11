from pydantic import BaseModel, Field


class Course(BaseModel):
    course_name: str = Field(description="The course name", strict=True)
    department: str = Field(
        description="The department the course belongs to", strict=True
    )
    preference: str = Field(description="The course preference", strict=True)
    year: str = Field(description="The course year", strict=True)
    difficulty: str = Field(description="difficulty", strict=True)
    id: str = Field(description="The augmentation between department & row index")


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
