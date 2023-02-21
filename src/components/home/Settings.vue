<script setup lang="ts">
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

import Dialog from '../containment/Dialog.vue'
import Menu from '../selection/Menu.vue'
import IconButton from '../actions/IconButton.vue'

const dialog = ref<InstanceType<typeof Dialog> | null>(null)

const menuItems = [
    { content: 'Always', task: () => {} },
    { content: 'On room closed', task: () => {} },
    { content: 'On room finded', task: () => {} }
]

const isDark = useDark({ valueLight: 'light' })
const toggleDark = useToggle(isDark)
</script>


<template>

    <Teleport to="#app">
        <Dialog
            ref="dialog"
            headline="Settings"
            divider
            :actions="['OK']"
        >
            <div class="setting">
                <Menu :items="menuItems">
                    <div class="selection">
                        Always
                        <span class="material-icons">arrow_drop_down</span>
                    </div>
                </Menu>
                Notifications
            </div>
            <div class="setting">
                <IconButton 
                    :icon="isDark ? 'light_mode' : 'dark_mode' " 
                    variant="outlined"
                    @click="toggleDark()"
                />
                Theme
            </div>
            <div class="setting">
                <IconButton 
                    icon="file_upload" 
                    variant="outlined" 
                />
                Room Background
            </div>
        </Dialog>
    </Teleport>

    <span 
        class="material-icons"
        @click="dialog?.open()"
    >
        settings
    </span>

</template>


<style scoped lang="scss">
:deep(.body) {
    padding: 4vh 0;
    @include flex($direction: column, $align: start);
    gap: 30px;
}

:deep(.menu) { left: 0 }

:deep(.list-item) {
    height: 50px;
}

:deep(.icon-btn) {
    border-color: var(--md-sys-color-primary)!important;
}

.selection {
    padding: 7px 10px;
    border: 2px solid var(--md-sys-color-outline);
    border-radius: $small-rounded;
    @include flex();
    max-width: 120px;
}

.setting {
    @include flex($justify: start);
    gap: 10px;
    &.vert { 
        flex-direction: column; align-items: start; 
    }
    font-weight: 500;
}
</style>