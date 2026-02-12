# JavaScript 示例

适用于 **Node.js** 和**浏览器**环境（使用 Fetch API）。

## 完整示例

```javascript
const API_BASE = "https://api.tavr.top/TS-AI-API/v1/index.php";
const API_KEY = "sk-your_api_key_here";

/**
 * 查询余额
 */
async function checkBalance() {
  const res = await fetch(`${API_BASE}?endpoint=user_balance`, {
    headers: { "x-api-key": API_KEY },
  });
  const data = await res.json();
  if (data.success) {
    console.log(`用户: ${data.data.username}, 余额: ${data.data.balance} 积分`);
  }
  return data;
}

/**
 * 提交生成任务并轮询结果
 */
async function generateAndPoll(prompt, options = {}) {
  // 1. 提交任务
  const genRes = await fetch(`${API_BASE}?endpoint=image_generation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      prompt,
      width: options.width || 768,
      height: options.height || 1024,
      workflow: options.workflow || "rr3",
      ...options,
    }),
  });

  const genData = await genRes.json();
  if (!genData.success) {
    throw new Error(genData.error?.message || "提交失败");
  }

  const taskId = genData.data.id;
  console.log(`任务已提交: ${taskId}`);

  // 2. 轮询状态
  const maxAttempts = 40;
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const statusRes = await fetch(
      `${API_BASE}?endpoint=task_status&task_id=${taskId}`,
      { headers: { "x-api-key": API_KEY } }
    );
    const statusData = await statusRes.json();
    const { status, result } = statusData.data;

    console.log(`状态: ${status}`);

    if (status === "completed") {
      return result.image_url;
    }
    if (status === "failed") {
      throw new Error("生成失败");
    }
  }

  throw new Error("轮询超时");
}

// === 使用 ===
checkBalance();

generateAndPoll("1girl, sakura, masterpiece")
  .then((url) => console.log(`Done: ${url}`))
  .catch(console.error);
```

## 封装为 npm 模块

```javascript
class TsAiClient {
  constructor(apiKey) {
    this.base = "https://api.tavr.top/TS-AI-API/v1/index.php";
    this.apiKey = apiKey;
  }

  async request(endpoint, options = {}) {
    const url = `${this.base}?endpoint=${endpoint}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        "x-api-key": this.apiKey,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    return res.json();
  }

  async getBalance() {
    return this.request("user_balance");
  }

  async generate(prompt, params = {}) {
    return this.request("image_generation", {
      method: "POST",
      body: JSON.stringify({ prompt, ...params }),
    });
  }

  async getTaskStatus(taskId) {
    const url = `${this.base}?endpoint=task_status&task_id=${taskId}`;
    const res = await fetch(url, {
      headers: { "x-api-key": this.apiKey },
    });
    return res.json();
  }
}

// 使用
const client = new TsAiClient("sk-your_api_key_here");
```
