from datetime import datetime
from typing import List, Dict, Any
from pydantic import BaseModel

class AlertSchema(BaseModel):
    id: int
    alert_type: str
    title: str
    message: str
    severity: str
    affected_assets: List[str]
    payload: Dict[str, Any] = {}
    sent_telegram: bool
    sent_web: bool
    is_read: bool
    created_at: datetime

class AlertListResponse(BaseModel):
    total: int
    unread_count: int
    alerts: List[AlertSchema]
