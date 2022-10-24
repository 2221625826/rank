<template>
  <el-container class="common-layout">
    <el-aside width="15%" v-if="this.aside">
      <el-table :data="list" height="80%">
        <el-table-column prop="name" label="num" />
      </el-table>
      <div class="butList">
        <el-button size="large" type="primary" round @click="this.input = true">导入</el-button>
      </div>
    </el-aside>
    <el-main>
      <div class="main">
        <el-card class="card">
          <template #header>
            <div class="card-center">
              <span>{{ this.list[this.random[this.curr]].name }}</span>
            </div>
          </template>
          <div class="card-center">
            <span v-if="this.value">{{ this.list[this.curr].value }}</span>
          </div>
        </el-card>
      </div>
      <div class="butList">
        <el-button size="large" type="primary" round @click="this.pre"
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
        <el-button size="large" type="primary" round @click="this.next"
          >下一个</el-button
        >
      </div>
    </el-main>
  </el-container>
  <el-dialog v-model="input">
    <el-input
    v-model="textarea"
    :rows="8"
    type="textarea"
  />
  <div class="butList">
        <el-button size="large" type="primary" round
          >取消</el-button
        >
        <el-button size="large" type="primary" round
          >确认</el-button
        >
      </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: 1, value: 2 },
        { name: 2, value: 3 },
        { name: 3, value: 4 },
      ],
      random: [],
      aside: true,
      value: false,
      input: false,
      curr: 0,
    };
  },
  methods: {
    next() {
      if (this.curr < this.list.length - 1) {
        this.curr = this.curr + 1;
        this.value = false;
      }
    },
    pre() {
      if (this.curr > 0) {
        this.curr = this.curr - 1;
        this.value = false;
      }
    },
    random(length) {
      this.random = [...Array(length).keys()];
      this.random = this.random.sort(() => (Math.random() - 0.5));
    }
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
  padding:0;
	border:0;
  margin: 0;
}
li {
  list-style: none;
}
.butList {
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  height: 30%;
  width: 25%;
}
.card-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
