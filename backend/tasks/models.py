from django.db import models

class Tasks(models.Model):
    title = models.TextField()
    assigned_to = models.TextField()
    priority = models.TextField()
    status = models.TextField()
