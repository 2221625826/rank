<template>
  <el-container class="common-layout">
    <el-aside v-if="aside" width="60px">
      <div class="aside">
        <el-button size="large" type="primary" :icon="Select" circle @click="triggerLoadWords"/>
       <input ref="wordFileInput" type="file" @change="loadWords" v-show="false"/>
      </div>
    </el-aside>
    <el-main>
      <div class="main">
        <el-card class="card">
          <template #header>
            <div class="card-center" v-if="curr >= 0">
              <span class="engilsh"  @click="readWord">{{ list[randoms[curr]] }}</span>
            </div>
          </template>
          <div class="card-center" v-if="curr >= 0 && value">
            <span class="chinese">{{chinese}}</span>
            <span v-for="(item, index) in sentences" :key="index" class="sentence">{{index}}. <span @click="readWord">{{item}}</span></span>
          </div>
        </el-card>
      </div>
      <div class="butList">
        <el-button size="large" type="primary" round @click="preWord">上一个</el-button>
        <el-button size="large" type="primary" round @click="show">显示</el-button>
        <el-button size="large" type="primary" round @click="nextWord">会</el-button>
        <el-button size="large" type="primary" round @click="nextWord">不会</el-button>
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
import dictAxios from '@/dictAxios';
import myAxios from '@/myAxios';
export default {
  data() {
    return {
      list: [],
      chinese: "",
      sentences: [],
      randoms: [],
      aside: true,
      value: false,
      fileList: [],
      filterFile: null,
      needFilter: null,
      curr: -1,
      speaker: null
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
      //var voices = window.speechSynthesis.getVoices();
      //word.voice = voices[13];
      word.rate = 1 //播放语速 （默认值是1，范围是0.1到10，表示语速的倍数，例如2表示正常语速的两倍）
      word.pitch = 1 //音调高低 （范围从0（最小）到2（最大）。默认值为1）
      //word.volume = 0.5 //播放音量 (区间范围是0到1，默认是1)
      window.speechSynthesis.speak(word);
    },
    randomList(length) {
      this.randoms = [...Array(length).keys()].sort(() => Math.random() - 0.5);
    },
    async show() {
      try {
        const word = this.list[this.randoms[this.curr]]
        if (this.chinese.length == 0) {
          const response = await myAxios.get('/transform/' + word); // 发送GET请求
          this.chinese = await response.data
        }
        if (this.sentences.length == 0) {
          const response = await dictAxios.get('/api/v2/entries/en/' + word)
          const datas = await response.data
          for (const data of datas) {
            for (const meaning of data.meanings) {
              for (const definition of meaning.definitions) {
                if (definition.example) {
                  this.sentences.push(definition.example)
                }
              }
            }
          }
        }
      } catch (error) {
          console.error('Fetch error:', error);
      }
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

.engilsh {
  font-size: 60px;
}

.chinese {
  font-size: 45px;
}

.sentence {
  width: 100%;
  font-size: 25px;
}
</style>
