from pydantic import BaseModel,Field


class recommended_course_respond(BaseModel):
    course_name:str = Field(...,
    description="""The course name""",strict=True)
    
    department:str = Field(...,
    description="The department the course belongs to",strict=True)
    
    preference:str  = Field(...,
    description="""The course preference""",strict=True)
    
    year:str = Field(...,
    description="""The course year""",strict=True)
    
    difficulty:str = Field(...,
    description="""difficulty""",strict=True)
    
    id:str = Field(...,
                   description="""The augmentation between department & row index""")
    
    def to_dict(self):
        return {
            "course_name": self.course_name,
            "department": self.department,
            "preference": self.preference,
            "year": self.year,
            "difficulty": self.difficulty,
            "id": self.id,
        }
    
    
class recommended_course_request(BaseModel):
        student_major: str
        completed_courses: list[str]
        requested_courses: list[str]
        currentYear: int