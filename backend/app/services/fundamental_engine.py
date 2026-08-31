from typing import Dict, Any, List

class FundamentalEngine:
    """
    Macro Transmission and Scoring Engine.
    Evaluates multi-variable fundamental indicators:
    Data + Surprise + Market Reaction + Macro Context
    """

    @staticmethod
    def classify_score(score: int) -> str:
        if score >= 70:
            return "STRONG BULLISH"
        elif score >= 30:
            return "BULLISH"
        elif score > -30:
            return "NEUTRAL"
        elif score > -70:
            return "BEARISH"
        else:
            return "STRONG BEARISH"

    @staticmethod
    def calculate_surprise(actual: float, forecast: float, tolerance: float = 0.05) -> Dict[str, str]:
        diff = actual - forecast
        if abs(diff) <= tolerance:
            return {
                "diff": f"{diff:+.2f}",
                "classification": "In Line"
            }
        elif diff > 2 * tolerance:
            return {
                "diff": f"{diff:+.2f}",
                "classification": "Much Better Than Expected"
            }
        elif diff > 0:
            return {
                "diff": f"{diff:+.2f}",
                "classification": "Better Than Expected"
            }
        elif diff < -2 * tolerance:
            return {
                "diff": f"{diff:+.2f}",
                "classification": "Much Worse Than Expected"
            }
        else:
            return {
                "diff": f"{diff:+.2f}",
                "classification": "Worse Than Expected"
            }

    @staticmethod
    def get_macro_transmission_rules() -> List[Dict[str, Any]]:
        return [
            {
                "trigger": "Inflation (CPI/PCE) Surprises Hot ↑",
                "transmission_steps": [
                    "Inflationary pressure remains persistent",
                    "Federal Reserve rate-cut expectations diminish",
                    "US Treasury yields (US02Y / US10Y) rise",
                    "USD / DXY attracts yield-differential demand",
                    "Opportunity cost of holding non-yielding Gold increases",
                    "EURUSD faces downward pressure from widening interest rate spread",
                    "Risk asset liquidity tightens, pressuring Bitcoin"
                ],
                "usd_effect": "Bullish (+60 to +85)",
                "xauusd_effect": "Bearish (-45 to -75)",
                "btcusd_effect": "Potentially Pressured (-20 to -50)",
                "eurusd_effect": "Bearish (-40 to -70)",
                "status": "Active Transmission"
            },
            {
                "trigger": "Tariff / Trade Policy Escalation (Trump Statements)",
                "transmission_steps": [
                    "Uncertainty around global supply chains increases",
                    "Safe-haven demand for physical Gold surges",
                    "Exporting economies (Eurozone) face trade friction",
                    "Import tariff inflationary friction enters Fed calculations",
                    "Cross-border risk-off sentiment affects speculative assets"
                ],
                "usd_effect": "Mixed / Volatile",
                "xauusd_effect": "Potentially Supportive (+50 to +80)",
                "btcusd_effect": "Mixed / High Volatility (-15 to +35)",
                "eurusd_effect": "Bearish / Dragged by export headwinds (-30 to -60)",
                "status": "Active Transmission"
            },
            {
                "trigger": "Labor Market Cooling / Fed Easing Probability ↑",
                "transmission_steps": [
                    "Fed dual mandate shifts priority to maximum employment",
                    "Probability of monetary easing / rate cuts accelerates",
                    "Real yields drop, lowering carry cost for Gold",
                    "Global liquidity expansion prospects support crypto assets",
                    "USD yields compress against European Bund yields, supporting EURUSD"
                ],
                "usd_effect": "Bearish (-40 to -70)",
                "xauusd_effect": "Bullish (+45 to +80)",
                "btcusd_effect": "Potentially Supportive (+30 to +65)",
                "eurusd_effect": "Bullish (+35 to +65)",
                "status": "Probabilistic"
            }
        ]
