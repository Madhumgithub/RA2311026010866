# Stage 1 - Notification System Design

## Priority Logic
Notifications are prioritized using:
- Type weight:
  - Placement = 3
  - Result = 2
  - Event = 1
- Recency (latest timestamp)

Priority Score = weight * large_number + timestamp

## Sorting
All notifications are sorted in descending order of priority.

## Top N Selection
Top 10 notifications are selected using slicing after sorting.

## Efficient Approach
To optimize:
- Use Min Heap of size 10
- Keeps only top notifications
- Time Complexity: O(n log k)

## Logging
Logging middleware is used to track:
- API calls
- Errors
- Processing steps
