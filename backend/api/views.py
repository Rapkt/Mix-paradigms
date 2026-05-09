from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed,JsonResponse
from .prolog.models import recommended_course_request 
from .prolog.quaries import recomendCourses
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def ai_recommend_view(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        raise NotImplementedError("AI recommendation is not implemented yet.")
    else:
        return HttpResponseNotAllowed(["POST"])

@csrf_exempt
def prolog_recommend_view(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            formated_request  = recommended_course_request(student_major=data.get("student_major"),
                                                        completed_courses=data.get("completed_courses"),
                                                        requested_courses=data.get("requested_courses"),
                                                        currentYear=data.get("currentYear")
                                                            )
            
            prolog_recommendation = recomendCourses(formated_request)
            # makng the returned structure serializable
            for key in prolog_recommendation:
                prolog_recommendation[key] = [[course.to_dict() for course in prolog_recommendation[key]]]
            print(prolog_recommendation)
            return JsonResponse(prolog_recommendation)
        except Exception as e:
            return JsonResponse({"error":str(e)},status=400)
        
    else:
        return HttpResponseNotAllowed(["POST"])
