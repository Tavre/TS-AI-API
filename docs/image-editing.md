# 图片编辑

提交图片编辑请求，返回任务 ID。**异步处理**，需轮询 [`task_status`](/task-status) 获取结果。

每次消耗 **20 积分**。

## 功能说明

使用 **Flux-2 Klein** 模型，支持单图编辑。通过文字指令描述你想要的编辑效果。

- 支持换装、风格变换、局部修改等
- 编辑指令中使用 **"图1"** 指代上传的图片
- 图片最长边自动缩放至 1280px

## 请求

```
POST /v1/index.php?endpoint=image_editing
Content-Type: application/json
x-api-key: sk-xxxxxxxxxxxx
```

## 请求参数

| 参数     | 类型   | 必填 | 默认值 | 说明                            |
| -------- | ------ | :--: | ------ | ------------------------------- |
| `prompt` | string | 是   | —      | 编辑指令（如：图1穿上红色裙子） |
| `image`  | string | 是   | —      | 待编辑图片 URL 或 Base64        |
| `seed`   | int    | 否   | `-1`   | 随机种子，`-1` 为随机           |

## 请求示例

```json
{
  "prompt": "图1穿上红色裙子",
  "image": "https://example.com/photo.jpg",
  "seed": -1
}
```

## 成功响应

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-5e6f...",
    "status": "queued",
    "message": "Image editing queued (Flux-2 Klein).",
    "check_status": "?endpoint=task_status&task_id=a1b2c3d4..."
  },
  "error": null
}
```
