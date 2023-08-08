<template>
	<div class="home-view">
		<header class="header">
			<HomeMenu :list="menuList" />
		</header>
		<main class="main">
			<h1>Welcome to Task Manager App!</h1>
		</main>
	</div>
</template>

<script setup lang="ts">
import type { MenuItem } from '@/types';
import HomeMenu from '../components/HomeMenu.vue';

const menuList: MenuItem[] = [
	{
		id: 1,
		text: 'Tasks List',
		routeName: 'tasksList',
	},
];
</script>

<style scoped lang="scss">
.home-view {
	display: flex;
	flex-direction: column;
}

.header {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 70px;
	background-color: #fff;
}

.main {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 100px;
}
</style>
