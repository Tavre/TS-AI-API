# 概述

TS-AI 开发者 API 提供 **AI 图像生成**能力，后端支持 **ComfyUI**（自部署 Stable Diffusion）和 **RR3**（第三方云端生成）两个图像引擎。

**Base URL**

```
https://api.tavr.top/TS-AI-API/v1/index.php
```

## 架构概览

```
客户端  ──>  v1/index.php (路由入口)
               |
               |── core/Auth.php       — API Key 认证
               |── core/Response.php   — 统一 JSON 响应
               |
               └── endpoints/
                    |── UserBalance.php      — 余额查询
                    |── ImageGeneration.php  — 图像生成（异步提交）
                    └── TaskStatus.php       — 任务轮询 & 图片获取
```

## 典型调用流程

```
1. 生成 API Key（在前端个人中心操作）
2. POST image_generation  -> 获得 task_id
3. GET  task_status?task_id=xxx  -> 轮询，直到 status=completed
4. 从 result.image_url 下载图片
```

## 通用响应格式

所有端点返回统一 JSON 结构：

```json
{
  "success": true,
  "data": { },
  "error": null
}
```

**错误响应示例**：

```json
{
  "success": false,
  "data": null,
  "error": {
    "message": "Unauthorized: Invalid API Key"
  }
}
```

| 字段      | 类型        | 说明               |
| --------- | ----------- | ------------------ |
| `success` | bool        | 请求是否成功       |
| `data`    | object/null | 成功时的数据       |
| `error`   | object/null | 失败时的错误信息   |
