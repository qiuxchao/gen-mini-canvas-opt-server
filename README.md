## 数据库设计

### User

用户

```ts
{
  id: string;
  /** 账号 */
  username: string;
  /** 密码(排除) */
  password: string;
  /** 姓名 */
  name: string;
  /** 权限 delete: 删除（有此权限才能删除项目和画板） */
  permissions: string[];
  /** 不拥有的项目（项目id列表）(排除) */
  excludeProjects: string[];
  /** 是否激活(排除) */
  isActive: boolean;
  /** 创建时间 */
  createdTime: number;
  /** 更新时间 */
  updatedTime: number;
}
```

### Project

项目

```ts
{
  id: string;
  /** 项目名 */
  name: string;
  /** 项目封面列表 */
  covers: string[];
  /** 项目下画板的数量 */
  boardCount: number;
  /** 创建时间 */
  createdTime: number;
  /** 更新时间 */
  updatedTime: number;
}
```

### DrawBoard

画板

```ts
{
  id: string;
  /** 画板名 */
  name: string;
  /** 封面 */
  cover: string;
  /** 所属项目id(列表排除) */
  projectId: string;
  /** 所属项目名称(列表排除) */
  projectName: string;
  /** 画板宽度(列表排除) */
  width: number;
  /** 画板高度(列表排除) */
  height: number;
  /** 画板数据 json 字符串(列表排除) */
  data: string;
  /** 创建时间 */
  createdTime: number;
  /** 更新时间 */
  updatedTime: number;
}
```
