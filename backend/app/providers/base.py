from abc import ABC, abstractmethod
from typing import Any, Dict, List

class BaseProvider(ABC):
    """Abstract base class for all fundamental data providers."""
    
    @abstractmethod
    async def fetch_data(self) -> List[Dict[str, Any]]:
        """Fetch raw data from provider."""
        pass
    
    @abstractmethod
    def validate_and_normalize(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Validate format and normalize into internal schema."""
        pass
