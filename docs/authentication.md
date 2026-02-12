# 认证方式

所有 v1 端点均**需要认证**，支持以下三种方式（任选其一）：

| 优先级 | 方式                     | 示例                                       |
| :----: | ------------------------ | ------------------------------------------ |
| 1      | **`x-api-key` 请求头**   | `x-api-key: sk-a1b2c3d4e5f6...`            |
| 2      | **`Authorization` Bearer** | `Authorization: Bearer sk-a1b2c3d4e5f6...` |
| 3      | **URL / Body 参数**      | `?api_key=sk-a1b2c3d4e5f6...`              |

> [!TIP]
> 推荐使用 **`x-api-key` 请求头**方式，安全性最高且不会出现在 URL 日志中。

## 获取 API Key

API Key 通过主 API (`api.php`) 管理：

| 操作   | Action              | 说明                               |
| ------ | ------------------- | ---------------------------------- |
| 生成   | `generate_api_key`  | 生成新 Key，格式 `sk-` + 48 位 hex |
| 查询   | `get_api_key`       | 获取当前活跃 Key                   |
| 撤销   | `revoke_api_key`    | 撤销指定或所有活跃 Key             |

### 生成 API Key 示例

```bash
curl -X POST "https://api.tavr.top/TS-AI-API/api.php?action=generate_api_key" \
  -H "Content-Type: application/json" \
  -d '{"token": "你的登录token"}'
```

**响应**：

```json
{
  "success": true,
  "data": {
    "api_key": "sk-1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f"
  },
  "error": null
}
```
