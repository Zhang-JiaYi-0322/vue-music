<template>
  <div class="musicBar">
    <div class="info">
      <img :src="imgUrl" alt="" class="icon" />
      <div class="rows">
        <span class="title">{{ title }}</span>
        <span class="artist">{{ artist }}</span>
      </div>
    </div>
    <div class="controller">
      <div class="button">
        <i class="icon ion-shuffle btn"></i>
        <i class="icon ion-skip-backward btn"></i>
        <div class="playBackground">
            <i class="icon ion-play btn play"></i>
        </div>
        <i class="icon ion-skip-forward btn"></i>
        <i class="el-icon-star-off favorite btn"></i>
      </div>
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
    <div class="btn">3</div>
  </div>
</template>

<script src="./musicBar.js"></script>

<style src="./musicBar.css" scoped></style>