<template>
  <el-container class="common-layout">
    <el-aside v-if="this.aside" width="60px">
      <div class="aside">
        <el-button size="large" type="primary" :icon="Select" circle @click="triggerLoadWords"/>
       <input ref="wordFileInput" type="file" @change="loadWords" v-show="false"/>
      </div>
    </el-aside>
    <el-main>
      <div class="main">
        <el-card class="card">
          <template #header>
            <div class="card-center" v-if="this.curr >= 0">
              <span class="name">{{ this.list[this.randoms[this.curr]] }}</span>
            </div>
          </template>
          <div class="card-center" v-if="this.curr >= 0">
            <span v-if="this.value" class="value" @click="readWord">{{this.chinese}}</span>
            <span v-if="this.value" class="desc" @click="readWord"></span>
          </div>
        </el-card>
      </div>
      <div class="butList">
        <el-button size="large" type="primary" round @click="this.preWord">上一个</el-button>
        <el-button size="large" type="primary" round @click="this.show">显示</el-button>
        <el-button size="large" type="primary" round @click="this.nextWord">会</el-button>
        <el-button size="large" type="primary" round @click="this.nextWord">不会</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script setup>
import {
  Select
} from '@element-plus/icons-vue'
</script>
<script>
export default {
  data() {
    return {
      list: [],
      chinese: null,
      sentences: null,
      randoms: [],
      aside: true,
      value: false,
      fileList: [],
      filterFile: null,
      needFilter: null,
      curr: -1,
    };
  },
  methods: {
    nextWord() {
      if (this.curr < this.list.length - 1) {
        this.curr = this.curr + 1;
        this.value = false;
      }
    },
    preWord() {
      if (this.curr > 0) {
        this.curr = this.curr - 1;
        this.value = false;
      }
    },
    readWord(event) {
      const content = event.target.textContent;
      var word = new SpeechSynthesisUtterance(content);
      word.lang = "en-US";
      var voices = window.speechSynthesis.getVoices();
      word.voice = voices[13];
      word.rate = 1.1 //播放语速 （默认值是1，范围是0.1到10，表示语速的倍数，例如2表示正常语速的两倍）
      word.pitch = 1 //音调高低 （范围从0（最小）到2（最大）。默认值为1）
      //word.volume = 0.5 //播放音量 (区间范围是0到1，默认是1)
      window.speechSynthesis.speak(word);
    },
    randomList(length) {
      this.randoms = [...Array(length).keys()].sort(() => Math.random() - 0.5);
    },
    show() {
      this.value = !this.value;
    },
    loadWords(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.list = e.target.result.split("\n");
        this.curr = 0;
        this.randomList(this.list.length);
      };
      reader.readAsText(file); // 以文本形式读取文件
    },
    triggerLoadWords() {
      this.$refs.wordFileInput.click();
    },
  },
};
</script>

<style>
html,
body,
#app,
.common-layout {
  height: 100%;
  min-height: 80px;
  width: 100%;
  padding: 0;
  border: 0;
  margin: 0;
}

li {
  list-style: none;
}
.butList {
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.aside {
  height: auto;
  width: auto;
  padding: 12px;
  display: flex;
  justify-content: center;
}
.main {
  height: 85%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  height: 65%;
  width: 50%;
}
.card-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.name {
  font-size: 60px;
}

.value {
  font-size: 45px;
}

.desc {
  font-size: 30px;
}
</style>
