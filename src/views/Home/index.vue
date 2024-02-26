<template>
  <div class="home">
    <van-search class="search" v-model="name" placeholder="请输入搜索关键词" shape="round" />
    <div class="parking" v-for="parking in list">
      <a
        v-if="isAndroid()"
        class="name"
        :href="`amapuri://route/plan?sourceApplication=xiamen-parking&dname=${parking.address}`"
        ><h4>{{ parking.name }}</h4></a
      >
      <a
        v-else-if="isIOS()"
        class="name"
        :href="`iosamap://path?sourceApplication=xiamen-parking&dname=${parking.address}`"
        ><h4>{{ parking.name }}</h4>
      </a>
      <h4 v-else>{{ parking.name }}</h4>
      <table>
        <tr v-for="p in parking.price">
          <td v-html="p[0]"></td>
          <td v-html="p[1]"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { parkingList } from '@/config'
import { Search as VanSearch } from 'vant'
import { isAndroid, isIOS } from '@/utils/utils'

let name = $ref('')
let list = $computed(() => parkingList.filter((p) => p.name.includes(name) || p.address.includes(name)))
</script>

<style lang="scss" scoped>
.home {
  padding-top: 30px;

  .search {
    position: fixed;
    width: 375px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .parking {
    width: 350px;
    margin: 0 auto 20px;

    .name {
      color: #000000;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      td {
        white-space: pre-wrap;
        border: 1px solid black;

        &:first-child {
          width: 120px;
        }

        :deep(a) {
          font-weight: bold;
          text-decoration: underline;
        }

        :deep(img) {
          width: 100%;
        }
      }
    }
  }
}
</style>
