import fs from 'fs';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import path from 'path';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { spawnSync } from 'child_process';
import { globSync } from 'glob';

const config: ForgeConfig = {
  packagerConfig: {
    icon: './public/favicon',
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: "xanyah",
      setupIcon: "./public/favicon.ico",
    }),
    new MakerZIP({}, ["darwin"]),
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "./public/web-app-manifest-512x512.icns",
      },
    },
    {
      name: "@reforged/maker-appimage",
      config: {
        options: {
          bin: "Xanyah",
          categories: ["Utility"],
          icon: "./public/web-app-manifest-512x512.png",
        },
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be
        // Main process, Preload scripts, Worker process, etc.
        build: [
          {
            entry: 'electron/main.ts',
            config: 'config/vite.main.config.ts'
          },
          {
            entry: 'electron/preload.ts',
            config: 'config/vite.preload.config.ts'
          }
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'config/vite.renderer.config.ts'
          }
        ]
      }
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'xanyah',
          name: 'desktop',
        },
        prerelease: true,
      },
    },
  ],
  hooks: {
    packageAfterPrune: async (_forgeConfig, buildPath, _electronVersion, platform, _arch) => {
      /**
       * https://github.com/Dygmalab/Bazecor/blob/development/forge.config.ts
       * Serialport, usb and uiohook-napi are problematic libraries to run in Electron.
       * When Electron app is been built, these libraries are not included properly in the final executable.
       * What we do here is to install them explicitly and then remove the files that are not for the platform
       * we are building for
       */
      const packageJson = JSON.parse(fs.readFileSync(path.resolve(buildPath, 'package.json')).toString());

      packageJson.dependencies = {
        'electron-pos-printer': '1.3.6',
        'electron-squirrel-startup': '^1.0.1',
        serialport: '^12.0.0',
      };

      fs.writeFileSync(path.resolve(buildPath, 'package.json'), JSON.stringify(packageJson));
      spawnSync('yarn', ['install', '--production'], {
        cwd: buildPath,
        stdio: 'inherit',
        shell: true,
      });

      const prebuilds = globSync(`${buildPath}/**/prebuilds/*`);
      prebuilds.forEach(function (path) {
        if (!path.includes(platform)) {
          fs.rmSync(path, { recursive: true });
        }
      });
    },
  },
}

export default config