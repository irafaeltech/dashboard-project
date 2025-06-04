import json
from datetime import datetime

def calculate_message_stats():
    """
    Calculate message statistics and return JSON formatted data
    """
    stats = {
        "total_messages": 0,
        "platforms": {
            "teams": {"messages": 0, "active_users": 0},
            "zoom": {"messages": 0, "active_users": 0},
            "meet": {"messages": 0, "active_users": 0}
        },
        "timestamp": datetime.now().isoformat()
    }
    
    # Simulate some calculations
    for platform in stats["platforms"]:
        stats["platforms"][platform]["messages"] = len(platform) * 10
        stats["platforms"][platform]["active_users"] = len(platform) * 2
        stats["total_messages"] += stats["platforms"][platform]["messages"]
    
    return json.dumps(stats, indent=2)

def main():
    try:
        result = calculate_message_stats()
        print(result)
        return 0
    except Exception as e:
        print(f"Error: {str(e)}")
        return 1

if __name__ == "__main__":
    main()