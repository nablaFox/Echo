<script setup lang="ts">
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRoom } from '@/composables/room'
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'

import StackLayout from '@/layouts/StackLayout.vue'
import RoomHeader from '@/components/room/RoomHeader.vue'
import Controls from '@/components/room/Controls.vue'
import Message from '@/components/room/Message.vue'

const props = defineProps<{ id: string }>()

const userStore = useUser()
const { user } = storeToRefs(userStore)
const {
    data,
    messages,
    sendMessage, 
    info, 
    loaded, 
    loadMore, 
    messagesLimit,
    updateMessage,
    deleteMessage,
    update
} = useRoom(props.id)

const onSend = (text: string) => sendMessage(text, user.value!.id, user.value!.username)
const onUpdateMsg = (id: string, text: string) => updateMessage(id, text)
const onDeleteMsg = (id: string) => deleteMessage(id)
const onUpdateName = (name: string) => update({ name: name })

const wrapper = ref<HTMLElement | null>(null)
const { y } = useScroll(wrapper, { behavior: 'smooth' })

function onScroll(e: Event) {
    const target = (e.target as HTMLElement)

    if (
        (target.scrollTop
        - target.offsetHeight
        + target.scrollHeight) <= 160
        && messagesLimit.value < (messages.value?.length as number) + 1
    ) { loadMore(80) }
}
</script>

<template>

    <StackLayout 
        v-if="loaded"
        ref="layout"
        padding="0"
        justify="space-between"
        header-padding="0 10px"
        header-fixed
    >
        <template #header> 
            <RoomHeader
                :since="info.since.toDate()"
                :room-name="data?.name"
                :total-time="info?.totalTime"
                @edit="onUpdateName"
            />
        </template>

        <div 
            class="message-wrapper"
            ref="wrapper"
            @scroll="onScroll"
        >
            <Message
                v-for="msg, index in messages"
                :origin="user?.id === msg.sender.id ? 'sender' : 'recipient'"
                :username="msg.sender.username"
                :menu-disabled="!info.open"
                :date="msg.timestamp.toDate()"
                :text="msg.text"
                :prev-date="
                    index < messages!.length - 1 ? 
                    messages![index + 1].timestamp.toDate() : null
                "
                @delete="onDeleteMsg(msg.id)"
                @update="text => onUpdateMsg(msg.id, text)"
            />
        </div>

        <template #footer> 
            <Controls
                :disabled="!info.open"
                :go-down-btn="y <= -120"
                @send="onSend"
                @godown="y = 0"
            />
        </template>
    </StackLayout>
  
</template>


<style lang="scss" scoped>
.message-wrapper {
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
    gap: 6px;
    padding: 0 $page-padding-hor;
    padding-bottom: 10px;
    @include hide-scrollbar();
}

:global(.blur-leave-active) {  all: initial!important }
</style>