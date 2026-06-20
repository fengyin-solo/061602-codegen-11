<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Bird, ExpeditionArea, Weather } from '@/types/game'
import { EXPEDITION_AREAS, WEATHER_NAMES, PERSONALITY_EMOJI, PERSONALITY_NAMES } from '@/utils/constants'

const props = defineProps<{
  bird: Bird
  weather: Weather
  canExpedition: { ok: boolean; reason?: string }
}>()

const emit = defineEmits<{
  (e: 'start', area: ExpeditionArea): void
}>()

const selectedArea = ref<ExpeditionArea | null>(null)
const showHistory = ref(false)
const showClues = ref(false)

const isExploring = computed(() => {
  return props.bird.expedition?.status === 'exploring' || props.bird.expedition?.status === 'returning'
})

const progress = computed(() => {
  if (!props.bird.expedition) return 0
  return Math.round(props.bird.expedition.progress * 100)
})

const timeLeft = computed(() => {
  if (!props.bird.expedition) return 0
  const ms = Math.max(0, props.bird.expedition.returnTime - Date.now())
  return Math.ceil(ms / 1000)
})

const currentExpArea = computed(() => {
  if (!props.bird.expedition) return null
  return EXPEDITION_AREAS[props.bird.expedition.area]
})

const areaList = computed(() => {
  return (Object.keys(EXPEDITION_AREAS) as ExpeditionArea[]).map(key => {
    const cfg = EXPEDITION_AREAS[key]
    const weatherMod = cfg.weatherMod[props.weather]
    return {
      key,
      ...cfg,
      weatherMod,
      weatherOk: weatherMod >= 0.7,
    }
  })
})

const latestHistory = computed(() => {
  const history = props.bird.expedition?.history || []
  return history.slice(0, 5)
})

const handleSelectArea = (area: ExpeditionArea) => {
  if (!props.canExpedition.ok) return
  selectedArea.value = selectedArea.value === area ? null : area
}

const handleStart = () => {
  if (!selectedArea.value || !props.canExpedition.ok) return
  emit('start', selectedArea.value)
  selectedArea.value = null
}

const eventTypeColors: Record<string, string> = {
  find: 'text-green-300',
  clue: 'text-amber-300',
  danger: 'text-red-300',
  encounter: 'text-blue-300',
  weather: 'text-cyan-300',
}
</script>

