from ninja import NinjaAPI
import httpx
from .schemas import TranscriptPayload, DeletePayload, CreateTaskPayload
import json
from .models import Tasks


API_KEY = "sk_n9mdn9soSODRLKpT6kQPnKqb9RhcBa2C"

api = NinjaAPI()

@api.post("/create-tasks")
def create_tasks(request, payload: TranscriptPayload):
    transcript = payload.transcript

    # Prompt instructions
    prompt = f"""
You are an assistant that extracts actionable tasks from meeting transcripts.

Rules:
- Return ONLY valid JSON array
- Do NOT include explanations, markdown, or extra text
- Each task must contain:
  - title (string)
  - assigned_to (string, or "Unassigned")
  - priority ("low", "medium", or "high")
  - status ("todo", "in_progress", or "done")

Meeting transcript:
\"\"\"{transcript}\"\"\"
"""

    try:
        # Send POST request to Pollinations
        response = httpx.post(
            "https://gen.pollinations.ai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "nova-micro",
                "messages": [
                    {"role": "user", "content": prompt}
                ],
            },
            timeout=30
        )

        response.raise_for_status()
        result = response.json()


        raw_text = result["choices"][0]["message"]["content"]

        # Safely parse JSON
        try:
            tasks = json.loads(raw_text)
            for task in tasks:
                Tasks.objects.create(title = task["title"], assigned_to = task["assigned_to"], priority = task["priority"], status = task["status"])
        except json.JSONDecodeError:
            tasks = [{"error": "Failed to parse JSON from model", "raw_output": raw_text}]

        return {"tasks": tasks}

    except httpx.HTTPStatusError as e:
        return {"error": f"HTTP error: {e.response.status_code}", "details": e.response.text}
    except Exception as e:
        return {"error": str(e)}
    

@api.get("/get-tasks")
def get_tasks(request):
    tasks = list(Tasks.objects.all().values())
    return tasks

@api.delete("/delete-task")
def delete_task(request, payload: DeletePayload):
    Tasks.objects.get(id = payload.id).delete()
    return {"message" : "task deleted successfully"}


@api.post("/create-task")
def create_task(request, data: CreateTaskPayload):
    try:
        Tasks.objects.create(title = data.title, assigned_to = data.assigned_to, priority = data.priority, status = data.status)
        return {"message" : "created successfully"}
    except Exception as e:
        return {"message" : str(e)}


