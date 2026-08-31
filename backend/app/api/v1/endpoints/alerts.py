from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.schemas.alert import AlertListResponse, AlertSchema
from app.services.seed_data import SEED_ALERTS

router = APIRouter()

@router.get("", response_model=AlertListResponse)
async def get_alerts():
    """
    Returns active market alerts with Telegram and Web dispatch status.
    """
    unread = sum(1 for a in SEED_ALERTS if not a.get("is_read"))
    return AlertListResponse(
        total=len(SEED_ALERTS),
        unread_count=unread,
        alerts=[AlertSchema(**a) for a in SEED_ALERTS]
    )

@router.post("/mark-read/{alert_id}")
async def mark_alert_read(alert_id: int):
    alert = next((a for a in SEED_ALERTS if a["id"] == alert_id), None)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert["is_read"] = True
    return {"status": "success", "alert_id": alert_id, "is_read": True}

@router.post("/preview-telegram")
async def preview_telegram_alert(payload: Dict[str, Any]):
    """
    Generates Telegram formatted markdown message for previewing dispatch.
    """
    event = payload.get("event", "Macro Event")
    usd = payload.get("usd", "Neutral")
    xau = payload.get("xauusd", "Neutral")
    btc = payload.get("btcusd", "Neutral")
    reason = payload.get("reason", "Macro release")
    conf = payload.get("confidence", 80)
    
    formatted_msg = (
        f"🚨 <b>HIGH IMPACT MACRO ALERT</b>\n\n"
        f"<b>Event:</b> {event}\n\n"
        f"<b>USD:</b> {usd}\n"
        f"<b>XAUUSD:</b> {xau}\n"
        f"<b>BTCUSD:</b> {btc}\n\n"
        f"<b>Transmission Mechanism:</b>\n{reason}\n\n"
        f"<b>Confidence:</b> {conf}/100\n\n"
        f"🌐 <a href='http://localhost:3000'>Open Fundamental Intelligence</a>"
    )
    return {"formatted_telegram_html": formatted_msg, "status": "simulated"}
