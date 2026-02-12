# 工作流详解

TS-AI API 支持四种图像生成工作流，通过 `workflow` 参数指定。

| 工作流    | 引擎     | 特点                             | 专属参数                            |
| --------- | -------- | -------------------------------- | ----------------------------------- |
| `default` | ComfyUI  | SDXL 标准文生图                  | `model`（默认 `RongHuaSDXLv4.5`）   |
| `anime`   | ComfyUI  | 动漫风格 + 4x 超分辨率放大      | `model`（默认 `anything_xl`），自动 1.5x 放大 |
| `z-image` | ComfyUI  | Z-Image Turbo 快速生成（9 步）   | 固定模型 `z_image_turbo`            |
| `rr3`     | RR3 云端 | 高质量二次元（预设画师风格前缀） | `cfg`（默认 `6`）                   |

## default - SDXL 标准

基于 SDXL 模型的标准文生图流程。

- **引擎**：ComfyUI（自部署）
- **采样器**：Euler，scheduler: normal
- **默认模型**：`sdxl/RongHuaSDXLv4.5.safetensors`
- **可选模型**：可通过 `model` 参数指定服务器上的任意模型

```json
{
  "prompt": "a beautiful landscape, mountains, sunset",
  "workflow": "default",
  "width": 1024,
  "height": 768,
  "steps": 20
}
```

## anime - 动漫风格

动漫/插画风格生成，自带 4x 超分辨率放大。输出尺寸为指定尺寸的 **1.5 倍**。

- **引擎**：ComfyUI（自部署）
- **采样器**：Euler Karras（两阶段）
- **默认模型**：`sdxl/anything_xl.safetensors`
- **放大模型**：`4x-UltraSharp.pth`
- **特点**：先低分辨率采样，再放大重绘，效果更精细

```json
{
  "prompt": "1girl, flower field, anime style",
  "workflow": "anime",
  "width": 768,
  "height": 1024,
  "steps": 20
}
```

## z-image - Turbo 快速生成

基于 Z-Image Turbo 模型的超快速生成，仅需 9 步。

- **引擎**：ComfyUI（自部署）
- **采样器**：Euler Simple
- **固定模型**：`z_image_turbo_bf16.safetensors`
- **CLIP**：`qwen_3_4b.safetensors`
- **特点**：CFG=1，极速生成，适合快速预览

```json
{
  "prompt": "a cat sitting on a windowsill",
  "workflow": "z-image",
  "width": 512,
  "height": 512
}
```

## rr3 - 云端二次元

通过 RR3 第三方 API 生成高质量二次元图像。

- **引擎**：RR3 云端
- **特点**：自动追加预设画师标签前缀
- **预设前缀**：`[artist:kedama milk],[artist:ask(askzy)],artist:wanke,artist:wlop,`

```json
{
  "prompt": "1girl, white hair, blue eyes, starry sky",
  "workflow": "rr3",
  "width": 768,
  "height": 1024,
  "cfg": 6
}
```

> [!NOTE]
> RR3 工作流的 task_id 为纯数字格式，ComfyUI 工作流为 UUID 格式。系统会自动识别并路由到正确的提供者。
