构建 & pm2 启动：

```
npm run build
cd dist
pm2 start
```

# 服务端

服务端使用 [NestJS](https://nestjs.com/) 编写，下面这部分内容，我将简单分享 NestJS 在服务端的一些实践经验，并介绍 NestJS 的部分功能及其在服务端项目中的应用。

## NestJS 是什么

[NestJS](https://nestjs.com/) 是一个基于 Node.js 的**高效**、**可扩展**和**易于维护**的后端开发框架，它使用现代化的 JavaScript 和 TypeScript 语言来构建 Web 应用程序。

NestJS 提供了一种模块化的方式来组织代码，并使用**依赖注入**来管理组件之间的依赖关系。它还提供了一组强大的工具和库，用于处理 HTTP 请求、数据库访问、身份验证和授权等常见任务。

## NestJS 的基本功能

### 模块化架构

NestJS 使用模块化架构来组织代码。每个模块都是一个独立的单元，它包含了一组相关的**组件**、**控制器**和**服务**。这种模块化的方式使得代码更易于维护和扩展。

在我们的项目中，我们使用模块来组织不同的功能，例如用户管理、项目管理和画板管理等。每个模块都有自己的控制器和服务，它们负责处理 HTTP 请求和业务逻辑。

以下是一个示例模块的代码：

```ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

在上面的示例中，我们定义了一个名为 `UserModule` 的模块，它包含了一个 `UserController` 和一个 `UserService`。`UserController` 负责处理 HTTP 请求，`UserService` 负责处理业务逻辑。我们使用 `@Module()` 装饰器来定义模块，并使用 `controllers` 和 `providers` 属性来指定控制器和服务。

### 依赖注入

NestJS 使用依赖注入来管理组件之间的依赖关系。依赖注入是一种设计模式，它使得组件之间的依赖关系更加松散，从而使得代码更易于维护和测试。

在我们的项目中，我们使用依赖注入来管理服务之间的依赖关系。例如，我们的用户服务依赖于数据库服务和加密服务。通过使用依赖注入，我们可以轻松地将这些服务注入到用户服务中。

以下是一个示例服务的代码：

```ts
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseService } from './database.service';
import { EncryptionService } from './encryption.service';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async createUser(name: string, password: string) {
    const encryptedPassword = await this.encryptionService.encrypt(password);
    const user = await this.databaseService.createUser(name, encryptedPassword);
    return user;
  }
}
```

在上面的示例中，我们定义了一个名为 `UserService` 的服务，它依赖于 `DatabaseService` 和 `EncryptionService`。我们使用 `@Injectable()` 装饰器来定义服务，并在构造函数中注入依赖项。

### 控制器和路由

NestJS 使用控制器和路由来处理 HTTP 请求。控制器是一个类，它包含了一组处理 HTTP 请求的方法。路由是一个映射表，它将 HTTP 请求的 URL 映射到控制器的方法上。

以下是一个示例控制器和路由的代码：

```ts
import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('list')
  findAll(): string {
    return '/user/list 接口的响应';
  }

  @Post('create')
  create(): string {
    return '/user/create 接口的响应';
  }
}
```

在上面的示例中，我们定义了一个名为 `UserController` 的控制器，它包含了两个处理 HTTP 请求的方法：`findAll()` 和 `create()`。我们使用 `@Controller()` 装饰器来定义控制器，并使用 `@Get()` 和 `@Post()` 装饰器来定义 HTTP 请求的方法和路由。在这个例子中，`findAll()` 方法处理 `GET /user/list` 请求，`create()` 方法处理 `POST /user/create` 请求。

## NestJS 在项目中的实践

### 数据库(MongoDB & TypeORM)

在我们的项目中，我们使用 MongoDB 作为数据库，并使用 TypeORM 来访问数据库。TypeORM 是一个 ORM(Object-Relational Mapping) 框架，它提供了一种现代化的方式来访问数据库。

> ORM(Object-Relational Mapping) 是一种将对象模型和关系数据库之间的映射进行自动化的技术。

以下是一个示例 TypeORM 实体的代码：

```ts
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;
}
```

在上面的示例中，我们定义了一个名为 `User` 的 TypeORM 实体，它映射到 MongoDB 中的一个集合。我们使用 `@Entity()` 装饰器来定义实体，并使用 `@Column()` 和 `@ObjectIdColumn()` 装饰器来定义实体的属性。

### 授权相关

#### 登录授权

在我们的项目中，我们使用 JWT(JSON Web Token) 和 Passport 来进行身份验证和授权。JWT 是一种现代化的身份验证和授权方式，它使用 JSON 格式的令牌来验证用户身份和授权访问。Passport 是一个身份验证模块，它提供了一些策略来处理身份验证。

#### 自定义权限验证

在我们的项目中，我们使用路由守卫和自定义装饰器来拦截 HTTP 请求。路由守卫是一个函数，它可以在 HTTP 请求到达控制器之前或响应离开控制器之后执行一些操作。自定义装饰器是一个函数，它可以在 HTTP 请求到达控制器之前或响应离开控制器之后执行一些操作。

### 异常过滤器

### 响应拦截器

### DTO 验证管道

#### DTO 是什么？

DTO 是 Data Transfer Object 的缩写，即数据传输对象。它是一种设计模式，用于在不同层之间传输数据。DTO 通常用于将数据从数据库层传输到业务逻辑层，或将数据从业务逻辑层传输到表示层（例如控制器）。DTO 通常是一个简单的数据结构，只包含数据字段和 getter/setter 方法。它们通常不包含业务逻辑或复杂的计算。在 NestJS 中，DTO 通常用于验证和转换 HTTP 请求和响应中的数据。
