from pydantic import BaseModel, Field
from typing import Optional


class AIRequest(BaseModel):
    name: Optional[str] = Field(
        None,
        max_length=30,
        description="The User name, Use it when talking and recommending.",
    )
    profession: str = Field(
        ...,
        max_length=20,
        strict=True,
        description="This is the profession "
        "of the user like enginnering or medical professions.",
    )
    prerequisits: list[str] = Field(
        ...,
        description="Those are the courses that the user "
        "completed through out their academic years.",
    )
    queries: list[str] = Field(
        ..., description="The queries the user are going to ask the model about."
    )
    year: int = Field(..., description="The academic year that the user is in.")

    class Config:
        str_strip_whitespace = True
        validate_default = True


class AIRespond(BaseModel):
    reasoning: str = Field(
        ...,
        description="The reasoning that "
        "the ai model will say to reason why did he make such choices"
        "This does contain any reasoning thinking about the output.",
    )
    recommened_courses: list[str] = Field(
        ...,
        description="The course that the ai will recommend from the csv tool"
        "and the ai needs to make extra thinking to optimize the output.",
    )
