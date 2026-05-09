from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed
from django.http.response import JsonResponse

from . import ai
from .ai.models import RecommendCoursesRequest


def ai_recommend_view(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        response = ai.recommend_courses(
            RecommendCoursesRequest.model_validate_json(request.body)
        )

        return JsonResponse(response.model_dump())
    else:
        return HttpResponseNotAllowed(["POST"])


def prolog_recommend_view(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        raise NotImplementedError("Prolog recommendation is not implemented yet.")
    else:
        return HttpResponseNotAllowed(["POST"])
