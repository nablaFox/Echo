<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '@/stores/user'
import { useRoom } from '@/composables/room'

import StackLayout from '@/layouts/StackLayout.vue'
import Scroller from '@/layouts/Scroller.vue'
import RoomHeader from '@/components/room/RoomHeader.vue'
import Controls from '@/components/room/Controls.vue'
import Message from '@/components/room/Message.vue'

const props = defineProps<{ id: string }>()

const { user } = useUser()
const room = useRoom(props.id)
const { 
    messages,
    messagesLimit,
    loaded,
    info,
    data
} = room

const scroller = ref<InstanceType<typeof Scroller> | null>(null)

const onSend = (text: string) => room.sendMessage(text, user!.id, user!.username)
const onDeleteMsg = (id: string) => room.deleteMessage(id)
const onUpdateName = (name: string) => room.update({ name: name })

const onScroll = () => {
    (messagesLimit.value < (messages.value?.length as number) + 1)
    && room.loadMore(150)
}
</script>

<template>

    <Transition>
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
                    @update-name="onUpdateName"
                />
            </template>

            <Scroller
                ref="scroller"
                class="message-wrapper"
                :top-offset="160"
                @arrived-top="onScroll"
            >
                <Message
                    v-for="msg, index in messages"
                    :key="index"
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
                />
            </Scroller>

            <template #footer> 
                <Controls
                    :disabled="!info.open"
                    :go-down-btn="(scroller?.y || 0) <= -180"
                    @send="onSend"
                    @godown="scroller?.toBottom()"
                />
            </template>
        </StackLayout>
    </Transition>
  
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

.v-enter-active,
.v-leave-active {
    transition-property: opacity, filter;
    transition-duration: .4s;
    transition-timing-function: ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0; 
    filter: blur(1rem);
}
</style>