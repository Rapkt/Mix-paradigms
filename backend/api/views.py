from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .ai import recommend_courses as ai_recommend_courses
from .prolog.queries import recommend_courses as prolog_recommend_courses
from .schemas import RecommendCoursesRequest


@csrf_exempt
def ai_recommend_view(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        response = ai_recommend_courses(
            RecommendCoursesRequest.model_validate_json(request.body)
        )

        return JsonResponse(response.model_dump())
    else:
        return HttpResponseNotAllowed(["POST"])


@csrf_exempt
def prolog_recommend_view(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        try:
            response = prolog_recommend_courses(
                RecommendCoursesRequest.model_validate_json(request.body)
            )

            print(response)
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
