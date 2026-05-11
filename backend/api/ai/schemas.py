from pydantic import BaseModel, Field


class AIRecommendCoursesContext(BaseModel):
    department: str = Field(
        max_length=20,
        strict=True,
        description="The department of the user like Computer Science or Electric Engineering.",
    )
    academic_year: int = Field(description="The academic year that the user is in.")
    completed_courses: list[str] = Field(
        description="The courses that the user completed through out their academic years.",
    )


class AIRecommendCoursesResponse(BaseModel):
    reasoning: str = Field(
        description="The reasoning on why these recommended courses were choosen."
    )
    recommened_courses: list[str] = Field(
        description="The recommended courses for the user based on the input information.",
    )
