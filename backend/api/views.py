import logging

from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .ai import recommend_courses as ai_recommend_courses
from .prolog.queries import recommend_courses as prolog_recommend_courses
from .schemas import RecommendCoursesRequest

logger = logging.getLogger(__name__)


@csrf_exempt
def ai_recommend_view(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        request_data = RecommendCoursesRequest.model_validate_json(request.body)

        logger.info("AI recommendation request: %s", request_data)

        response = ai_recommend_courses(request_data)

        logger.info("AI recommendation response: %s", response)

        return JsonResponse(response.model_dump())
    else:
        return HttpResponseNotAllowed(["POST"])


@csrf_exempt
def prolog_recommend_view(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        try:
            request_data = RecommendCoursesRequest.model_validate_json(request.body)

            logger.info("Prolog recommendation request: %s", request_data)

            response = prolog_recommend_courses(request_data)

            logger.info("Prolog recommendation response: %s", response)

            return JsonResponse(
                {
                    key: [course.model_dump() for course in response[key]]
                    for key in response
                }
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return HttpResponseNotAllowed(["POST"])
