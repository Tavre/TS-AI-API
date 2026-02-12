# cURL 示例

## 查询余额

```bash
curl -s "https://api.tavr.top/TS-AI-API/v1/index.php?endpoint=user_balance" \
  -H "x-api-key: sk-your_api_key_here"
```

## 提交生成任务

```bash
curl -s -X POST \
  "https://api.tavr.top/TS-AI-API/v1/index.php?endpoint=image_generation" \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk-your_api_key_here" \
  -d '{
    "prompt": "1girl, cherry blossom, school uniform, blue sky, masterpiece",
    "width": 768,
    "height": 1024,
    "workflow": "rr3"
  }'
```

## 轮询任务状态

```bash
curl -s \
  "https://api.tavr.top/TS-AI-API/v1/index.php?endpoint=task_status&task_id=YOUR_TASK_ID" \
  -H "x-api-key: sk-your_api_key_here"
```

## 完整脚本

```bash
#!/bin/bash
API_KEY="sk-your_api_key_here"
BASE="https://api.tavr.top/TS-AI-API/v1/index.php"

# 1. 提交任务
TASK_ID=$(curl -s -X POST "$BASE?endpoint=image_generation" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "prompt": "1girl, cherry blossom, school uniform, blue sky, masterpiece",
    "width": 768,
    "height": 1024,
    "workflow": "rr3"
  }' | jq -r '.data.id')

echo "Task ID: $TASK_ID"

# 2. 轮询
while true; do
  RESULT=$(curl -s "$BASE?endpoint=task_status&task_id=$TASK_ID" \
    -H "x-api-key: $API_KEY")

  STATUS=$(echo $RESULT | jq -r '.data.status')
  echo "Status: $STATUS"

  if [ "$STATUS" = "completed" ]; then
    IMAGE_URL=$(echo $RESULT | jq -r '.data.result.image_url')
    echo "Image URL: $IMAGE_URL"
    break
  elif [ "$STATUS" = "failed" ]; then
    echo "Generation failed!"
    break
  fi

  sleep 3
done
```
