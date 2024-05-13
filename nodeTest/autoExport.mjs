import fs from 'fs-extra';

fs.readdir('./src/components')
    .then(files => {
        if (Array.isArray(files)) {
            let exportStr = '';
            files.forEach(item => {
                // 检查是否为文件夹且文件夹名称符合大驼峰命名规范且包含index.tsx文件
                if (
                    fs.lstatSync(`./src/components/${item}`).isDirectory() &&
                    /^[A-Z][a-zA-Z]*$/.test(item) &&
                    fs.existsSync(`./src/components/${item}/index.tsx`)
                ) {
                    exportStr = `${exportStr}\nexport { default as ${item} } from './components/${item}';`;
                }
            });

            fs.writeFile('./src/index.export.ts', exportStr);
        }
    })
    .catch(err => console.error(err));
