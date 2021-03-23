<template>
  <div class="page">
    <h2>发现音乐</h2>
    <loading
      v-if="!error && !onLoad"
      text="拼命加载中"
      icon="el-icon-loading"
    ></loading>
    <loading v-if="error" text="加载失败" icon="el-icon-close"></loading>
    <div v-if="onLoad" class="container">
      <!-- 轮播图 -->
      <el-carousel :interval="4000" type="card" height="180px" class="carousel">
        <el-carousel-item
          v-for="item in banner"
          :key="item"
          class="carousel-item"
        >
          <a href="" @click.prevent="carouselClick(item)">
            <img :src="item.pic" alt="" srcset="" />
            <span class="mark" :style="{ 'background-color': item.titleColor }">
              {{ item.typeTitle }}
            </span>
          </a>
        </el-carousel-item>
      </el-carousel>
      <!-- 推荐歌单 -->
      <div class="playList">
        <h3>推荐歌单</h3>
        <div class="box">
          <a
            class="item"
            v-for="(item, index) in playList"
            :key="index"
            @click.prevent="playListClick(item)"
          >
            <img :src="item.picUrl" alt="" srcset="" />
            <span>{{ item.name }}</span>
            <div class="playCount">
              <i class="el-icon-caret-right icon"></i>
              <span class="count">{{ item.playCount }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./foundMusic.js"></script>

<style src="./foundMusic.css" scoped></style>

