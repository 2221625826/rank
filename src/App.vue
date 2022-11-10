<template>
  <el-container class="common-layout">
    <el-aside v-if="this.aside">
      <el-table :data="list" max-height="85%" height="100%">
        <el-table-column
          prop="name"
          label="name"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="value"
          label="value"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="desc"
          label="desc"
          header-align="center"
          align="center"
        />
      </el-table>
      <div class="butList">
        <el-button size="large" type="primary" round @click="this.input = true"
          >导入</el-button
        >
      </div>
    </el-aside>
    <el-main>
      <div class="main">
        <el-card class="card">
          <template #header>
            <div class="card-center" v-if="this.curr >= 0">
              <span class="name">{{ this.list[this.randoms[this.curr]].name }}</span>
            </div>
          </template>
          <div class="card-center" v-if="this.curr >= 0">
            <span v-if="this.value" class="value" :class="{ 'textColor': this.word != this.list[this.randoms[this.curr]].value}">{{ this.list[this.randoms[this.curr]].value }}</span>
            <span v-if="this.value" class="desc" :class="{ 'textColor': this.word != this.list[this.randoms[this.curr]].value}">{{ this.list[this.randoms[this.curr]].desc }}</span>
            <el-input v-if="!this.value" v-model="word" size="large"/>
          </div>
        </el-card>
      </div>
      <div class="butList">
        <el-button size="large" type="primary" round @click="this.preWord"
          >上一个</el-button
        >
        <el-button
          size="large"
          type="primary"
          round
          @click="this.aside = !this.aside"
          >收起</el-button
        >
        <!--<el-button size="large" type="primary" round @click="this.readWord"
          >发音</el-button
        >-->
        <el-button
          size="large"
          type="primary"
          round
          @click="this.show"
          >显示</el-button
        >
        <el-button size="large" type="primary" round @click="this.nextWord"
          >下一个</el-button
        >
      </div>
    </el-main>
  </el-container>
  <el-dialog v-model="input">
    <h3 class="title">{{this.title[0]}} : {{this.title[1]}} : {{this.title[2]}}</h3>
    <el-input v-model="text" :rows="8" type="textarea" />
    <div class="butList" style="padding-top: 20px">
      <el-button type="primary" round @click="this.input = false"
        >取消</el-button
      >
      <el-button type="primary" round @click="this.submit()">确认</el-button>
      <el-button type="primary" round @click="this.swap(0, 1)">A&lt;-&gt;B</el-button>
      <el-button type="primary" round @click="this.swap(1, 2)">B&lt;-&gt;C</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      randoms: [],
      aside: true,
      value: false,
      input: false,
      curr: -1,
      text: "",
      word: "",
      order:[0,1,2],
      title:["name", "value", "desc"]
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
    readWord() {
      var word = new SpeechSynthesisUtterance(this.list[this.randoms[this.curr]].name);
      word.lang = "ja-JP";
      var voices = window.speechSynthesis.getVoices();
      word.voice = voices[13];
      word.rate = 1.1 //播放语速 （默认值是1，范围是0.1到10，表示语速的倍数，例如2表示正常语速的两倍）
      word.pitch = 1 //音调高低 （范围从0（最小）到2（最大）。默认值为1）
      //word.volume = 0.5 //播放音量 (区间范围是0到1，默认是1)
			window.speechSynthesis.speak(word);
    },
    random(length) {
      this.randoms = [...Array(length).keys()].sort(() => Math.random() - 0.5);
    },
    swap(a, b) {
      this.order[a] = this.order[b];
      this.order[b] = 3 - this.order[a] - this.order[3 - a - b];
      let temp = this.title[a];
      this.title[a] = this.title[b];
      this.title[b] = temp;
    },
    submit() {
      let temp = this.text.split("\n");
      this.random(temp.length);
      this.list = [];
      for (var i = 0; i < temp.length; i++) {
        let peer = temp[i].split("\t");
        this.list.push({ name: peer[this.order[0]], value: peer[this.order[1]], desc: peer[this.order[2]] });
      }
      this.curr = 0;
      this.aside = false;
      this.input = false;
      window.addEventListener('keyup',this.handleKeyup);
    },
    show() {
      this.value = !this.value;
    },
    handleKeyup(event){
        const e = event || window.event || arguments.callee.caller.arguments[0]
        if(!e) return
        switch (e.keyCode) {
          case 37:
            this.preWord();
            break;
          case 38:
            this.value = true;
            break;
          case 39:
            this.nextWord();
            break;
          case 40:
            this.value = false;
            break;
          default:
            break;
        }
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
.title {
  width: 100%;
  text-align: center;
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
.textColor{
  color: rgb(240, 117, 117);
}
</style>
