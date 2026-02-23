# 视频生成

提交视频生成请求，返回任务 ID。**异步处理**，需轮询 [`task_status`](/task-status) 获取结果。

每次消耗 **200 积分**。

## 模式说明

支持两种生成模式：

| 模式  | 说明           | 必需参数      | 模型                        |
| ----- | -------------- | ------------- | --------------------------- |
| `i2v` | 图生视频（默认） | `image` + `prompt` | Wan2.2 AllInOne I2V |
| `t2v` | 文生视频       | `prompt`      | Wan2.2 AllInOne T2V          |

> [!TIP]
> 使用 Wan2.2 AllInOne 加速模型，4 步出图，速度更快。

## 请求

```
POST /v1/index.php?endpoint=video_generation
Content-Type: application/json
x-api-key: sk-xxxxxxxxxxxx
```

## 请求参数

| 参数     | 类型   | 必填    | 默认值 | 说明                                   |
| -------- | ------ | :-----: | ------ | -------------------------------------- |
| `prompt` | string | 是      | —      | 提示词（描述视频内容/动作）            |
| `mode`   | string | 否      | `i2v`  | `i2v`（图生视频）或 `t2v`（文生视频）  |
| `image`  | string | i2v必填 | —      | 输入图片 URL 或 Base64（仅 i2v 模式）  |
| `width`  | int    | 否      | `832`  | 视频宽度（仅 t2v 模式）               |
| `height` | int    | 否      | `480`  | 视频高度（仅 t2v 模式）               |
| `seed`   | int    | 否      | `-1`   | 随机种子，`-1` 为随机                  |

## 示例：图生视频 (i2v)

```json
{
  "prompt": "1girl, dancing, high quality",
  "image": "https://example.com/input.jpg",
  "mode": "i2v",
  "seed": -1
}
```

## 示例：文生视频 (t2v)

```json
{
  "prompt": "一个女孩在樱花树下旋转跳舞，裙子飘动，精美的光影效果",
  "mode": "t2v",
  "width": 832,
  "height": 480,
  "seed": -1
}
```

## 成功响应

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-5e6f...",
    "mode": "t2v",
    "status": "queued",
    "message": "Video generation queued (text-to-video).",
    "check_status": "?endpoint=task_status&task_id=a1b2c3d4..."
  },
  "error": null
}
```

> [!IMPORTANT]
> 视频生成时间较长，请以 **5~10 秒** 间隔轮询 `task_status`，耐心等待。
