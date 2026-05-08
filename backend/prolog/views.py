from django.http import HttpRequest, HttpResponse, HttpResponseNotAllowed


def recommend_view(request: HttpRequest) -> HttpResponse:
    if request.method == "POST":
        raise NotImplementedError("Prolog recommendation is not implemented yet.")
    else:
        return HttpResponseNotAllowed(["POST"])
