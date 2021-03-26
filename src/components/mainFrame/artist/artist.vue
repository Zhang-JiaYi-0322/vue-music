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
    <el-tabs class="tab" v-if="onLoad" v-model="index">
      <el-tab-pane label="专辑" name="first">
        <el-table
          class="table"
          :data="albums"
          :show-header="false"
          stripe
          style="width: 100%"
          @row-click="rowClick"
        >
          <el-table-column prop="" label="" width="30"></el-table-column>
          <!-- img -->
          <el-table-column prop="" label="" width="100">
            <template #default="scope">
              <div class="img">
                <div class="back"></div>
                <img :src="scope.row.picUrl" alt="" class="cover" />
              </div>
            </template>
          </el-table-column>
          <!-- name -->
          <el-table-column prop="" label="" width="500">
            <template #default="scope">
              <span class="name">{{ scope.row.name }}</span>
              <span class="alias" v-if="scope.row.alias.length > 0"
                >（{{ scope.row.alias[0] }}）</span
              >
            </template>
          </el-table-column>
          <!-- size -->
          <el-table-column prop="" label="" width="">
            <template #default="scope">
              <span class="size">{{ scope.row.size }}首</span>
            </template>
          </el-table-column>
          <!-- publishTime -->
          <el-table-column prop="" label="" width="">
            <template #default="scope">
              <span class="time"
                >发布时间： {{ formatDate(scope.row.publishTime) }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="" label="" width="50"></el-table-column>
        </el-table>
      </el-tab-pane>
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