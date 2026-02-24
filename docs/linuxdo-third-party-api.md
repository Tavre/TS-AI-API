# 第三方开发者 API 文档（Linux DO 版）

本页面向第三方开发者调用 Linux DO 版 API。

## 基础信息

- Base URL: `https://linuxapi.tavr.top/v1/index.php`
- 鉴权方式：`x-api-key`（推荐）或 `Authorization: Bearer <api_key>`
- 返回格式：JSON

## 鉴权示例

```bash
curl -X GET "https://linuxapi.tavr.top/v1/index.php?endpoint=user_balance" \
  -H "x-api-key: sk_your_api_key"
```

## 1) 查询余额

```http
GET /v1/index.php?endpoint=user_balance
```

示例：

```bash
curl -X GET "https://linuxapi.tavr.top/v1/index.php?endpoint=user_balance" \
  -H "x-api-key: sk_your_api_key"
```

## 2) 图片生成

```http
POST /v1/index.php?endpoint=image_generation
```

示例：

```bash
curl -X POST "https://linuxapi.tavr.top/v1/index.php?endpoint=image_generation" \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_your_api_key" \
  -d '{
    "prompt": "a cinematic portrait, ultra detailed",
    "settings": {
      "workflow": "default",
      "width": 1024,
      "height": 1024,
      "steps": 20
    }
  }'
```

## 3) 视频生成

```http
POST /v1/index.php?endpoint=video_generation
```

示例：

```bash
curl -X POST "https://linuxapi.tavr.top/v1/index.php?endpoint=video_generation" \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_your_api_key" \
  -d '{
    "prompt": "a girl walking in neon city",
    "settings": {
      "workflow": "wan-t2v",
      "width": 832,
      "height": 480
    }
  }'
```

## 4) 图片编辑

```http
POST /v1/index.php?endpoint=image_editing
```

示例：

```bash
curl -X POST "https://linuxapi.tavr.top/v1/index.php?endpoint=image_editing" \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_your_api_key" \
  -d '{
    "prompt": "add cinematic lighting",
    "settings": {
      "workflow": "flux-edit"
    }
  }'
```

## 5) 任务状态查询

```http
GET /v1/index.php?endpoint=task_status&task_id=YOUR_TASK_ID
```

示例：

```bash
curl -X GET "https://linuxapi.tavr.top/v1/index.php?endpoint=task_status&task_id=YOUR_TASK_ID" \
  -H "x-api-key: sk_your_api_key"
```

## 计费说明（Linux DO 版）

- 充值货币：LDC
- 汇率：`1 LDC = 20 积分`
- 具体扣费请以工作流实时配置为准

## 错误排查建议

- `401/403`：检查 API Key 是否有效
- `insufficient credits`：余额不足，先充值
- `invalid endpoint`：检查 `endpoint` 参数拼写

