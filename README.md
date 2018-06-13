
> 一个项目启动的工具，用到的技术有，react + redux + webpack + koa + less + antd，形成了一个命令行工具。

#### dono start

> 启动编译监听，在项目根目录下执行

#### dono server

> 启动开发服务器

#### dono build

> 启动生产环境编译





项目根目录下需要建立一个.donorc配置文件，不手动建立的话，会在第一次启动的时候检测到，并且自动创建。

配置的每一个字段意义如下：

1、less-theme: 因为用了antd，所以通过less的编译插件设置了主题，主题路径在此

2、publicPath: dev webpack的publicPath

3、dll-output-path: 因为用了webpack的dll插件进行优化，所以dll需要一个输出路径，在此配置，默认是`./asests/common/javascript`

4、output-path: 输出路径，这个路径作为开发环境和生产环境两用，默认是`./assets`

5、server-root: 开发服务器的根目录路径，默认是./assets

6、mock-config: 因为开发服务器支持配置mock数据，但是需要根据用户配置进行mock，所以需要配置的路径

7、common-template: 因为涉及到html模版处理，这里是通用的模板路径，可以给html里添加一些内容

8、view-engine: 模版的渲染引擎，目前只可选default

9、production-publicPath: 生产环境的域名


#### server  mock的使用

1、commonjs模块，导出一个json对象

2、键名为请求的url

3、值为需要返回的值，可填写的值为

    - json文件路径，如果查找到有此路径，则读取路径内的json，并且返回，如果查找不到该文件，则会将路径按照字符串处理
    - 字符串，直接返回
    - json数据
