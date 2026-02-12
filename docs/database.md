# 数据库结构

## api_keys 表

API Key 管理表，存储用户生成的开发者密钥。

```sql
CREATE TABLE api_keys (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    api_key    VARCHAR(64) NOT NULL UNIQUE,
    status     ENUM('active', 'revoked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

| 字段         | 类型         | 说明                          |
| ------------ | ------------ | ----------------------------- |
| `id`         | INT (PK)     | 自增主键                      |
| `user_id`    | INT (FK)     | 关联用户 ID                   |
| `api_key`    | VARCHAR(64)  | API Key，以 `sk-` 开头，唯一  |
| `status`     | ENUM         | `active` 或 `revoked`         |
| `created_at` | TIMESTAMP    | 创建时间                      |

## users 表（关键字段）

| 字段                | 类型           | 说明           |
| ------------------- | -------------- | -------------- |
| `id`                | INT (PK)       | 用户 ID        |
| `username`          | VARCHAR(50)    | 用户名（唯一） |
| `email`             | VARCHAR(100)   | 邮箱（唯一）   |
| `credits`           | DECIMAL(10,2)  | 主账户积分     |
| `last_checkin_date` | DATE           | 上次签到日期   |

## user_bonus_credits 表

用户临时积分表，存储签到/活动赠送的有过期时间的积分。

```sql
CREATE TABLE user_bonus_credits (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT NOT NULL,
    amount         DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    initial_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    expires_at     DATETIME NOT NULL,
    created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
    KEY idx_user_expire (user_id, expires_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

| 字段             | 类型           | 说明             |
| ---------------- | -------------- | ---------------- |
| `id`             | INT (PK)       | 自增 ID          |
| `user_id`        | INT (FK)       | 关联用户         |
| `amount`         | DECIMAL(10,2)  | 剩余有效临时积分 |
| `initial_amount` | DECIMAL(10,2)  | 初始赠送积分     |
| `expires_at`     | DATETIME       | 过期时间         |
