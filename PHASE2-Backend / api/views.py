from pydoc import doc
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import json
import traceback
from groq import Groq

from .simple_account_checker import check_credentials, find_user_by_email
from .simple_account_creator import create_account

# Groq client
client = Groq(api_key=os.environ.get("GROQ_API_KEY", "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"))

def hello(request):
    return JsonResponse({"message": "Hello World"})


@csrf_exempt
def login(request, user_identifier):
    """
    Handles:
      POST /com.gamestart/v1/home/userauthentication/login/~email~password
    """
    parts = [p for p in user_identifier.split("~") if p]

    if len(parts) != 2:
        return JsonResponse(
            {"error": "bad format, expected '~email~password' or 'email~password'"},
            status=400,
        )

    email, password = parts
    print(f"Login attempt -> email={email}, password={password}")

    try:
        authenticated = check_credentials(email, password)
        if authenticated:
            print(f"User {email} authenticated successfully.")
            # 🔹 get full user doc so we can return names
            doc = find_user_by_email(email)
            first = decrypt(doc.get("FirstName")) if doc else ""
            last = decrypt(doc.get("LastName")) if doc else ""
        else:
            print(f"Authentication failed for user {email}.")
            first = ""
            last = ""
    except Exception as e:
        import traceback
        return JsonResponse({
            "error": "checker error", 
            "details": str(e),
            "traceback": traceback.format_exc()
        }, status=500)

    return JsonResponse(
        {
            "email": email,
            "authenticated": bool(authenticated),
            "first": first,
            "last": last,
        }
    )
# test

@csrf_exempt
def register(request, user_info):
    """
    Handles:
      POST /com.gamestart/v1/home/userauthentication/register/~first~last~email~password
    """
    print(f"Raw user_info from URL: {user_info}")
    parts = [p for p in user_info.split("~") if p]

    if len(parts) != 4:
        return JsonResponse(
            {
                "error": (
                    "bad format, expected '~first~last~email~password' "
                    "or 'first~last~email~password'"
                )
            },
            status=400,
        )

    first, last, email, password = parts
    print(f"Register attempt -> {first} {last}, email={email}")

    try:
        result = create_account(first, last, email, password)
    except Exception as e:
        return JsonResponse(
            {"created": False, "error": f"creator error: {str(e)}"}, status=500
        )

    if not result.get("created"):
        # e.g. {"created": False, "error": "Email already exists"}
        return JsonResponse({"created": False, "error": result.get("error")}, status=400)

    return JsonResponse(
        {
            "created": True,
            "email": email,
            "first": first,
            "last": last,
        }
    )

@csrf_exempt
def aichat_recommendation(request):
    """
    AI chat recommendations using Groq API
    POST /com.gamestart/v1/ai/recommendation
    
    Expected JSON body:
    {
        "query": "user question or prompt",
        "model": "llama-3.3-70b-versatile" (optional, defaults to llama-3.3-70b-versatile)
    }
    """
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)
    
    try:
        body = json.loads(request.body)
        query = body.get("query")
        model = body.get("model", "llama-3.3-70b-versatile")
        
        if not query:
            return JsonResponse({"error": "Query parameter is required"}, status=400)
        
        print(f"Processing Groq AI query: {query}")
        
        # Call Groq API
        message = client.chat.completions.create(
            model=model,
            max_tokens=1024,
            messages=[
                {"role": "user", "content": query}
            ]
        )
        
        response_text = message.choices[0].message.content
        
        return JsonResponse({
            "success": True,
            "query": query,
            "response": response_text,
            "model": model
        })
        
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON in request body"}, status=400)
    except Exception as e:
        return JsonResponse({
            "error": "Failed to process Groq request",
            "details": str(e),
            "traceback": traceback.format_exc()
        }, status=500)


@csrf_exempt
def list_groq_models(request):
    """
    Lists all available Groq models
    GET /com.gamestart/v1/ai/models
    """
    try:
        models = client.models.list()
        model_list = [{"id": model.id, "name": model.name if hasattr(model, 'name') else model.id} 
                      for model in models.data]
        return JsonResponse({
            "success": True,
            "models": model_list
        })
    except Exception as e:
        return JsonResponse({
            "error": "Failed to list models",
            "details": str(e)
        }, status=500)
