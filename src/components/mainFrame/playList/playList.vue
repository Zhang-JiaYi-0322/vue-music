<template>
  <div class="playList">
    <loading
      v-if="!error && !onLoad"
      text="拼命加载中"
      icon="el-icon-loading"
    ></loading>
    <loading v-if="error" text="加载失败" icon="el-icon-close"></loading>
    <div class="head" v-if="!error && onLoad">
      <img :src="coverImg" alt="cover" />
      <div class="content">
        <div class="title">
          <span class="titleIcon">歌单</span>
          <span class="titleContent">{{ title }}</span>
        </div>
        <div class="creator">
          <img :src="creatorIcon" alt="" class="creatorIcon" />
          <span class="name">{{ creator }}</span>
          <span class="date">{{ date + " 创建" }}</span>
        </div>
        <div class="btn">
          <el-button type="primary" class="play-left play">
            <i class="el-icon-caret-right icon"></i>
            播放全部
          </el-button>
          <el-button type="primary" class="play-right play">
            <i class="el-icon-plus"> </i>
          </el-button>
          <el-button
            type="primary"
            class="saved"
            :disabled="!canSave"
            :style="getSavedBtnStyle()"
          >
            <i :class="getSavedBtnIcon()"></i>
            {{ getSavedBtnWord() }}
          </el-button>
        </div>
        <div class="info">
          <span class="count">歌曲：{{ songs.length }}</span>
        </div>
      </div>
    </div>
    <div class="body" v-if="!error && onLoad"></div>
  </div>
</template>

<script src="./playList.js"></script>

<style src="./playList.css" scoped></style>