# 图像生成

提交图像生成请求，返回任务 ID。**异步处理**，需轮询 [任务状态查询](task-status.md) 获取结果。

## 请求

```
POST /v1/index.php?endpoint=image_generation
Content-Type: application/json
x-api-key: sk-xxxxxxxxxxxx
```

### 请求体示例

```json
{
  "prompt": "1girl, white hair, blue eyes, starry sky, masterpiece",
  "negative_prompt": "lowres, bad quality, watermark",
  "width": 768,
  "height": 1024,
  "steps": 20,
  "workflow": "rr3",
  "seed": -1,
  "cfg": 6
}
```

### 参数说明

| 参数              | 类型          | 必填 | 默认值     | 说明                                                |
| ----------------- | ------------- | :--: | ---------- | --------------------------------------------------- |
| `prompt`          | string/object | 是   | --         | 正向提示词（字符串）或完整 ComfyUI workflow（对象） |
| `negative_prompt` | string        | 否   | *内置*     | 反向提示词                                          |
| `width`           | int           | 否   | `512`      | 图像宽度，最大 `2048`                               |
| `height`          | int           | 否   | `512`      | 图像高度，最大 `2048`                               |
| `steps`           | int           | 否   | `20`       | 采样步数，最大 `50`                                 |
| `workflow`        | string        | 否   | `default`  | 工作流选择，见 [工作流详解](workflows.md)           |
| `seed`            | int           | 否   | `-1`       | 随机种子，`-1` 为随机                               |
| `cfg`             | float         | 否   | `6` / `7`  | CFG Scale（仅 `rr3` / `anime` 有效）                |
| `model`           | string        | 否   | *按工作流* | 模型路径（仅 `default` / `anime` 有效）             |

## 响应

### ComfyUI 工作流（`default` / `anime` / `z-image`）

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "status": "queued",
    "message": "Request queued. Webhook support coming soon."
  },
  "error": null
}
```

### RR3 工作流（`rr3`）

```json
{
  "success": true,
  "data": {
    "id": "1234567890",
    "provider": "rr3",
    "status": "queued",
    "check_status": "?endpoint=task_status&task_id=1234567890"
  },
  "error": null
}
```

> [!IMPORTANT]
> 无论哪种工作流，`data.id` 都是后续轮询所需的 `task_id`。