<template>
  <div class="space-y-3">
    <div v-if="isExploring && bird.expedition" class="glass rounded-2xl p-4 border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="text-2xl animate-bounce">{{ currentExpArea?.emoji }}</span>
          <div>
            <div class="font-bold text-cyan-300">探险中...</div>
            <div class="text-xs text-white/60">{{ currentExpArea?.name }}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-lg font-bold text-white">{{ progress }}%</div>
          <div class="text-xs text-white/60">约{{ timeLeft }}秒</div>
        </div>
      </div>

      <div class="w-full h-2 bg-black/40 rounded-full overflow-hidden mb-3">
        <div
          class="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 transition-all duration-200"
          :style="{ width: `${progress}%` }"
        />
      </div>

      <div
        v-if="bird.expedition.currentEvent"
        class="animate-pop-in bg-black/40 rounded-xl p-3 border border-white/10"
      >
        <div class="flex items-start gap-2">
          <span class="text-2xl">{{ bird.expedition.currentEvent.emoji }}</span>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-sm" :class="eventTypeColors[bird.expedition.currentEvent.type]">
              {{ bird.expedition.currentEvent.title }}
            </div>
            <div class="text-xs text-white/70 mt-0.5">{{ bird.expedition.currentEvent.description }}</div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="bg-black/20 rounded-xl p-3 text-center text-xs text-white/50"
      >
        🗺️ 正在探索中，期待惊喜吧~
      </div>
    </div>

    <template v-else>
      <div class="flex items-center justify-between">
        <div class="font-display text-sm text-amber-300 flex items-center gap-1.5">
          <span>🗺️</span> 巢外探险
        </div>
        <div class="flex gap-1.5">
          <button
            class="text-[10px] px-2 py-1 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-all"
            :class="showHistory ? 'bg-amber-500/30 text-amber-200' : ''"
            @click="showHistory = !showHistory"
          >
            📋 记录
          </button>
        </div>
      </div>

      <div v-if="!canExpedition.ok" class="bg-amber-500/10 border border-amber-400/20 rounded-xl p-3 text-xs text-amber-200">
        ⚠️ {{ canExpedition.reason }}
      </div>

      <div v-else class="grid grid-cols-2 gap-2">
        <button
          v-for="area in areaList"
          :key="area.key"
          class="p-3 rounded-xl text-left transition-all border"
          :class="[
            selectedArea === area.key
              ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30 border-amber-400/50 scale-[1.02]'
              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20',
            !area.weatherOk ? 'opacity-60' : '',
          ]"
          @click="handleSelectArea(area.key)"
        >
          <div class="flex items-center gap-1.5 mb-1">
            <span class="text-xl">{{ area.emoji }}</span>
            <span class="font-bold text-white text-sm">{{ area.name }}</span>
          </div>
          <div class="text-[10px] text-white/50 leading-tight mb-2 line-clamp-2">
            {{ area.description }}
          </div>
          <div class="flex flex-wrap gap-1 text-[9px]">
            <span class="px-1.5 py-0.5 rounded-full bg-white/10">
              ⚠️ 风险{{ '⭐'.repeat(area.riskLevel) }}
            </span>
            <span
              class="px-1.5 py-0.5 rounded-full"
              :class="area.weatherOk ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'"
            >
              天气{{ area.weatherOk ? '适宜' : '不佳' }}
            </span>
          </div>
        </button>
      </div>

      <div
        v-if="selectedArea && canExpedition.ok"
        class="bg-gradient-to-br from-amber-500/15 to-orange-500/15 border border-amber-400/30 rounded-xl p-3"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-xl">{{ EXPEDITION_AREAS[selectedArea].emoji }}</span>
            <span class="font-bold text-amber-200 text-sm">{{ EXPEDITION_AREAS[selectedArea].name }}</span>
          </div>
          <div class="text-[10px] text-white/60">
            时长约{{ Math.ceil(EXPEDITION_AREAS[selectedArea].baseDuration / 1000) }}秒
          </div>
        </div>
        <div class="text-[10px] text-white/70 mb-3">
          💰 奖励倍率 ×{{ EXPEDITION_AREAS[selectedArea].rewardMultiplier }}｜
          {{ PERSONALITY_EMOJI[bird.personality] }} {{ PERSONALITY_NAMES[bird.personality] }}性格
        </div>
        <button
          class="w-full py-2 rounded-xl font-bold text-sm btn-3d
                 bg-gradient-to-r from-amber-500 to-orange-500 text-white
                 hover:from-amber-400 hover:to-orange-400 active:scale-95 transition-all"
          @click="handleStart"
        >
          🚀 出发探险！
        </button>
      </div>

      <div v-if="showHistory" class="glass rounded-xl p-3 space-y-2">
        <div class="text-xs font-bold text-white/80 mb-2">📋 最近探险记录</div>
        <div v-if="latestHistory.length === 0" class="text-[10px] text-white/40 text-center py-3">
          还没有探险记录~
        </div>
        <div
          v-for="rec in latestHistory"
          :key="rec.id"
          class="bg-black/30 rounded-lg p-2 text-[10px]"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-white/80">
              {{ EXPEDITION_AREAS[rec.area].emoji }} {{ EXPEDITION_AREAS[rec.area].name }}
            </span>
            <span
              class="px-1.5 py-0.5 rounded-full text-[9px]"
              :class="rec.success ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'"
            >
              {{ rec.success ? '成功' : '艰难' }}
            </span>
          </div>
          <div class="text-white/60 flex flex-wrap gap-x-2 gap-y-0.5">
            <span>📦 食物+{{ rec.totalFoodGained }}</span>
            <span>📜 线索{{ rec.totalCluesFound.length }}</span>
            <span>❤️ {{ rec.healthDelta >= 0 ? '+' : '' }}{{ rec.healthDelta }}</span>
            <span>🎭 {{ rec.events.length }}事件</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
