## 运行测试集合

本 Action 会在从 dev 分支同步到 main 分支后被调用, 扫描文件夹下的每一个子文件, 运行每一个 test.ts 测试.
运行前需要先根据 main 的内容, 执行 npm ci, 提供正常的运行环境.
运行产物可以写入 ./dist 文件夹, 工作流会将其打包作为附件.
运行失败会中断 workflow, 以提醒代码存在问题.

---

目前包括的测试有:
- [gia_gen](./gia_gen/): 使用 Graph 接口生成 GIA 文件.
- [heat_map](./heat_map/): 读取导出的 node_data/index.json, 创建热力图.