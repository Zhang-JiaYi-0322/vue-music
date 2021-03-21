<template>
  <div class="pageContainer">
    <!-- 顶部 -->
    <header>
      <!-- logo -->
      <div class="logo">
        <img src="../assets/AppLogo.png" alt="logo" />
        <span>叽歪音乐</span>
      </div>
      <!-- 搜索框 -->
      <search class="search"></search>
    </header>
    <!-- 内容部分 -->
    <div class="container">
      <nav>
        <el-tree
          :data="navData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :default-expand-all="true"
          class="tree"
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <i
                :class="getClass(data)"
                :style="{ color: data.strong ? '' : '#666' }"
              ></i>
              <span class="label" :style="getStyle(data)">{{
                labelFormatter(node.label)
              }}</span>
            </div>
          </template>
        </el-tree>
      </nav>
      <article>
        <el-scrollbar class="scrollBar" style="height: 100%, width:100%">
          <router-view class="content"></router-view>
        </el-scrollbar>
      </article>
    </div>
    <!-- 底部播放器 -->
    <footer>footer</footer>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>

