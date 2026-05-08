from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed


def recommend_view(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        raise NotImplementedError("AI recommendation is not implemented yet.")
    else:
        return HttpResponseNotAllowed(["POST"])
