<template>
  <div class="album">
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
          <span class="titleIcon">专辑</span>
          <span class="titleContent">{{ title }}</span>
        </div>
        <div class="creator">
          <img :src="creatorIcon" alt="" class="creatorIcon" />
          <span class="name">{{ creator }}</span>
          <span class="date">{{ date + " 发布" }}</span>
        </div>
        <div class="btn">
          <el-button type="primary" class="play-left play" @click="playAll">
            <i class="el-icon-caret-right icon"></i>
            播放全部
          </el-button>
          <el-button type="primary" class="play-right play" @click="playAll">
            <i class="el-icon-plus"> </i>
          </el-button>
        </div>
        <div class="info">
          <span class="count">歌曲：{{ songs.length }}</span>
        </div>
      </div>
    </div>
    <div class="body" v-if="!error && onLoad && isTableAlive">
      <div class="titleBox">
        <span class="title">歌曲列表</span>
        <div class="inputBox">
          <input
            class="input"
            type="text"
            v-model="inputKey"
            @focus="searchFocus"
            @blur="searchBlur"
            @keyup="search"
          />
          <i class="el-icon-search"></i>
        </div>
      </div>
      <el-table
        class="table"
        :data="songs"
        style="width: 100%"
        :default-sort="{ prop: '', order: 'descending' }"
        @cell-dblclick="songClick"
      >
        <!-- 占位 -->
        <el-table-column prop="" label="" width="20"></el-table-column>
        <!-- index -->
        <el-table-column
          prop=""
          label=""
          width="50"
          type="index"
          :index="formatIndex"
        >
        </el-table-column>
        <!-- favorite -->
        <el-table-column prop="" label="" width="70">
          <template #default="scope">
            <i
              :id="scope.row.id"
              :class="checkFavorite(scope) + ' ' + `favorite`"
              :style="{ color: checkFavorite(scope, true) }"
              @click="favorite(scope)"
            ></i>
          </template>
        </el-table-column>
        <!-- 音乐标题 -->
        <el-table-column
          prop="name"
          label="音乐标题"
          sortable
          width="400"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <!-- 歌手 -->
        <el-table-column
          prop="artist"
          label="歌手"
          sortable
          width="280"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <!-- 专辑 -->
        <el-table-column
          prop="album"
          label="专辑"
          sortable
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="duration" label="时长" sortable width="120">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script src="./album.js"></script>

<style src="./album.css" scoped></style>