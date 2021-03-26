<template>
  <div class="page">
    <loading
      v-if="!error && !onLoad"
      text="拼命加载中"
      icon="el-icon-loading"
    ></loading>
    <loading v-if="error" text="加载失败" icon="el-icon-close"></loading>
    <div class="title" v-if="onLoad">
      <div class="cover">
        <img :src="titleInfo.cover" alt="" class="img" />
      </div>
      <div class="info">
        <h2 class="name">{{ titleInfo.name }}</h2>
        <span class="musicSize">单曲数：{{ titleInfo.musicSize }}</span>
        <span class="albumSize">专辑数：{{ titleInfo.albumSize }}</span>
      </div>
    </div>
    <el-tabs class="tab">
      <el-tab-pane label="专辑" name="first">专辑</el-tab-pane>
      <el-tab-pane label="歌手详情" name="second">
        <div class="contentBox">
          <div class="infoBox" v-for="(item, index) in detail" :key="index">
            <h3 class="label">{{ item.ti }}</h3>
            <div class="box">
              <span
                class="word"
                :style="{
                  'text-indent':
                    _index == 0 && item.ti == '简介' ? '24px' : '0',
                }"
                v-for="(word, _index) in item.txt.split('\n')"
                :key="_index"
                >{{ word }}</span
              >
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script src="./artist.js"></script>

<style src="./artist.css" scoped></style>