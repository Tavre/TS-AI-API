# Grok 图像生成

使用 Grok 模型进行图像生成。该接口支持通过 Token 或 API Key 进行鉴权。

## 接口说明

- **URL**: `/api.php?action=generate`
- **Method**: `POST`
- **Content-Type**: `application/json`

## 鉴权

支持两种鉴权方式：

1. **Token**: 在 Request Header 中添加 `Authorization: Bearer <your_token>`，或者在 Body 中包含 `token` 字段。
2. **API Key**: 在 Request Header 中添加 `x-api-key: <your_api_key>`，或者在 Body 中包含 `api_key` 字段。

## 请求参数

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `settings` | Object | 是 | 设置对象，详见下表 |
| `prompt` | String | 否 | 提示词（如果在 settings 中未提供，则使用此字段） |
| `token` | String | 否 | 用户 Token（可选，推荐使用 Header） |
| `api_key` | String | 否 | API Key（可选，推荐使用 Header） |

### Settings 对象

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `workflow` | String | 是 | 固定值 `grok` |
| `prompt` | String | 是 | 提示词 |
| `width` | Number | 否 | 图片宽度 (默认 1024, 最大 2048) |
| `height` | Number | 否 | 图片高度 (默认 1024, 最大 2048) |

## 请求示例

```json
{
    "settings": {
        "workflow": "grok",
        "prompt": "a futuristic city with flying cars, cyberpunk style",
        "width": 1024,
        "height": 1024
    }
}
```

## 响应示例

### 成功响应

```json
{
    "success": true,
    "data": {
        "id": "grok_65d4a...",
        "image": "uploads/grok_65d4a...png",
        "provider": "grok",
        "status": "completed"
    }
}
```

- `image`: 生成图片的相对路径，需拼接服务器基础地址。

### 失败响应

```json
{
    "success": false,
    "data": null,
    "message": "积分不足，请充值"
}
```

## 错误码说明

| Message | 说明 |
| :--- | :--- |
| `Server configuration error: Grok API key missing` | 服务器未配置 Grok API Key |
| `Grok requires a prompt` | 缺少提示词 |
| `分辨率过高 (最大 2048x2048)` | 图片尺寸超出限制 |
| `积分不足，请充值` | 账户积分不足 |
