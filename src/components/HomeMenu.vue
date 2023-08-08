<template>
	<nav class="menu">
		<RouterLink
				v-for="item in props.list"
				:key="item.id"
				:to="{ name: item.routeName }"
		>
			{{ item.text }}
		</RouterLink>
	</nav>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types';

interface Props {
	list?: MenuItem[] | [],
}
const props = defineProps<Props>();
</script>

<style scoped>
.menu {
	display: flex;
	gap: 20px;
}
</style>
