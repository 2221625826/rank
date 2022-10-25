<template>
  <el-container class="common-layout">
    <el-aside width="15%" v-if="this.aside">
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
              <span>{{ this.list[this.randoms[this.curr]].name }}</span>
            </div>
          </template>
          <div class="card-center" v-if="this.curr >= 0">
            <span v-if="this.value">{{ this.list[this.randoms[this.curr]].value }}</span>
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
        <el-button
          size="large"
          type="primary"
          round
          @click="this.value = !this.value"
          >显示</el-button
        >
        <el-button size="large" type="primary" round @click="this.nextWord"
          >下一个</el-button
        >
      </div>
    </el-main>
  </el-container>
  <el-dialog v-model="input">
    <el-input v-model="text" :rows="8" type="textarea" />
    <div class="butList" style="padding-top: 20px">
      <el-button type="primary" round @click="this.input = false"
        >取消</el-button
      >
      <el-button type="primary" round @click="this.submit">确认</el-button>
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
    random(length) {
      this.randoms = [...Array(length).keys()].sort(() => Math.random() - 0.5);
    },
    submit() {
      let temp = this.text.split("\n");
      this.random(temp.length);
      this.list = [];
      for (var i = 0; i < temp.length; i++) {
        let peer = temp[i].split(" ");
        this.list.push({ name: peer[0], value: peer[1] });
      }
      this.curr = 0;
      this.aside = false;
      this.input = false;
      window.addEventListener('keyup',this.handleKeyup);
    },
    handleKeyup(event){
        const e = event || window.event || arguments.callee.caller.arguments[0]
        if(!e) return
        const keyCode = e.keyCode;
        if (keyCode == 37) {
          this.preWord();
        } else if(keyCode == 39) {
          this.nextWord();
        } else if(keyCode == 32) {
          this.value = !this.value;
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
  font-size: 60px;
}
</style>
