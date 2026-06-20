import type { Weather, WeatherEffect, BerryType, GrowthStage, Personality, ExpeditionArea, ExpeditionEvent } from '@/types/game'

export const ATTR_MIN = 0
export const ATTR_MAX = 100
export const DEATH_THRESHOLD = 10

export const STAGE_DURATION: Record<Exclude<GrowthStage, 'adult'>, number> = {
  egg: 1,
  chick: 2,
  juvenile: 2,
  subadult: 1,
}

export const STAGE_NAMES: Record<GrowthStage, string> = {
  egg: '🥚 蛋',
  chick: '🐣 雏鸟',
  juvenile: '🐥 幼鸟',
  subadult: '🦜 亚成鸟',
  adult: '🐦 成鸟',
}

export const STAGE_EMOJI: Record<GrowthStage, string> = {
  egg: '🥚',
  chick: '🐣',
  juvenile: '🐥',
  subadult: '🦜',
  adult: '🐦',
}

export const FOOD_NEED_MULTIPLIER: Record<Exclude<GrowthStage, 'egg'>, number> = {
  chick: 1.5,
  juvenile: 1.2,
  subadult: 1.0,
  adult: 0.8,
}

export const HUNGER_DECAY_RATE = 1.5
export const FEAR_DECAY_RATE = 0.8
export const HEALTH_RECOVERY_RATE = 0.5

export const BERRY_SPAWN_INTERVAL = 4000
export const BERRY_MAX_COUNT = 8
export const BERRY_LIFETIME = 20000

export const BERRY_VALUES: Record<BerryType, number> = {
  red: 10,
  blue: 15,
  golden: 25,
}

export const BERRY_COLORS: Record<BerryType, string> = {
  red: '#C41E3A',
  blue: '#4169E1',
  golden: '#FFD700',
}

export const BERRY_EMOJI: Record<BerryType, string> = {
  red: '🍒',
  blue: '🫐',
  golden: '✨',
}

export const WEATHER_CHANGE_INTERVAL = 25000

export const WEATHER_EFFECTS: Record<Weather, WeatherEffect> = {
  sunny: { hungerMod: 1.0, fearMod: 0.8, healthMod: 1.0 },
  rainy: { hungerMod: 1.3, fearMod: 1.5, healthMod: 0.9, awayChance: 0.08 },
  snowy: { hungerMod: 1.5, fearMod: 1.2, healthMod: 0.7, sickChance: 0.12 },
  stormy: { hungerMod: 1.2, fearMod: 2.0, healthMod: 0.6, awayChance: 0.2, sickChance: 0.18 },
}

export const WEATHER_NAMES: Record<Weather, string> = {
  sunny: '☀️ 晴天',
  rainy: '🌧️ 雨天',
  snowy: '❄️ 雪天',
  stormy: '🌪️ 暴风',
}

export const WEATHER_COLORS: Record<Weather, string> = {
  sunny: 'from-amber-300/30 to-yellow-200/20',
  rainy: 'from-blue-400/40 to-gray-500/30',
  snowy: 'from-blue-100/40 to-white/30',
  stormy: 'from-gray-600/50 to-purple-800/40',
}

export const PERSONALITY_NAMES: Record<Personality, string> = {
  bold: '勇敢大胆',
  shy: '胆小害羞',
  gentle: '温柔恬静',
  curious: '好奇活泼',
  stubborn: '倔强独立',
}

export const PERSONALITY_EMOJI: Record<Personality, string> = {
  bold: '💪',
  shy: '🥺',
  gentle: '🌸',
  curious: '🌟',
  stubborn: '😤',
}

export const DAY_DURATION = 60000
export const INITIAL_FOOD = 30
export const MIN_EGGS = 2
export const MAX_EGGS = 4
export const MAX_BREEDING_ROUNDS = 2

export const BIRD_NAMES = [
  '毛毛', '豆豆', '啾啾', '喳喳', '花花', '点点', '果果', '泡泡',
  '糖糖', '圆圆', '小米', '小麦', '云朵', '星星', '月亮', '太阳',
  '小橘', '小蓝', '小绿', '小红', '阿黄', '阿白', '阿黑', '阿灰',
]

