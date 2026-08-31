from typing import List, Dict, Any

class NewsDeduplicator:
    """
    Groups related news articles into clusters and aggregates multiple sources.
    Example: 3 sources reporting same Fed announcement.
    """
    @staticmethod
    def cluster_articles(articles: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        # In full implementation, performs cosine similarity or entity matching
        # In Phase 1, ensures cluster metadata is properly aggregated
        clusters: Dict[str, Dict[str, Any]] = {}
        for article in articles:
            cid = article.get("cluster_id") or f"cluster_{article['id']}"
            if cid not in clusters:
                clusters[cid] = {**article, "related_sources": [article.get("source", "Unknown")]}
            else:
                src = article.get("source", "Unknown")
                if src not in clusters[cid]["related_sources"]:
                    clusters[cid]["related_sources"].append(src)
                clusters[cid]["sources_count"] = len(clusters[cid]["related_sources"])
        return list(clusters.values())
