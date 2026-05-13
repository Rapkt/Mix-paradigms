from langchain.agents import create_agent
from langchain.agents.middleware import (
    ModelCallLimitMiddleware,
    ModelFallbackMiddleware,
    ToolRetryMiddleware,
)
from langchain.tools import BaseTool
from langchain_groq import ChatGroq

from .schemas import (
    AIRecommendCoursesContext,
    AIRecommendCoursesInternalResponse,
)

SYSTEM_PROMPT = """You are a smart study advisor that recommend courses to take.
            You must call the get_available_courses tool before recommending anything.
            After getting tool results, you must only recommend courses from that list.
            Make sure to provide clear reasoning for your choices.
            """


def initialize_agent(tools: list[BaseTool]):
    model = ChatGroq(
        model="qwen/qwen3-32b",
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
        response_format=AIRecommendCoursesInternalResponse,
        context_schema=AIRecommendCoursesContext,
    )

    return agent
