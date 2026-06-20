<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '@/composables/useGameState'
import StatusBar from './StatusBar.vue'
import NestScene from './NestScene.vue'
import WeatherOverlay from './WeatherOverlay.vue'
import BirdCard from './BirdCard.vue'
import EventModal from './EventModal.vue'
import ExpeditionRecords from './ExpeditionRecords.vue'
import { WEATHER_COLORS, EXPEDITION_AREAS } from '@/utils/constants'
import type { ExpeditionArea } from '@/types/game'

const router = useRouter()
const {
  state, allAdults, aliveCount,
  collectBerry, feedBird, calmBird, buryBird,
  releaseBirds, keepAndBreed, returnToStart, tryLoadGame,
  startExpedition, canStartExpedition,
} = useGameState()

onMounted(() => {
  if (state.phase === 'start') {
    tryLoadGame()
    if (state.phase === 'start') {
      router.push('/')
    }
  }
})

watch(
  () => state.phase,
  (phase) => {
    if (phase === 'ended') {
      setTimeout(() => router.push('/end'), 1000)
    }
  }
)

const handleSelectBird = (id: string) => {
  state.selectedBirdId = state.selectedBirdId === id ? undefined : id
}

const handleCollect = (id: string) => {
  const val = collectBerry(id)
  if (val > 0) {
  }
}

const handleStartExpedition = (birdId: string, area: ExpeditionArea) => {
  startExpedition(birdId, area)
}

const showRecords = ref(false)

const totalExpeditions = computed(() => state.expeditionRecords.length)
const totalClues = computed(() => state.collectedClues.length)
const totalExpeditionFood = computed(() =>
  state.expeditionRecords.reduce((sum, r) => sum + r.totalFoodGained, 0)
)
</script>

<template>
  <div
    class="w-full h-full bg-gradient-to-br from-forest-dark via-forest to-forest-light relative overflow-hidden"
  >
    <div
      :class="['absolute inset-0 transition-colors duration-1000 bg-gradient-to-b', WEATHER_COLORS[state.currentWeather]]"
    />
    <WeatherOverlay :weather="state.currentWeather" />

    <div class="relative z-20 w-full h-full flex flex-col p-4 gap-4 max-w-[1400px] mx-auto">
      <StatusBar :state="state" />

      <div class="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-3 order-2 lg:order-1 min-h-0 flex flex-col gap-3 overflow-y-auto scrollbar-hide">
          <div class="flex items-center justify-between px-1">
            <div class="font-display text-lg text-amber-300 flex items-center gap-2">
              <span>🐦</span> 小鸟档案
            </div>
            <button
              v-if="totalExpeditions > 0"
              class="text-[10px] px-2 py-1 rounded-lg transition-all flex items-center gap-1"
              :class="showRecords ? 'bg-cyan-500/30 text-cyan-200' : 'bg-white/10 text-white/70 hover:bg-white/20'"
              @click="showRecords = !showRecords"
            >
              📜 探险记录
              <span v-if="totalExpeditions > 0" class="bg-white/20 px-1.5 rounded-full">
                {{ totalExpeditions }}
              </span>
            </button>
          </div>

          <ExpeditionRecords
            v-if="showRecords"
            :records="state.expeditionRecords"
            :clues="state.collectedClues"
            :total-food="totalExpeditionFood"
            @close="showRecords = false"
          />

          <div v-if="totalExpeditions > 0 && !showRecords" class="glass rounded-xl p-3 flex items-center justify-around text-xs">
            <div class="text-center">
              <div class="text-amber-300 font-bold">{{ totalExpeditions }}</div>
              <div class="text-white/50 text-[10px]">探险次数</div>
            </div>
            <div class="w-px h-8 bg-white/10" />
            <div class="text-center">
              <div class="text-green-300 font-bold">+{{ totalExpeditionFood }}</div>
              <div class="text-white/50 text-[10px]">累计食物</div>
            </div>
            <div class="w-px h-8 bg-white/10" />
            <div class="text-center">
              <div class="text-cyan-300 font-bold">{{ totalClues }}</div>
              <div class="text-white/50 text-[10px]">收集线索</div>
            </div>
          </div>

          <div class="flex flex-col gap-3 pb-4">
            <BirdCard
              v-for="bird in state.birds"
              :key="bird.id"
              :bird="bird"
              :selected="state.selectedBirdId === bird.id"
              :food-stock="state.foodStock"
              :weather="state.currentWeather"
              :can-expedition="canStartExpedition(bird.id)"
              @select="handleSelectBird(bird.id)"
              @feed="((amt: number) => feedBird(bird.id, amt))"
              @calm="calmBird(bird.id)"
              @bury="buryBird(bird.id)"
              @start-expedition="(area) => handleStartExpedition(bird.id, area)"
            />
          </div>
        </div>

        <div class="lg:col-span-6 order-1 lg:order-2 relative rounded-3xl overflow-hidden bg-black/20 border border-white/10 backdrop-blur-sm min-h-[400px]">
          <NestScene
            :birds="state.birds"
            :berries="state.berries"
            :selected-bird-id="state.selectedBirdId"
            @select-bird="handleSelectBird"
            @collect-berry="handleCollect"
          />
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 glass rounded-xl px-4 py-2 text-xs text-white/80 flex items-center gap-2">
            <span class="animate-sparkle">✨</span>
            点击闪烁的浆果收集食物！
            <span class="animate-sparkle" style="animation-delay: 0.5s">✨</span>
          </div>
        </div>

        <div class="lg:col-span-3 order-3 min-h-0 flex flex-col rounded-2xl bg-black/20 border border-white/10">
          <EventModal
            :state="state"
            :all-adults="allAdults"
            @release="releaseBirds"
            @breed="keepAndBreed"
          />
        </div>
      </div>

      <div class="flex justify-center gap-3">
        <button
          class="px-4 py-2 glass rounded-xl text-white/80 text-sm hover:bg-white/20 transition-all flex items-center gap-1.5"
          @click="returnToStart(); router.push('/')"
        >
          <span>🏠</span> 返回主页
        </button>
        <div class="glass rounded-xl px-4 py-2 text-white/80 text-sm flex items-center gap-2">
          <span>💚</span> 存活 {{ aliveCount }} 只
          <span class="mx-1 text-white/30">|</span>
          孵化 {{ state.totalHatched }}
          <span class="mx-1 text-white/30">|</span>
          离世 {{ state.totalDied }}
        </div>
      </div>
    </div>
  </div>
</template>
