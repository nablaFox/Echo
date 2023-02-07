<script setup lang="ts">
import { useRoom } from '@/composables/room'

import RoomHeader from '@/components/room/RoomHeader.vue'
import Controls from '@/components/room/Controls.vue'
import Message from '@/components/room/Message.vue'
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'

const props = defineProps<{ id: string }>()

const userStore = useUser()
const { user } = storeToRefs(userStore)
const { data, messages, sendMessage, info, loaded } = useRoom(props.id)

const onSend = (text: string) => sendMessage(text, user.value?.id)


</script>

<template>

    <!-- Transition -->
    <div class="room" v-if="loaded">
        <RoomHeader
            :since="info.since.toDate()"
            :room-name="data?.name"
            :total-time="info?.totalTime"
        />

        <div class="message-wrapper">
            <Message
                v-for="msg in messages"
                :origin="user?.id === msg.sender ? 'sender' : 'recipient'"
                :date="msg.timestamp.toDate()"
                :ex-date="msg.timestamp.toDate()"
                :text="msg.text"
            />
        </div>

        <Controls 
            @send="onSend"
            :disabled="!info.open"
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
    @include hide-scrollbar()
}

.banner {
    padding-top: $room-header-height;
    flex: 1;
}

</style>