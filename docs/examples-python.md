# Python 示例

## 安装依赖

```bash
pip install requests
```

## 完整示例

```python
import requests
import time

API_BASE = "https://api.tavr.top/TS-AI-API/v1/index.php"
API_KEY = "sk-your_api_key_here"
HEADERS = {"x-api-key": API_KEY, "Content-Type": "application/json"}


def check_balance():
    """查询余额"""
    r = requests.get(f"{API_BASE}?endpoint=user_balance", headers=HEADERS)
    data = r.json()
    if data["success"]:
        print(f"用户: {data['data']['username']}, 余额: {data['data']['balance']} 积分")
    return data


def generate_image(prompt, workflow="rr3", width=768, height=1024):
    """提交图像生成任务"""
    payload = {
        "prompt": prompt,
        "width": width,
        "height": height,
        "workflow": workflow,
    }
    r = requests.post(
        f"{API_BASE}?endpoint=image_generation",
        headers=HEADERS,
        json=payload,
    )
    data = r.json()
    if data["success"]:
        task_id = data["data"]["id"]
        print(f"任务已提交, ID: {task_id}")
        return task_id
    else:
        print(f"提交失败: {data['error']}")
        return None


def poll_task(task_id, interval=3, timeout=120):
    """轮询任务状态直到完成"""
    start = time.time()
    while time.time() - start < timeout:
        r = requests.get(
            f"{API_BASE}?endpoint=task_status&task_id={task_id}",
            headers=HEADERS,
        )
        data = r.json()["data"]

        status = data["status"]
        progress = data.get("progress", "")
        progress_str = f" ({progress}%)" if progress else ""
        print(f"状态: {status}{progress_str}")

        if status == "completed":
            return data["result"]["image_url"]
        elif status == "failed":
            print(f"生成失败: {data.get('error')}")
            return None

        time.sleep(interval)

    print("轮询超时!")
    return None


# === 使用 ===
if __name__ == "__main__":
    check_balance()

    task_id = generate_image("1girl, white hair, starry sky, masterpiece")
    if task_id:
        image_url = poll_task(task_id)
        if image_url:
            print(f"\n图片地址: {image_url}")
```
