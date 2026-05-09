from .tools.get_available_courses import get_available_courses
from .agent import initialize_agent
from .models import (
    RecommendCoursesContext,
    RecommendCoursesRequest,
    RecommendCoursesResponse,
)


def recommend_courses(request: RecommendCoursesRequest) -> RecommendCoursesResponse:
    context = RecommendCoursesContext(
        department=request.department,
        academic_year=request.academic_year,
        completed_courses=request.completed_courses,
    )

    agent = initialize_agent(tools=[get_available_courses])

    response = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": f"Recommend courses I should take based on my following interests: {request.interests}",
                }
            ]
        },
        context=context,
    )

    print(response)

    return response["structured_response"]
