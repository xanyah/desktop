import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";

const config: ForgeConfig = {
  packagerConfig: {
    icon: './public/favicon',
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: "bazecor",
      setupIcon: "./build/logo.ico",
    }),
    new MakerZIP({}, ["darwin"]),
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "./build/logo.icns",
      },
    },
    {
      name: "@reforged/maker-appimage",
      config: {
        options: {
          bin: "Bazecor",
          categories: ["Utility"],
          icon: "./build/logo.png",
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
            entry: 'electron/main.js',
            config: 'vite.main.config.js'
          },
          {
            entry: 'electron/preload.js',
            config: 'vite.preload.config.js'
          }
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.js'
          }
        ]
      }
    }
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
    // packageAfterPrune: async (_forgeConfig, buildPath, _electronVersion, platform, _arch) => {
    //   /**
    //    * https://github.com/Dygmalab/Bazecor/blob/development/forge.config.ts
    //    * Serialport, usb and uiohook-napi are problematic libraries to run in Electron.
    //    * When Electron app is been built, these libraries are not included properly in the final executable.
    //    * What we do here is to install them explicitly and then remove the files that are not for the platform
    //    * we are building for
    //    */
    //   const packageJson = JSON.parse(fs.readFileSync(path.resolve(buildPath, 'package.json')).toString());

    //   packageJson.dependencies = {
    //     'electron-pos-printer': '^1.3.7',
    //     serialport: '^12.0.0',
    //   };

    //   fs.writeFileSync(path.resolve(buildPath, 'package.json'), JSON.stringify(packageJson));
    //   spawnSync('yarn', ['install', '--production'], {
    //     cwd: buildPath,
    //     stdio: 'inherit',
    //     shell: true,
    //   });

    //   const prebuilds = globSync(`${buildPath}/**/prebuilds/*`);
    //   prebuilds.forEach(function (path) {
    //     if (!path.includes(platform)) {
    //       fs.rmSync(path, { recursive: true });
    //     }
    //   });
    // },
  },
}

export default config