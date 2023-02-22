import type { Ref } from 'vue'
import { computed } from "vue"

import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(utc)
dayjs.extend(calendar)

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

    const divider = (date: Date) => {
        const format =  {
            lastDay: '[Yesterday]',
            lastWeek: 'dddd',
            sameElse: 'DD/MM/YYYY',
            sameDay: '[Today]'
        }
        return  dayjs(date).calendar(null, format)
    }

    const timestamp = (date: Date) => dayjs(date).format('HH:mm')

    const fullDate = (date: Date) => dayjs(date).format('DD/MM/YYYY')
    const fullDateVerbose = (date: Date) => dayjs(date).format('D MMMM YYYY')

    return {
        room,
        preview,
        divider,
        timestamp,
        fullDate,
        fullDateVerbose
    }
}