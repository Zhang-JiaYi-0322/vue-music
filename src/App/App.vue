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
      <nav>nav</nav>
      <article>
        <router-view></router-view>
      </article>
    </div>
    <!-- 底部播放器 -->
    <footer>footer</footer>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>

