<template>
  <div class="searchResult">
    <el-scrollbar class="scrollBar" style="height: 100%">
      <!-- 搜索结果 -->
      <h4 v-if="onLoad">找到{{ count || 0 }}个结果</h4>
      <!-- 单曲 / 歌手 / 专辑 / 歌单 -->
      <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
        <loading
          v-if="!error && !onLoad"
          text="拼命加载中"
          icon="el-icon-loading"
        ></loading>
        <loading v-if="error" text="加载失败" icon="el-icon-close"></loading>
        <!-- song -->
        <el-tab-pane v-if="onLoad" class="song" label="单曲" name="first">
          <div class="artist" v-if="index == 0" @click="artistClick">
            <h5 class="match">最佳匹配</h5>
            <a href="#" @click.prevent="searchArtist">
              <img :src="song.artist.img1v1Url" alt="" srcset="" />
              <span>歌手：{{ song.artist.name }}</span>
              <i class="el-icon-arrow-right"> </i>
            </a>
          </div>
          <div class="songList" v-if="isTableAlive">
            <el-table
              :data="song.item"
              class="table"
              stripe
              style="width: 100%"
              @cell-click="songClick"
              row-class-name="row"
            >
              <!-- 占位 -->
              <el-table-column prop="" label="" width="20"></el-table-column>
              <!-- index -->
              <el-table-column
                prop=""
                label=""
                width="50"
                type="index"
                :index="indexMethod"
              ></el-table-column>
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
              <el-table-column prop="name" label="音乐标题" width="">
              </el-table-column>
              <!-- 歌手 -->
              <el-table-column
                prop=""
                label="歌手"
                width=""
                :formatter="artistFormatter"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <!-- 专辑 -->
              <el-table-column
                prop=""
                label="专辑"
                width=""
                :formatter="albumFormatter"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <!-- 时长 -->
              <el-table-column
                prop="duration"
                label="时长"
                width="80"
                :formatter="timeFormatter"
              >
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            :small="true"
            :total="count"
            :page-size="100"
            @current-change="changePage"
          >
          </el-pagination>
        </el-tab-pane>
        <!-- artist -->
        <el-tab-pane v-if="onLoad" class="artist" label="歌手" name="second">
          <el-table
            class="table"
            :data="artist.item"
            stripe
            style="width: 100%"
            :show-header="false"
            :row-style="{ height: '80px', overflow: 'hidden' }"
            cell-class-name="cell"
            @row-click="artistListClick"
          >
            <el-table-column class-name="column" prop="default" label="">
              <template #default="scope">
                <img class="pic" :src="scope.row.img1v1Url" alt="" />
                <span class="name">{{ scope.row.name }}</span>
                <i class="icon el-icon-user"> </i>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            :small="true"
            :total="count"
            :page-size="20"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
        <!-- album -->
        <el-tab-pane v-if="onLoad" class="album" label="专辑" name="third">
          <el-table
            class="table"
            :data="album.item"
            stripe
            style="width: 100%"
            :show-header="false"
            :row-style="{ height: '80px', overflow: 'hidden' }"
            cell-class-name="cell"
            @row-click="albumClick"
          >
            <el-table-column class-name="column" prop="default" label="">
              <template #default="scope">
                <img class="pic" :src="scope.row.picUrl" alt="" />
                <span class="name">{{ scope.row.name }}</span>
                <span class="comment">{{
                  scope.row.alias.length > 0 ? `(${scope.row.alias[0]})` : ""
                }}</span>
                <span class="artist">{{ scope.row.artist.name }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            :small="true"
            :total="count"
            :page-size="20"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
        <!-- playList -->
        <el-tab-pane v-if="onLoad" class="playList" label="歌单" name="fourth">
          <el-table
            class="table"
            :data="playList.item"
            stripe
            style="width: 100%"
            :show-header="false"
            :row-style="{ height: '80px', overflow: 'hidden' }"
            cell-class-name="cell"
            @row-click="albumClick"
          >
            <el-table-column
              class-name="column"
              prop="default"
              label=""
              :width="500"
            >
              <template #default="scope">
                <img class="pic" :src="scope.row.coverImgUrl" alt="" />
                <span class="name">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              class-name="count"
              prop="trackCount"
              label=""
              :formatter="playlistCountFormatter"
            ></el-table-column>
            <el-table-column prop="default" label="">
              <template #default="scope">
                <span class="by">by</span>
                <span class="creator">{{ scope.row.creator.nickname }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            :small="true"
            :total="count"
            :page-size="20"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style>