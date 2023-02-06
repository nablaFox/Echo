import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import type { Ref } from 'vue'
import { computed } from "vue"
dayjs.extend(utc)

export function useFormat() {

    const room = (clock: Ref<number>) => computed(() => {
        const date = dayjs(clock.value).utc()
        if (date.hour() < 1) { 
            return date.format('mm:ss') 
        } else if (date.hour() < 96) {
            return date.format('h[h]')
        } else {
            return `${date.date() - 1}d ${date.hour()}h`
        }
    })

    const preview = (ms: number) => {
        const date = dayjs(ms).utc()
        if (date.minute() < 1) {
            return date.format('s[s]')
        } else if (date.hour() < 1) {
            return date.format('m[m]')
        } else if (date.day() < 96) {
            return date.format('h[h]')
        } else {
            return `${date.date() - 1}d`
        }
    }

    return {
        room,
        preview
    }
}