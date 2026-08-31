from fastapi import APIRouter
from app.services.seed_data import SEED_REPORTS

router = APIRouter()

@router.get("/daily")
async def get_daily_brief():
    """
    Returns automated Morning Macro Fundamental Brief.
    """
    return SEED_REPORTS["daily_brief"]

@router.get("/weekly")
async def get_weekly_report():
    """
    Returns automated Weekly Macro Intelligence Report.
    """
    return SEED_REPORTS["weekly_report"]
