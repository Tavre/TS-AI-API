# 视频生成

提交视频生成请求，返回任务 ID。**异步处理**，需轮询 [任务状态查询](task-status.md) 获取结果。

## 请求

```
POST /v1/index.php?endpoint=video_generation
Content-Type: application/json
x-api-key: sk-xxxxxxxxxxxx
```

### 请求体示例

```json
{
  "prompt": "1girl, dancing, high quality",
  "image": "https://example.com/input.jpg",
  "seed": -1
}
```

### 参数说明

| 参数      | 类型   | 必填 | 默认值 | 说明                   |
| --------- | ------ | :--: | ------ | ---------------------- |
| `prompt`  | string | 是   | --     | 提示词                 |
| `image`   | string | 是   | --     | 输入图片 URL 或 Base64 |
| `seed`    | int    | 否   | `-1`   | 随机种子               |

## 响应

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "status": "queued",
    "message": "Video generation queued.",
    "check_status": "?endpoint=task_status&task_id=a1b2c3d4-..."
  },
  "error": null
}
```

> [!IMPORTANT]
> `data.id` 是后续轮询所需的 `task_id`。
