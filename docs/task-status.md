# 任务状态查询

轮询生成任务的状态，完成后返回图片 URL。

## 请求

```
GET /v1/index.php?endpoint=task_status&task_id=<TASK_ID>
x-api-key: sk-xxxxxxxxxxxx
```

| 参数      | 来源  | 必填 | 说明                                   |
| --------- | ----- | :--: | -------------------------------------- |
| `task_id` | query | 是   | 从 `image_generation` 返回的 `id` 字段 |

> [!NOTE]
> **提供者自动检测**：系统通过 task_id 格式自动区分 ComfyUI（UUID 格式）和 RR3（纯数字）。

## 响应示例

### 处理中

```json
{
  "success": true,
  "data": {
    "id": "1234567890",
    "status": "processing",
    "created_at": null,
    "result": null,
    "progress": 45
  },
  "error": null
}
```

### 已完成

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "status": "completed",
    "created_at": null,
    "result": {
      "image_url": "https://api.tavr.top/TS-AI-API/uploads/comfy_TSAI_API_00001_.png"
    }
  },
  "error": null
}
```

### 失败

```json
{
  "success": true,
  "data": {
    "id": "1234567890",
    "status": "failed",
    "error": "Task processing failed or timed out",
    "result": null
  },
  "error": null
}
```

## 状态枚举

| Status       | 说明                             |
| ------------ | -------------------------------- |
| `pending`    | 任务已提交，等待处理             |
| `processing` | 正在生成中                       |
| `completed`  | 生成完成，`result` 中含图片 URL  |
| `failed`     | 生成失败                         |

> [!TIP]
> **轮询建议**：每 **2~3 秒** 轮询一次。ComfyUI 任务通常需要 10~60 秒，RR3 任务通常需要 10~30 秒。
