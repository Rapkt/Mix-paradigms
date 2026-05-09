from pydantic import BaseModel,Field


class recommended_courses(BaseModel):
    course_name:str = Field(...,
    description="""The course name""",strict=True)
    preference:str  = Field(...,
    description="""The course preference""",strict=True)
    year:str = Field(...,
    description="""The course year""",strict=True)
    difficulty:str = Field(...,
    description="""difficulty""",strict=True)
    id:str = Field(...,
                    description="""The augmentation between department & row index""", )