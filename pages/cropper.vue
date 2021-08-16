<template>
  <view class="container">
    <web-view
      :webview-styles="webviewStyles"
      @message="handleMessage"
      :src="webviewSrc"
    >
    </web-view>
  </view>
</template>

<script>
export default {
  name: "buuug7-img-cropper",
  data() {
    return {
      webviewStyles: {},
      platform: "",
      webviewSrc:
        "/uni_modules/buuug7-img-cropper/hybrid/html/cropper/index.html",
    };
  },

  mounted() {
    const { platform } = uni.getSystemInfoSync();
    this.platform = platform;
    console.log(platform);

    if (platform === "windows" || platform === "mac") {
      this.handleH5Message();
    }
  },

  methods: {
    handleMessage(event) {
      const platform = this.platform;
      const data = event.detail.data[0];
      if (platform === "android" || platform === "ios") {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit("imgCropped", { data: data.dataUrl });
      }
    },

    handleH5Message(e) {
      console.log(`H5Message`);
      window.addEventListener("message", (event) => {
        const data = event.data.data;
        if (data && data.type === "croppedData") {
          const eventChannel = this.getOpenerEventChannel();
          eventChannel.emit("imgCropped", { data: data.dataUrl });
        }
      });
    },
  },
};
</script>

<style></style>
