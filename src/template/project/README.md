# easy-web

## 项目运行命令详解

##### npm run dll

> 项目使用了webpack的dll插件进行第三方库的优化，所以需要在本地运行一次这个命令，来进行dll文件的生成，一般情况下，如果不清除assets目录，此命令只执行一次即可。

##### npm run dev

> 启动开发环境的编译和监听，通过webpack编译，配置文件在`build/webpack.dev.config.js`，一般情况下不需要修改

##### npm run build

> 上线打包命令，包括压缩等优化，不启动监听，配置文件在`build/webpack.pro.config.js`，一般情况不需要修改

##### npm run server

> 启动开发服务器，是一个基于koa手写的简易开发服务器，感兴趣可以看`build/server内的内容`。`build/server/config.js`是一个配置文件，可以简单配置模拟接口和返回数据。如果新增了模拟接口，需要重新启动服务器。


## 项目详解

- 构建/开发：
    - 构建基于webpack
    - 开发服务器基于koa手动搭建
- 项目：
    - 底层UI基于antd组件呢库
    - 一个base基类组件，提供项目内的公用规范和方法
    - 整个项目采用redux，一个页面有唯一store
        - 每个页面对应一个数据块
        - 全局有一个数据块
    - 提供统一布局组件，Layout


## 项目目录

- easy-web: 项目根目录
    - assets: 构建后目录
    - build: 构建工具及配置文件目录
        - server: 开发服务器源码
            - config.js: 可配置模拟接口文件
            - control.js: 控制器文件
            - index.js: 服务器入口文件
            - render.js: 模版渲染中间件
            - router.js: 路由中间件
        - start.js: 服务器启动入口
        - template.js: 公共模版模块
        - webpack.pro.config.js: 生产环境配置文件
        - webpack.dev.config.js: 开发环境配置文件
        - webpack.dll.config.js: dll插件配置文件
    - src: 业务源码目录
        - candidate-list: 一个页面的源码目录
            - components: 一个页面内部组件目录
            - container: 页面容器组件
            - entry: 页面入口
            - page: 页面模版，html文件
            - reducers: 页面的reducer
            - action: redux的action，页面相关
        - common: 公用文件
            - components: 公用的业务组件
                - Header: 公用头部
                - Layout: 通用布局
                - SubNav: 二级菜单
            - fonts: 字体文件
            - images: 项目图片存放
            - javascript: 公用js
            - store: 全局store，及连接redux统一方法
            - style: 全局样式表
                - base.less: 基础样式表
                - reset.less: 初始化样式表
                - theme.js: antd的主题样式
        - BaseComponent.js: 通用基础基类


## 基本开发流程

1、 项目clone下来后，安装包

> npm install

2、 生成dll文件

> npm install dll

3、 启动开发服务器

> npm run server

4、 另开一个命令行窗口，开启监听，进行编译

> npm run dev

5、 开发过程中如果需要模拟接口，配置`build/server/config.js`文件，配置你想要的接口及数据

6、 开发完毕，需要进行生产环境打包，

> npm run build


=======

目前进度：

1、开发服务器：

    - 简易版本
    - 模版渲染
    - 控制器有
    - 简易路由有
    - 接口模拟有

2、可能出现的问题：

    - 服务器过于简陋，可能存在位置问题
    - 扩展起来不够
    - 输出信息不够完善

3、拆分项目：

    - header没有写完
    - 页面都写完了
    - 业务接口都没写
    - 交互逻辑都没写
    - 没有添加eslint
    - 上线脚本和推送到测试服务器的脚本没有写
    - 没有写将所有的html和static提取出来的脚本
