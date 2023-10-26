<template>
  <h2>基础 Basic</h2>
  <!-- <div>{{ settings }}</div> -->
  <!-- enable -->
  <div class="setting-item mod-toggle">
    <div class="setting-item-info">
      <div class="setting-item-name">启用 Enable</div>
      <div class="setting-item-description">
        若关闭插件不生效<br />
        Turn off will disable
      </div>
    </div>

    <div class="setting-item-control">
      <div
        class="checkbox-container"
        :class="settings.enable ? 'is-enabled' : ''"
      >
        <input type="checkbox" v-model="settings.enable" tabindex="0" />
      </div>
    </div>
  </div>
  <!-- hotkey enable -->
  <!-- <div class="setting-item mod-toggle">
    <div class="setting-item-info">
      <div class="setting-item-name">启用 Hot Keys Enable</div>
      <div class="setting-item-description">
        若关闭插件不生效<br />
        Turn off will disable
      </div>
    </div>

    <div class="setting-item-control">
      <div
        class="checkbox-container"
        :class="settings.hotkeyEnable ? 'is-enabled' : ''"
      >
        <input type="checkbox" v-model="settings.hotkeyEnable" tabindex="0" />
      </div>
    </div>
  </div> -->

  <!-- desc -->
  <div class="setting-item">
    <div class="setting-item-info">
      <div class="setting-item-name">格式化快捷键</div>
      <div class="setting-item-description">暂时不支持修改</div>
    </div>
    <div class="setting-item-control">
      <span>Control + Shift + L</span>
    </div>
  </div>
  <div class="setting-item">
    <div class="setting-item-info">
      <div class="setting-item-name">zhLint 规则</div>
      <div class="setting-item-description">暂时不支持修改</div>
    </div>
    <div class="setting-item-control">
      <span> preset: default</span>
    </div>
  </div>

  <div class="setting-item-control" style="margin-top: 18px">
    <button @click="settings = defaultSettings()">重置配置</button>
    <button class="mod-cta" @click="save">保存配置</button>
  </div>
</template>
<script lang="ts" setup>
import { Notice, Plugin, requestUrl } from "obsidian";
import { onMounted, ref } from "vue";

const props = defineProps<{
  plugin: Plugin;
}>();

const defaultSettings = () => ({
  enable: true,
  hotkeyEnable: true,
});
const settings = ref(defaultSettings());

const save = async () => {
  const newSeeting = {
    // ...currentSetting.value,
    ...settings.value,
  };
  await props.plugin.saveData(newSeeting);
  new Notice("保存成功");
};

const fetchData = () => {
  const token = "";
  requestUrl({
    url: "/",
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(({ json }) => {
    return json;
  });
};
// fetchData()

onMounted(async () => {
  if (props.plugin) {
    const _currentSetting =
      (await props.plugin.loadData()) ?? defaultSettings();
    settings.value = _currentSetting;
  }
});
</script>

<style scoped>
input[type="checkbox"] {
  width: 100%;
  height: 100%;
}
</style>