export const EXPEDITION_AREAS: Record<ExpeditionArea, {
  name: string
  emoji: string
  description: string
  baseDuration: number
  riskLevel: number
  rewardMultiplier: number
  weatherMod: Record<Weather, number>
}> = {
  forest: {
    name: '幽深森林',
    emoji: '🌲',
    description: '茂密的树林里藏着无数秘密，可能遇见小动物，也可能发现奇异的果实',
    baseDuration: 20000,
    riskLevel: 2,
    rewardMultiplier: 1.2,
    weatherMod: { sunny: 1.0, rainy: 0.8, snowy: 0.6, stormy: 0.3 },
  },
  meadow: {
    name: '金色草甸',
    emoji: '🌾',
    description: '开阔的草地，花朵盛开，阳光充足，适合初次探险的新手',
    baseDuration: 15000,
    riskLevel: 1,
    rewardMultiplier: 1.0,
    weatherMod: { sunny: 1.3, rainy: 0.9, snowy: 0.5, stormy: 0.2 },
  },
  riverside: {
    name: '潺潺溪边',
    emoji: '🏞️',
    description: '清澈的溪流旁，能找到鲜美的浆果和闪亮的石头，但要小心滑倒',
    baseDuration: 18000,
    riskLevel: 2,
    rewardMultiplier: 1.3,
    weatherMod: { sunny: 1.1, rainy: 0.5, snowy: 0.7, stormy: 0.2 },
  },
  mountain: {
    name: '云雾山巅',
    emoji: '⛰️',
    description: '险峻的高山，可能发现稀有的线索，但风险也更高',
    baseDuration: 25000,
    riskLevel: 3,
    rewardMultiplier: 1.6,
    weatherMod: { sunny: 1.0, rainy: 0.6, snowy: 0.4, stormy: 0.1 },
  },
}

export const EXPEDITION_MIN_HUNGER = 30
export const EXPEDITION_MIN_HEALTH = 20
export const EXPEDITION_EVENT_COUNT_MIN = 2
export const EXPEDITION_EVENT_COUNT_MAX = 5

