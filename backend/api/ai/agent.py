from langchain.agents import create_agent
from langchain.agents.middleware import (
    ModelCallLimitMiddleware,
    ModelFallbackMiddleware,
    ToolRetryMiddleware,
)
from langchain.tools import BaseTool
from langchain_groq import ChatGroq

from api.ai.tools.get_available_courses import get_available_courses

from .models import (
    RecommendCoursesContext,
    RecommendCoursesRequest,
    RecommendCoursesResponse,
)

SYSTEM_PROMPT = """You are a smart study advisor.
            You MUST call the lookup_course_logic tool before recommending anything.
            After getting tool results, explain your reasoning clearly and 
            list the specific course IDs you recommend and why.
            """


def initialize_agent(tools: list[BaseTool]):
    model = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0.5,
    )

    fallback_model = ChatGroq(
        model="llama-3.1-8b-instant",
        temperature=0.5,
    )

    middleware = [
        ModelFallbackMiddleware(first_model=fallback_model),
        ModelCallLimitMiddleware(run_limit=5),
        ToolRetryMiddleware(max_retries=3),
    ]

    agent = create_agent(
        model=model,
        tools=tools,
        system_prompt=SYSTEM_PROMPT,
        middleware=middleware,
        response_format=RecommendCoursesResponse,
        context_schema=RecommendCoursesContext,
    )

    return agent


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

    return response["structured_response"]
