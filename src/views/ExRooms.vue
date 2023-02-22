<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUser } from '@/stores/user'

import Icon from '@/components/actions/Icon.vue'
import RoomCard from '@/components/room/RoomCard.vue'

const desc = ref(true)
const loaded = ref(true)

const userStore = useUser()
const { exRooms, roomInfo } = storeToRefs(userStore)

function onFilter() {
    const order = desc.value ? 'asc' : 'desc'
    userStore.orderExRooms(order)
    desc.value = !desc.value
    loaded.value = false
}

watch(exRooms, () => (loaded.value = true))
</script>

<template>
    <main>
        <div class="top">
            <div class="total"> 
                {{ roomInfo?.totalRooms }} Past Rooms
            </div>
            <div 
                class="filter"
                @click="onFilter"
            >
                <span> 
                    {{ desc ? 'Recents' : 'Older' }} 
                </span>
                <Icon 
                    :icon="desc ? 
                        'arrow_drop_down' : 
                        'arrow_drop_up'" 
                />
            </div>
        </div>

        <div
            v-if="loaded"
            class="rooms"
        >
            <RoomCard
                v-for="room in exRooms"
                :id="room.ref.id"
                :name="room.ref.name"
                :date="room.addedAt.toDate()"
                :total-time="room.ref.info.totalTime"
                :members="room.ref.info.group"
            />
        </div>

        <div v-else>
            Loading...
        </div>
    </main>
</template>


<style lang="scss" scoped>
main {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 18px 10px;
    padding-bottom: 20px;
    gap: 30px;
    overflow: hidden;

    > .top { 
        @include flex($justify: space-between);
        @extend %body-medium;
    }
}

h5 { line-height: 1; }

.filter { @include flex() }

.rooms {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    flex: 1;
    gap: 20px;
    @include hide-scrollbar()
}
</style>