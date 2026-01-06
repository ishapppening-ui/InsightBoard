from ninja import Schema

class TranscriptPayload(Schema):
    transcript: str

class DeletePayload(Schema):
    id: int

class CreateTaskPayload(Schema):
    title : str
    assigned_to : str
    priority : str
    status : str