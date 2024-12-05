import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {
  console.log(`当前运行命令：${command}`)
  console.log(`当前运行模式：${mode}`)
  const env = loadEnv(mode)
  console.log(`当前运行模式：${env}`)
  const IS_DEV = mode == 'development'
  //  gzip 压缩大小报告
  const IS_GZIP_REPORT = IS_DEV ? false : true
  //资源文件夹
  const RESOURCES_DIR = 'resources'
  // 通用编译参数
  const buildGeneral = {
    publicDir: RESOURCES_DIR,
    reportCompressedSize: IS_GZIP_REPORT
  }
  return {
    main: {
      build: {
        envPrefix: 'RYM_',
        outDir: 'out/main',
        ...buildGeneral
      },
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      build: {
        envPrefix: 'RYP_',
        outDir: 'out/preload',
        ...buildGeneral
      },
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      build: {
        envPrefix: 'RYW_',
        outDir: 'out/renderer',
        ...buildGeneral
      },
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [vue()]
    }
  }
})
