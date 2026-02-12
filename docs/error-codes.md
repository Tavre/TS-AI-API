# 错误码参考

## HTTP 状态码

| HTTP 状态码 | 含义                  | 常见原因                             |
| :---------: | --------------------- | ------------------------------------ |
| `400`       | Bad Request           | 参数缺失或格式错误                   |
| `401`       | Unauthorized          | API Key 无效或未提供                 |
| `402`       | Payment Required      | 积分余额不足                         |
| `404`       | Not Found             | 未知 endpoint                        |
| `405`       | Method Not Allowed    | 请求方法错误（如 GET 调用 POST 端点）|
| `500`       | Internal Server Error | 服务内部错误 / 端点实现缺失          |
| `502`       | Bad Gateway           | 上游引擎（ComfyUI/RR3）错误         |

## 错误响应格式

```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "具体错误描述"
  }
}
```

## 常见错误及排查

### 401 Unauthorized

```json
{ "error": { "message": "Unauthorized: Invalid API Key" } }
```

**排查**：
- 检查 API Key 是否正确复制完整（以 `sk-` 开头）
- 确认 API Key 未被撤销（status 为 `active`）
- 检查 Header 名称是否正确（`x-api-key` 而非 `X-Api-Key`）

### 402 Payment Required

```json
{ "error": { "message": "Insufficient balance" } }
```

**排查**：
- 调用 `user_balance` 确认余额
- 每次生成扣费 10 积分
- 通过充值或兑换码补充积分

### 502 Bad Gateway

```json
{ "error": { "message": "Upstream error: ..." } }
```

**排查**：
- ComfyUI 服务可能离线或重启中
- RR3 第三方服务可能暂时不可用
- 失败时积分会自动退回
