# Linux DO 版开发请求

本文档说明 Linux DO 版接口的请求方式、认证流程与支付流程。

## 基础信息

- API 域名：`https://linuxapi.tavr.top`
- 前端域名：`https://linux.tsart.lat`
- 统一入口：`/api.php?action=...`

## 登录认证（仅 OAuth2）

Linux DO 版禁用账号密码注册/登录，仅支持 Linux DO OAuth2。

### 1) 发起 OAuth2 登录

```http
GET https://linuxapi.tavr.top/api.php?action=oauth_start
```

服务端会 302 跳转到 Linux Connect 授权页。

### 2) 授权回调

回调地址：

```text
https://linuxapi.tavr.top/oauth/callback
```

回调成功后，服务端会重定向到前端：

```text
https://linux.tsart.lat/login?oauth_token=...
```

前端拿到 `oauth_token` 后调用 `get_user_info` 获取用户信息。

## 用户信息

```bash
curl -X POST "https://linuxapi.tavr.top/api.php?action=get_user_info" \
  -H "Content-Type: application/json" \
  -d '{"token":"YOUR_OAUTH_TOKEN"}'
```

## 生成请求（文生图/图生图/视频）

```bash
curl -X POST "https://linuxapi.tavr.top/api.php?action=generate" \
  -H "Content-Type: application/json" \
  -d '{
    "token":"YOUR_OAUTH_TOKEN",
    "settings":{
      "workflow":"default",
      "prompt":"a cinematic portrait",
      "width":1024,
      "height":1024,
      "steps":20
    },
    "prompt":{"prompt":"a cinematic portrait"}
  }'
```

## 充值（LDC）

Linux DO 版充值仅支持 LDC。

- 汇率：`1 LDC = 20 credits`

### 创建充值订单

```bash
curl -X POST "https://linuxapi.tavr.top/api.php?action=recharge" \
  -H "Content-Type: application/json" \
  -d '{
    "token":"YOUR_OAUTH_TOKEN",
    "amount":10,
    "pay_type":"ldc"
  }'
```

返回 `pay_url`，跳转后完成支付。

### 支付回调通知

通知地址：

```text
https://linuxapi.tavr.top/tongzhi
```

该接口由 LDC 平台调用，业务侧无需主动请求。

## 常用接口清单

- `get_user_info`：获取用户与积分
- `generate`：发起生成
- `history`：查询历史
- `task_status`：查询任务状态（v1）
- `recharge`：创建 LDC 充值订单
- `redeem_code`：兑换码充值

