<script>

	import { fade } from "svelte/transition";

</script>
<svelte:head>
	<style>
		html {
			overflow: hidden;
		}
	</style>
</svelte:head>

<div class="overlay" transition:fade={{duration: 100}}/>

<style>
	.overlay {
		position: fixed;
		inset: 0;

		background-color: var(--pico-primary);
		opacity: 0.6;

		z-index: var(--modal-overlay, var(--z-overlay));
	}
</style>
