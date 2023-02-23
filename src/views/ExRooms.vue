<script setup lang="ts">
import { ref, inject, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useUser } from '@/stores/user'

import Scroller from '@/layouts/Scroller.vue'
import Icon from '@/components/actions/Icon.vue'
import RoomCard from '@/components/room/RoomCard.vue'

const userStore = useUser()
const { exRooms, roomInfo, exRoomsLimit } = storeToRefs(userStore)

const footer = inject('footer') as any
const scroller = ref<InstanceType<typeof Scroller> | null>(null)
const desc = ref(true)
const orderedRooms = computed(
    () => desc.value ? exRooms.value : exRooms.value.slice().reverse()
)

function onScroll() {
    (exRoomsLimit.value < (exRooms.value?.length as number) + 1)
    && userStore.loadMoreExRooms(100)
}

onBeforeMount(() => userStore.setExRoomsLimit(100))
onBeforeUnmount(() => userStore.setExRoomsLimit(10))
</script>

<template>

    <main>
        <div class="top">
            <div class="total"> 
                {{ roomInfo?.totalRooms }} Past Rooms
            </div>
            <div 
                class="filter"
                @click="desc = !desc"
            >
                <span> 
                    {{ desc ? 'Recents' : 'Older' }} 
                </span>
                <Icon :icon="desc ? 'arrow_drop_down' : 'arrow_drop_up'" />
            </div>
        </div>

        <Scroller
            ref="scroller"
            class="rooms"
            keep-last-scroll
            :bottom-offset="100"
            @scroll-top="footer.showFooter()"
            @scroll-bottom="footer.hideFooter()"
            @arrived-bottom="onScroll"
        >
            <RoomCard
                v-for="room, i in orderedRooms"
                :key="i"
                :id="room.ref.id"
                :name="room.ref.name"
                :date="room.addedAt.toDate()"
                :total-time="room.ref.info.totalTime"
                :members="room.ref.info.group"
            />
        </Scroller>
    </main>

</template>


<style lang="scss" scoped>
main {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 18px 10px;
    padding-bottom: 0px;
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
    overflow-y: auto;
    flex-direction: column;
    flex: 1;
    gap: 20px;
    @include hide-scrollbar();
    padding-bottom: 20px;
}
</style>