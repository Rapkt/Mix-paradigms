from pydantic import BaseModel, Field


# NOTE: if we decide to have users and store user information in a database,
# we can remove the department and academic year from the request and context,
# and only store the user id and then get the information from the database.


class RecommendCoursesRequest(BaseModel):
    department: str = Field(
        max_length=20,
        strict=True,
        description="The department of the user.",
    )
    academic_year: int = Field(description="The academic year that the user is in.")
    completed_courses: list[str] = Field(
        description="The courses that the user completed through out their academic years.",
    )
    preferences: list[str] = Field(
        description="The preferences of the user that can help to recommend courses that are more relevant to the user's interests.",
    )

    class Config:
        str_strip_whitespace = True
        validate_default = True


class RecommendCoursesResponse(BaseModel):
    recommened_courses: list[str] = Field(
        description="The recommended courses for the user based on the input information.",
    )
