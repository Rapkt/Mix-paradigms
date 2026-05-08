from langchain_groq import ChatGroq
from langchain.agents import create_agent
from langchain.agents.middleware import (
    SummarizationMiddleware,
    ModelFallbackMiddleware,
    ToolRetryMiddleware,
    ModelCallLimitMiddleware,
)
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv
from langchain_core.tools import Tool
from .models import *
import os

SUMMARIZER_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """Extract ONLY:
    - Recommended course IDs and names
    - One sentence per course explaining why
    - Overall reasoning in 2 sentences max
    Do not add anything new.""",
        ),
        ("human", "{agent_output}"),
    ]
)


def initialize_model(tools: list[Tool]):
    load_dotenv()
    agent_prompt = ChatPromptTemplate(
        SystemMessage("""You are a smart study advisor.
            You MUST call the lookup_course_logic tool before recommending anything.
            After getting tool results, explain your reasoning clearly and 
            list the specific course IDs you recommend and why.
            """),
        HumanMessage("{input}"),
        ("placeholder", "{agent_scratchpad}"),
        ("placeholder", "{chat_history}"),
    )
    agent = create_agent(
        model=ChatGroq(
            model="llama-3.3-70b-versatile",
            api_key=os.getenv("GROQ_API_KEY"),
            temperature=0.5,
        ),
        tools=tools,
        system_prompt=agent_prompt,
        middleware=[
            SummarizationMiddleware(
                model=ChatGroq(
                    model="llama-3.3-70b-versatile",
                    api_key=os.getenv("GROQ_API_KEY"),
                    temperature=0.0,
                ),
                summary_prompt=SUMMARIZER_PROMPT,
                trigger=("tokens", 4000),
                keep=("messages", 5),
            ),
            ModelFallbackMiddleware(
                first_model=ChatGroq(
                    model="llama-3.1-8b-instant",
                    api_key=os.getenv("GROQ_API_KEY"),
                    temperature=0.5,
                )
            ),
            ToolRetryMiddleware(
                max_retries=3
                ),
            ModelCallLimitMiddleware(
                    max_calls=5
                    )
            ,
        ],
        response_format=AIRespond,
    )
    return agent
