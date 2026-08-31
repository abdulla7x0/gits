from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.schemas.calendar import CalendarListResponse, CalendarEventSchema
from app.providers.calendar_provider import EconomicCalendarProvider

router = APIRouter()
provider = EconomicCalendarProvider()

@router.get("", response_model=CalendarListResponse)
async def get_calendar(
    impact: Optional[str] = Query(None, description="Filter by impact: LOW, MEDIUM, HIGH, VERY HIGH"),
    status: Optional[str] = Query(None, description="Filter by status: all, upcoming, completed"),
    search: Optional[str] = Query(None, description="Search event title or category")
):
    """
    Returns live economic calendar releases with real actuals, forecasts, surprises, and transmission effects.
    """
    events = await provider.fetch_data()

    if impact and impact.lower() != "all":
        events = [e for e in events if e.get("impact_level", "").lower() == impact.lower()]

    if status == "upcoming":
        events = [e for e in events if not e.get("is_completed")]
    elif status == "completed":
        events = [e for e in events if e.get("is_completed")]

    if search:
        s = search.lower()
        events = [
            e for e in events
            if s in e.get("title", "").lower() or s in e.get("category", "").lower()
        ]

    upcoming_count = sum(1 for e in events if not e.get("is_completed"))
    completed_count = sum(1 for e in events if e.get("is_completed"))

    return CalendarListResponse(
        total=len(events),
        upcoming_count=upcoming_count,
        completed_count=completed_count,
        events=[CalendarEventSchema(**e) for e in events]
    )

@router.get("/{event_id}", response_model=CalendarEventSchema)
async def get_calendar_event(event_id: int):
    events = await provider.fetch_data()
    event = next((e for e in events if e["id"] == event_id), None)
    if not event:
        raise HTTPException(status_code=404, detail="Economic event not found")
    return CalendarEventSchema(**event)
