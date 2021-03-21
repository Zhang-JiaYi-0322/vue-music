<template>
  <div class="search">
    <input
      type="text"
      @focus="getFocus"
      @blur="loseFocus"
      @keyup.enter="search"
      v-model="searchKey"
      ref="input"
    />
    <i class="el-icon-search"></i>
    <div
      class="searchContainer"
      v-if="searchFocus"
      @mouseenter="onContent = true"
      @mouseleave="onContent = false"
    >
      <el-scrollbar class="scrollBar" style="height: 100%">
        <div class="history">
          <div class="bar">
            <span>搜索历史</span>
            <a
              href="#"
              class="el-icon-delete delete"
              @click.prevent="clearHistory"
            ></a>
            <a href="#" class="showAll" @click.prevent="showAllHistory"
              >查看全部</a
            >
          </div>
          <div
            class="historyBox"
            :style="showAll ? { height: 'auto', 'max-height': '999px' } : {}"
          >
            <span class="noHistory" v-if="history.length == 0"
              >暂无历史记录</span
            >
            <el-button
              class="historyBtn"
              round
              size="mini"
              v-for="(item, index) in history"
              :key="index"
              @click="route(item)"
              >{{ item }}</el-button
            >
          </div>
        </div>
        <div class="hot">
          <h6>热搜榜</h6>
          <span class="error" v-if="error">加载失败</span>
          <ul>
            <li
              v-for="(item, index) in hots"
              :key="index"
              @click="search(item.searchWord)"
            >
              <!-- <router-link
                class="link"
                :to="'/searchResult/' + item.searchWord"
                @click="hideSelf"
              ></router-link> -->
              <span
                class="index"
                :style="{ color: index < 3 ? 'red' : 'gray' }"
                >{{ index + 1 }}</span
              >
              <div class="content">
                <div class="row">
                  <strong class="title">{{ item.searchWord }}</strong>
                  <img v-if="item.iconUrl" :src="item.iconUrl" alt="" />
                  <span class="dgree">{{ item.score }}</span>
                </div>
                <span class="info">{{ item.content }}</span>
              </div>
            </li>
          </ul>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" scoped></style> 