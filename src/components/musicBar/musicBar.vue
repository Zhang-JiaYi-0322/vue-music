<template>
  <div class="musicBar">
    <div class="info">
      <img :src="playList[index].imgUrl" alt="" class="icon" />
      <div class="rows">
        <span class="title">{{ playList[index].title }}</span>
        <span class="artist">{{ playList[index].artist }}</span>
      </div>
    </div>
    <div class="controller">
      <div class="button">
        <!-- 切换播放状态 -->
        <i :class="playModeList[playMode]" @click="changePlayMode"></i>
        <!-- 前一首 -->
        <i class="icon ion-skip-backward btn" @click="skipPlay(-1)"></i>
        <!-- 播放 / 暂停 -->
        <i
          :class="`icon ${playing ? `ion-pause` : `ion-play`} btn play`"
          @click="changePlayState"
        ></i>
        <!-- 后一首 -->
        <i class="icon ion-skip-forward btn" @click="skipPlay(1)"></i>
        <!-- favorite -->
        <i
          :class="`${
            playList[index].favorite ? `el-icon-star-on` : `el-icon-star-off`
          } favorite btn`"
          @click="favorite"
          ref="favorite"
        ></i>
      </div>
      <!-- 进度条 -->
      <div class="processBox">
        <span class="playedTime">{{ playedTimeString }}</span>
        <el-slider
          v-model="playedTime"
          class="process"
          color="rgb(236, 65, 65)"
          :show-tooltip="false"
          :max="duration"
          :format-tooltip="valueChange"
        ></el-slider>
        <span class="duration">{{ durationString }}</span>
      </div>
    </div>
    <div class="btn">
      <!-- 音量 -->
      <div class="sound">
        <i class="icon ion-android-volume-down soundIcon"></i>
        <el-slider class="soundSlider" v-model="sound"></el-slider>
      </div>
      <!-- list -->
      <i class="el-icon-s-unfold"></i>
    </div>
  </div>
</template>

<script src="./musicBar.js"></script>

<style src="./musicBar.css" scoped></style>