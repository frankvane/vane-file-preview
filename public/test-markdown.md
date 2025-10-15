# Markdown 测试文件

这是一个用于测试 MarkdownPreviewPlugin 的文件。

## 代码高亮测试

### JavaScript 代码

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome, ${name}!`;
}

const user = "World";
const message = greet(user);
console.log(message);
```

### Python 代码

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 计算前10个斐波那契数
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

### TypeScript 代码

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
```

### CSS 代码

```css
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}
```

### JSON 代码

```json
{
  "name": "test-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "typescript": "^4.9.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  }
}
```

### HTML 代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>
      This is a paragraph with <strong>bold text</strong> and
      <em>italic text</em>.
    </p>
  </body>
</html>
```

### SQL 代码

```sql
SELECT
    u.id,
    u.name,
    u.email,
    COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2023-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY order_count DESC;
```

### Shell 脚本

```bash
#!/bin/bash

# 备份数据库
echo "Starting database backup..."
mysqldump -u root -p mydatabase > backup_$(date +%Y%m%d_%H%M%S).sql

# 检查备份是否成功
if [ $? -eq 0 ]; then
    echo "Backup completed successfully!"
else
    echo "Backup failed!"
    exit 1
fi
```

## 行内代码测试

这里有一些 `行内代码` 示例，比如 `const name = "test"` 和 `console.log()`。

## 表格测试

| 语言       | 扩展名 | 特点     |
| ---------- | ------ | -------- |
| JavaScript | .js    | 动态类型 |
| TypeScript | .ts    | 静态类型 |
| Python     | .py    | 简洁易读 |
| Java       | .java  | 面向对象 |

## 引用块测试

> 这是一个引用块的示例。
>
> 它可以包含多行内容，用于突出显示重要信息。

## 链接测试

- [React 官网](https://reactjs.org)
- [TypeScript 官网](https://www.typescriptlang.org)
- [Vite 官网](https://vitejs.dev)

## 列表测试

### 无序列表

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3

### 有序列表

1. 第一步
2. 第二步
3. 第三步

## 任务列表测试

- [x] 完成 Markdown 解析
- [x] 添加代码高亮
- [ ] 添加数学公式支持
- [ ] 添加表格样式
- [ ] 添加主题切换

## 水平线测试

---

## 强调测试

这是 **粗体文本** 和 _斜体文本_ 的示例。

也可以使用 **粗体** 和 _斜体_ 的替代语法。
