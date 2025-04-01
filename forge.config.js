const fs = require('fs')
const path = require('path')
const { FusesPlugin } = require('@electron-forge/plugin-fuses')
const { FuseV1Options, FuseVersion } = require('@electron/fuses')
const { MakerSquirrel } = require('@electron-forge/maker-squirrel')
const { globSync } = require('glob')
const { spawnSync } = require('child_process')

module.exports = {
  packagerConfig: {
    icon: './public/favicon',
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    new MakerSquirrel({
      name: "Xanyah",
      setupIcon: "./public/favicon.ico",
    }),
    // {
    //   name: '@electron-forge/maker-wix',
    //   config: {
    //     icon: './public/favicon.ico',
    //     ui: {
    //       chooseDirectory: true,
    //     },
    //   },
    // },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
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
      const packageJson = JSON.parse(fs.readFileSync(path.resolve(buildPath, "package.json")).toString());

      packageJson.dependencies = {
        serialport: "^12.0.0",
      };

      fs.writeFileSync(path.resolve(buildPath, "package.json"), JSON.stringify(packageJson));
      spawnSync("yarn", ["install", "--production"], {
        cwd: buildPath,
        stdio: "inherit",
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