const BASE_EXPEDITION_EVENTS: Omit<ExpeditionEvent, 'id'>[] = [
  {
    type: 'find',
    title: '发现浆果丛',
    description: '在灌木丛中发现了一丛成熟的浆果！',
    emoji: '🫐',
    hungerDelta: 5,
    fearDelta: 0,
    healthDelta: 0,
    foodReward: 15,
    weight: 18,
  },
  {
    type: 'find',
    title: '找到掉落的果实',
    description: '树下有几颗刚掉落的新鲜果实',
    emoji: '🍎',
    hungerDelta: 8,
    fearDelta: 0,
    healthDelta: 2,
    foodReward: 12,
    weight: 15,
  },
  {
    type: 'find',
    title: '发现金色浆果',
    description: '哇！竟然有一颗闪闪发光的金色浆果！',
    emoji: '✨',
    hungerDelta: 15,
    fearDelta: 0,
    healthDelta: 5,
    foodReward: 30,
    weight: 5,
  },
  {
    type: 'clue',
    title: '古老的羽毛',
    description: '发现了一根神秘的古老羽毛，似乎属于一只传说中的神鸟...',
    emoji: '🪶',
    hungerDelta: -2,
    fearDelta: -3,
    healthDelta: 0,
    foodReward: 0,
    clueReward: '古老的羽毛：传说在满月之夜，神鸟会出现在最高的山峰上',
    weight: 8,
  },
  {
    type: 'clue',
    title: '神秘的地图碎片',
    description: '捡到一张破旧的羊皮纸碎片，上面画着未知的路线',
    emoji: '🗺️',
    hungerDelta: -1,
    fearDelta: -2,
    healthDelta: 0,
    foodReward: 0,
    clueReward: '地图碎片：标记着一条通往隐秘果林的小径',
    weight: 7,
  },
  {
    type: 'clue',
    title: '闪亮的水晶',
    description: '在阳光下闪烁的小水晶，似乎蕴含着某种力量',
    emoji: '💎',
    hungerDelta: 0,
    fearDelta: -5,
    healthDelta: 3,
    foodReward: 5,
    clueReward: '水晶碎片：集齐七颗可以召唤好运彩虹',
    weight: 5,
  },
  {
    type: 'clue',
    title: '旧歌谣的字条',
    description: '一张皱巴巴的字条，上面写着一段关于森林的古老歌谣',
    emoji: '📜',
    hungerDelta: -1,
    fearDelta: -1,
    healthDelta: 0,
    foodReward: 0,
    clueReward: '古老歌谣："当东边的第三棵树开花，金色浆果就会出现"',
    weight: 6,
  },
  {
    type: 'encounter',
    title: '遇见友善的松鼠',
    description: '一只可爱的松鼠分享了它藏起来的坚果！',
    emoji: '🐿️',
    hungerDelta: 10,
    fearDelta: -5,
    healthDelta: 0,
    foodReward: 8,
    weight: 10,
  },
  {
    type: 'encounter',
    title: '遇见老鸟前辈',
    description: '一只年长的鸟儿分享了许多生活的智慧',
    emoji: '🦅',
    hungerDelta: 0,
    fearDelta: -10,
    healthDelta: 5,
    foodReward: 5,
    clueReward: '前辈教诲：勇敢但不要鲁莽，安全第一',
    weight: 6,
  },
  {
    type: 'encounter',
    title: '蝴蝶群飞舞',
    description: '被美丽的蝴蝶群围绕，心情变得格外愉快',
    emoji: '🦋',
    hungerDelta: 0,
    fearDelta: -8,
    healthDelta: 3,
    foodReward: 0,
    weight: 8,
  },
  {
    type: 'danger',
    title: '遭遇野猫！',
    description: '一只野猫突然扑了过来，惊险逃脱！',
    emoji: '🐱',
    hungerDelta: -10,
    fearDelta: 20,
    healthDelta: -12,
    foodReward: 0,
    weight: 6,
  },
  {
    type: 'danger',
    title: '被荆棘划伤',
    description: '不小心钻进了荆棘丛，翅膀被划伤了',
    emoji: '🌵',
    hungerDelta: -3,
    fearDelta: 8,
    healthDelta: -8,
    foodReward: 0,
    weight: 8,
  },
  {
    type: 'danger',
    title: '迷路了！',
    description: '在陌生的地方绕了好几圈才找到方向，又累又怕',
    emoji: '❓',
    hungerDelta: -15,
    fearDelta: 15,
    healthDelta: -3,
    foodReward: 0,
    weight: 7,
  },
  {
    type: 'danger',
    title: '被大风吹落',
    description: '一阵强风突然袭来，从半空中摔了下来',
    emoji: '💨',
    hungerDelta: -5,
    fearDelta: 12,
    healthDelta: -10,
    foodReward: 0,
    weight: 5,
  },
  {
    type: 'weather',
    title: '找到避雨的树洞',
    description: '机智地找到了一个干燥的树洞躲避风雨',
    emoji: '🕳️',
    hungerDelta: -2,
    fearDelta: -3,
    healthDelta: 2,
    foodReward: 3,
    weight: 8,
  },
  {
    type: 'weather',
    title: '阳光正好',
    description: '温暖的阳光洒在羽毛上，感觉精力充沛',
    emoji: '☀️',
    hungerDelta: 3,
    fearDelta: -5,
    healthDelta: 5,
    foodReward: 0,
    weight: 10,
  },
]

export const getExpeditionEventPool = (
  area: ExpeditionArea,
  weather: Weather,
  personality: Personality,
): Omit<ExpeditionEvent, 'id'>[] => {
  const areaConfig = EXPEDITION_AREAS[area]
  const weatherMod = areaConfig.weatherMod[weather]
  const riskMod = areaConfig.riskLevel

  return BASE_EXPEDITION_EVENTS.map(event => {
    let weight = event.weight

    if (event.type === 'danger') {
      weight *= riskMod * 0.5
      if (weather === 'stormy') weight *= 1.5
      if (weather === 'rainy') weight *= 1.2
      if (personality === 'bold') weight *= 0.8
      if (personality === 'shy') weight *= 1.3
    }

    if (event.type === 'find' || event.type === 'encounter') {
      weight *= weatherMod
      if (personality === 'curious') weight *= 1.2
      if (personality === 'stubborn') weight *= 0.9
    }

    if (event.type === 'clue') {
      if (personality === 'curious') weight *= 1.5
      if (personality === 'gentle') weight *= 1.2
      if (area === 'mountain') weight *= 1.5
      if (area === 'forest') weight *= 1.3
    }

    return { ...event, weight: Math.max(1, weight) }
  })
}
