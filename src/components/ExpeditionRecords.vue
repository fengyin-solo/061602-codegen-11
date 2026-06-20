<script setup lang="ts">
import { computed } from 'vue'
import type { ExpeditionRecord } from '@/types/game'
import { EXPEDITION_AREAS } from '@/utils/constants'

const props = defineProps<{
  records: ExpeditionRecord[]
  clues: string[]
  totalFood: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const recentRecords = computed(() => props.records.slice(0, 20))

const formatTime = (ts: number) => {
  return new Date(ts).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const eventTypeBadge: Record<string, { label: string; class: string }> = {
  find: { label: '发现', class: 'bg-green-500/30 text-green-200' },
  clue: { label: '线索', class: 'bg-amber-500/30 text-amber-200' },
  danger: { label: '危险', class: 'bg-red-500/30 text-red-200' },
  encounter: { label: '邂逅', class: 'bg-blue-500/30 text-blue-200' },
  weather: { label: '天气', class: 'bg-cyan-500/30 text-cyan-200' },
}
</script>

<template>
  <div class="glass rounded-2xl p-3 border border-cyan-400/20 animate-pop-in">
    <div class="flex items-center justify-between mb-3">
      <div class="font-bold text-cyan-200 text-sm flex items-center gap-1.5">
        <span>📜</span> 探险档案库
      </div>
      <button
        class="text-[10px] px-2 py-0.5 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition-all"
        @click="emit('close')"
      >
        收起
      </button>
    </div>

    <div class="space-y-3 max-h-[400px] overflow-y-auto scrollbar-hide pr-1">
      <div v-if="clues.length > 0" class="bg-amber-500/10 border border-amber-400/20 rounded-xl p-2.5">
        <div class="text-[11px] font-bold text-amber-200 mb-1.5 flex items-center gap-1">
          <span>🔮</span> 已收集线索 ({{ clues.length }})
        </div>
        <div class="space-y-1.5">
          <div
            v-for="(clue, idx) in clues"
            :key="idx"
            class="text-[10px] text-amber-100/80 bg-black/30 rounded-lg p-2 leading-relaxed"
          >
            {{ clue }}
          </div>
        </div>
      </div>

      <div v-if="records.length === 0" class="text-center text-white/40 text-xs py-6">
        <div class="text-3xl mb-2 opacity-30">🗺️</div>
        还没有探险记录，快让亚成鸟出发吧！
      </div>

      <div
        v-for="rec in recentRecords"
        :key="rec.id"
        class="bg-black/30 rounded-xl p-2.5 border border-white/5"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-1.5">
            <span class="text-lg">{{ EXPEDITION_AREAS[rec.area].emoji }}</span>
            <div>
              <div class="text-xs font-bold text-white/90">{{ EXPEDITION_AREAS[rec.area].name }}</div>
              <div class="text-[9px] text-white/40">{{ rec.birdName }} · {{ formatTime(rec.endTime) }}</div>
            </div>
          </div>
          <span
            class="text-[9px] px-1.5 py-0.5 rounded-full"
            :class="rec.success ? 'bg-green-500/30 text-green-200' : 'bg-red-500/30 text-red-200'"
          >
            {{ rec.success ? '成功' : '遇险' }}
          </span>
        </div>

        <div class="grid grid-cols-4 gap-1 text-[9px] mb-2">
          <div class="bg-white/5 rounded-lg p-1.5 text-center">
            <div class="text-green-300 font-bold">+{{ rec.totalFoodGained }}</div>
            <div class="text-white/40">食物</div>
          </div>
          <div class="bg-white/5 rounded-lg p-1.5 text-center">
            <div class="text-amber-300 font-bold">{{ rec.totalCluesFound.length }}</div>
            <div class="text-white/40">线索</div>
          </div>
          <div class="bg-white/5 rounded-lg p-1.5 text-center">
            <div
              class="font-bold"
              :class="rec.healthDelta >= 0 ? 'text-emerald-300' : 'text-red-300'"
            >
              {{ rec.healthDelta >= 0 ? '+' : '' }}{{ rec.healthDelta }}
            </div>
            <div class="text-white/40">健康</div>
          </div>
          <div class="bg-white/5 rounded-lg p-1.5 text-center">
            <div class="text-purple-300 font-bold">{{ rec.events.length }}</div>
            <div class="text-white/40">事件</div>
          </div>
        </div>

        <div v-if="rec.events.length > 0" class="space-y-1">
          <div
            v-for="evt in rec.events"
            :key="evt.id"
            class="flex items-start gap-1.5 text-[10px] bg-black/30 rounded-lg p-1.5"
          >
            <span class="text-sm shrink-0">{{ evt.emoji }}</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <span
                  class="px-1 py-0.5 rounded text-[8px]"
                  :class="eventTypeBadge[evt.type]?.class || 'bg-white/10 text-white/50'"
                >
                  {{ eventTypeBadge[evt.type]?.label || evt.type }}
                </span>
                <span class="font-bold text-white/80">{{ evt.title }}</span>
              </div>
              <div class="text-white/50 mt-0.5 leading-tight">{{ evt.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
