<template>
  <div>
    <div class="musicBar">
      <!-- 左侧 -->
      <div class="info">
        <img :src="playList[index].imgUrl" alt="" class="icon" />
        <div class="rows">
          <span class="title">{{ playList[index].name }}</span>
          <span class="artist">{{ playList[index].artist }}</span>
        </div>
      </div>
      <!-- 中间 -->
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
            @change="timeChange"
          ></el-slider>
          <!-- :format-tooltip="formatTime" -->
          <span class="duration">{{ durationString }}</span>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="btn">
        <!-- 音量 -->
        <div class="sound">
          <i
            :class="
              sound == 0
                ? `icon ion-android-volume-mute soundIcon`
                : `icon ion-android-volume-down soundIcon`
            "
            @click="soundClick"
          ></i>
          <el-slider class="soundSlider" v-model="sound"></el-slider>
        </div>
        <!-- list -->
        <i class="el-icon-s-unfold list"></i>
      </div>

      <!-- audio -->
      <audio
        ref="audio"
        class="audio"
        :src="url"
        autoplay
        controls
        :currentTime="currentTime"
        :volume="sound / 100"
        @timeupdate="timeupdate"
        @canplay="playing = true"
      ></audio>
    </div>
    <!-- 播放列表 -->
    <div class="playList">
      <el-scrollbar class="scrollBar" style="height: 100%, width:100%">
        <span class="title">播放列表</span>
        <div class="row">
          <span class="count">总计{{ count }}首</span>
          <div class="button" @click="clearPlayList">
            <i class="el-icon-delete"></i>
            <span>清空</span>
          </div>
        </div>
        <el-table
          class="table"
          row-class-name="tableRow"
          :show-header="false"
          :data="playList"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="" label="" width="20">
            <template #default="scope">
              <i
                v-if="isPlaying(scope.row.id)"
                :class="`icon ${playing ? `ion-pause` : `ion-play`} play`"
              ></i>
            </template>
          </el-table-column>
          <el-table-column prop="" label="" width="200">
            <template #default="scope">
              <span
                :style="{
                  color: isPlaying(scope.row.id) ? 'rgb(236, 65, 65)' : 'black',
                }"
                class="text"
              >
                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="" width="100">
            <template #default="scope">
              <span
                :style="{
                  color: isPlaying(scope.row.id) ? 'rgb(236, 65, 65)' : 'black',
                }"
                class="text"
              >
                {{ scope.row.artist }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="" label="" width="15"> </el-table-column>
          <el-table-column prop="time" label="" width=""> </el-table-column>
          <el-table-column prop="" label="" width="5"> </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
  </div>
</template> 

<script src="./musicBar.js"></script>

<style src="./musicBar.css" scoped></style>