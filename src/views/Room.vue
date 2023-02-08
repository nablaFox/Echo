<script setup lang="ts">
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRoom } from '@/composables/room'
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'

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
    deleteMessage
} = useRoom(props.id)

const onSend = (text: string) => sendMessage(text, user.value?.id)
const onUpdateMsg = (id: string, text: string) => updateMessage(id, text)
const onDeleteMsg = (id: string) => deleteMessage(id)

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


    <div class="room" v-if="loaded">
        <RoomHeader
            :since="info.since.toDate()"
            :room-name="data?.name"
            :total-time="info?.totalTime"
        />

        <div 
            class="message-wrapper"
            ref="wrapper"
            @scroll="onScroll"
        >
            <Message
                v-for="msg, index in messages"
                :origin="user?.id === msg.sender ? 'sender' : 'recipient'"
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

        <button @click="userStore.leaveRoom"> Leave Room </button>
        <Controls
            @send="onSend"
            :disabled="!info.open"
            :go-down-btn="y !== 0"
            @godown="y = 0"
        />
    </div>
  
</template>


<style lang="scss" scoped>
.room {
    width: 100%;
    height: 100vh;
    @include flex($direction: column, $justify: space-between);
}

.message-wrapper {
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
    gap: 6px;
    padding: 0 8px;
    width: 100%;
    padding-top: 70px;
    padding-bottom: 10px;
    @include hide-scrollbar();
    
}

.banner {
    padding-top: $room-header-height;
    flex: 1;
}

</style>