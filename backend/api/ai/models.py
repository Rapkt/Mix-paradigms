from pydantic import BaseModel, Field


# NOTE: if we decide to have users and store user information in a database,
# we can remove the department and academic year from the request and context,
# and only store the user id and then get the information from the database.


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


class RecommendCoursesRequest(BaseModel):
    department: str = Field(
        max_length=20,
        strict=True,
        description="The department of the user like Computer Science or Electric Engineering.",
    )
    academic_year: int = Field(description="The academic year that the user is in.")
    completed_courses: list[str] = Field(
        description="The courses that the user completed through out their academic years.",
    )
    interests: list[str] = Field(
        description="The interests of the user that can help the ai model to recommend courses that are more relevant to the user's interests.",
    )

    class Config:
        str_strip_whitespace = True
        validate_default = True


class RecommendCoursesResponse(BaseModel):
    reasoning: str = Field(
        description="The reasoning that "
        "the ai model will say to reason why did he make such choices"
        "This does contain any reasoning thinking about the output.",
    )
    recommened_courses: list[str] = Field(
        description="The course that the ai will recommend from the csv tool"
        "and the ai needs to make extra thinking to optimize the output.",
    )
