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

<script setup>
const props = defineProps({
	list: {
		type: Array,
		default: () => [],
	},
});
</script>

<style scoped>
.menu {
	display: flex;
	gap: 20px;
}
</style>
