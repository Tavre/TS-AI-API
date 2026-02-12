# 查询余额

查询当前 API Key 绑定用户的积分余额。

## 请求

```
GET /v1/index.php?endpoint=user_balance
```

| Header       | 值                |
| ------------ | ----------------- |
| `x-api-key`  | `sk-xxxxxxxxxxxx` |

## 响应

**`200 OK`**

```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "username": "alice",
    "balance": 150.00,
    "currency": "credits"
  },
  "error": null
}
```

## 字段说明

| 字段       | 类型    | 说明                                  |
| ---------- | ------- | ------------------------------------- |
| `user_id`  | int     | 用户 ID                               |
| `username` | string  | 用户名                                |
| `balance`  | float   | 总积分（主账户 + 未过期临时积分之和） |
| `currency` | string  | 固定为 `"credits"`                    |

> [!NOTE]
> 余额包含：**主账户积分** + **未过期的签到/充值赠送临时积分**。过期的临时积分会自动清理。
