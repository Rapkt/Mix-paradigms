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
    reasoning: str = Field(description="The reasoning behind why you choose those courses,make it brief")
