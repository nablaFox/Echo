<script setup lang="ts">
import { useRoom } from '@/stores/room'
import { storeToRefs } from 'pinia'

import RoomHeader from '@/components/room/RoomHeader.vue'
import Controls from '@/components/room/Controls.vue'
import Message from '@/components/room/Message.vue'
import { onMounted } from 'vue'
import { useUser } from '@/stores/user'

const props = defineProps<{ id: string }>()

const userStore = useUser()
const roomStore = useRoom()

const { user } = storeToRefs(userStore)
const { messages, messagesLimit } = storeToRefs(roomStore)

const onSend = (text: string) => roomStore.sendMessage(text, user.value?.id)
onMounted(() => roomStore.loadMessages(props.id))

</script>

<template>

    <div class="room">
        <RoomHeader room-name="New Room" @click="userStore.leaveRoom"/>

        <div class="message-wrapper" v-if="messages">
            <Message
                v-for="msg in messages"
                :origin="user?.id === msg.sender ? 'sender' : 'recipient'"
                :date="msg.timestamp.toDate()"
                :ex-date="msg.timestamp.toDate()"
                :text="msg.text"
            />
        </div>

        <div class="banner" v-else>
            nice banner
        </div>

        <Controls @send="onSend"/>
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
    gap: 4px;
    padding: 0 8px;
    width: 100%;
    padding-top: $room-header-height;
    @include hide-scrollbar()
}

.banner {
    padding-top: $room-header-height;
    flex: 1;
}

</style>