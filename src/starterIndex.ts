import { App, Modal, Plugin, PluginSettingTab, TFile, TFolder } from "obsidian";
import { createApp, type App as VueApp } from "vue";
import SettingsPage from "./ui/settings.vue";
import ModalPage from "./ui/modal.vue";

// const VIEW_TYPE = "vue-view";

// 核心
export default class MyPlugin extends Plugin {
  async onload() {
    const settingTab = new SettingTab(this.app, this);
    this.addSettingTab(settingTab);

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (file instanceof TFolder) {
          // 一定进不来，为了 ts 不报错
          return;
        }

        if (file instanceof TFile) {
          const isImg = ["png", "jpg", "jpeg", "gif", "webp"].includes(
            file.extension
          );

          if (isImg) {
            // 暂不处理
          } else {
            // nothing
          }
        }
      })
    );

    // This creates an icon in the left ribbon.
    // this.addRibbonIcon("dice", "悬浮展示1", (evt: MouseEvent) => {
    //   console.log(evt);
    //   this.openMapView();
    // });

    // 在这里注册命令 This adds a simple command that can be triggered anywhere
    // this.addCommand({
    //   id: "xxx-id",
    //   name: "注册命令中文名",
    //   callback: () => this.openMapView(),
    // });
  }

  onunload() {}
}

/**
 * 添加 设置面板
 */
class SettingTab extends PluginSettingTab {
  plugin: Plugin;
  _vueApp: VueApp | undefined;

  constructor(app: App, plugin: Plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const _app = createApp(SettingsPage, {
      plugin: this.plugin,
    });
    this._vueApp = _app;
    _app.mount(this.containerEl);
  }
  hide() {
    if (this._vueApp) {
      this._vueApp.unmount();
    }
    this.containerEl.empty();
  }
}

/**
 * 第一次上传需要添加默认值
 */
export class MyPublishModal extends Modal {
  _vueApp: VueApp | undefined;
  plugin: Plugin;

  file: TFile;

  constructor(app: App, plugin: Plugin, file: TFile) {
    super(app);
    this.plugin = plugin;
    this.file = file;
  }

  async onOpen() {
    const _app = createApp(ModalPage, {
      plugin: this.plugin,
      modal: this,
      file: this.file,
    });
    this._vueApp = _app;
    _app.mount(this.containerEl);
  }

  onClose() {
    if (this._vueApp) {
      this._vueApp.unmount();
    }
    this.containerEl.empty();
  }
}
