from pydantic import BaseModel, Field


class RecommendCoursesContext(BaseModel):
    department: str = Field(
        max_length=20,
        strict=True,
        description="The department of the user like Computer Science or Electric Engineering.",
    )
    academic_year: int = Field(description="The academic year that the user is in.")
    completed_courses: list[str] = Field(
        description="The courses that the user completed through out their academic years.",
    )
